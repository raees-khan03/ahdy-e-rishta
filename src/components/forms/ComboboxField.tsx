import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { controlClass } from "@/components/forms/FormField";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxFieldProps {
  /** Optional: the register wizard renders its own label through FormField. */
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: ComboboxOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  /** Read by screen readers together with the error text. */
  describedBy?: string;
  invalid?: boolean;
  /** Allows a value that is not in the option list. */
  allowCustom?: boolean;
  /** Name used for the search box when the visible label is rendered outside. */
  searchLabel?: string;
}

/** Lower case and strip accents so "Lahoré" and "lahore" match. */
const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/**
 * Search score. A city that starts with what you typed comes first, then a
 * word inside the label, then anything else that contains it. Without this an
 * "l" search for Lahore was buried under the 470 cities that merely contain an
 * "l" somewhere.
 */
function scoreLabel(label: string, needle: string): number {
  const haystack = normalize(label);
  if (haystack.startsWith(needle)) return 3;
  if (haystack.split(/[^a-z0-9]+/).some((word) => word.startsWith(needle))) return 2;
  if (haystack.includes(needle)) return 1;
  return -1;
}

interface PanelPosition {
  left: number;
  width: number;
  maxHeight: number;
  top?: number;
  bottom?: number;
}

/**
 * Accessible searchable select (WAI-ARIA combobox pattern).
 *
 * The list is rendered in a portal and positioned over the page, so opening it
 * never pushes the form downwards (that was the "space aa jati hai" jitter) and
 * it is never clipped by a card, a sidebar or the mobile sheet. Typing filters
 * with the ranked matcher above, so "l" already shows Lahore.
 */
export function ComboboxField({
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select an option",
  error,
  hint,
  required,
  disabled,
  id,
  className,
  describedBy,
  invalid,
  allowCustom = false,
  searchLabel,
}: ComboboxFieldProps) {
  const autoId = useId();
  const inputId = id ?? `combobox-${autoId}`;
  const listId = `${inputId}-listbox`;
  const searchId = `${inputId}-search`;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const described = [describedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;
  const isInvalid = invalid ?? Boolean(error);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((option) => option.value === value);

  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    if (!needle) return options;
    const scored: { option: ComboboxOption; score: number }[] = [];
    for (const option of options) {
      // "Any city" and friends are noise while someone is searching.
      if (!option.value && option.label.toLowerCase().startsWith("any ")) continue;
      const score = scoreLabel(option.label, needle);
      if (score > 0) scored.push({ option, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.map((entry) => entry.option);
  }, [options, query]);

  const closePanel = useCallback(() => {
    setOpen(false);
    setQuery("");
    setPosition(null);
  }, []);

  /** Place the floating panel under the control, or above it near the page bottom. */
  const measure = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const gap = 6;
    const edge = 10;
    const width = Math.min(Math.max(rect.width, 240), viewportWidth - edge * 2);
    const left = Math.min(Math.max(edge, rect.left), viewportWidth - width - edge);
    const spaceBelow = viewportHeight - rect.bottom - gap - edge;
    const spaceAbove = rect.top - gap - edge;
    const openUpward = spaceBelow < 240 && spaceAbove > spaceBelow;
    const maxHeight = Math.min(340, Math.max(180, openUpward ? spaceAbove : spaceBelow));
    setPosition(
      openUpward
        ? { left, width, maxHeight, bottom: viewportHeight - rect.top + gap }
        : { left, width, maxHeight, top: rect.bottom + gap },
    );
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    measure();
    const onScrollOrResize = () => measure();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [measure, open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      closePanel();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [closePanel, open]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => searchRef.current?.focus(), 10);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const active = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const commit = (nextValue: string) => {
    onChange(nextValue);
    closePanel();
    triggerRef.current?.focus();
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(Math.max(filtered.length - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (filtered[activeIndex]) commit(filtered[activeIndex].value);
      else if (allowCustom && query.trim()) commit(query.trim());
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closePanel();
      triggerRef.current?.focus();
      return;
    }
    if (event.key === "Tab") {
      closePanel();
    }
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
      return;
    }
    if (event.key === "Escape") {
      closePanel();
    }
  };

  const panel = open && position && (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        left: position.left,
        width: position.width,
        maxHeight: position.maxHeight,
        top: position.top,
        bottom: position.bottom,
      }}
      className="z-[70] flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-maroon-900/15"
    >
      <div className="shrink-0 border-b border-border/70 p-2">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-maroon-700"
          />
          <input
            ref={searchRef}
            id={searchId}
            type="search"
            role="combobox"
            aria-expanded
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              filtered[activeIndex] ? `${inputId}-option-${activeIndex}` : undefined
            }
            aria-label={`Search ${searchLabel ?? label ?? "options"}`}
            autoComplete="off"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search by first letter"
            className="h-10 w-full rounded-xl border border-border bg-cream-50/70 ps-9 pe-3 font-sans text-sm text-maroon-900 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-1 focus-visible:outline-none"
          />
        </div>
      </div>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label={searchLabel ?? label ?? "Options"}
        className="scroll-area min-h-0 flex-1 overflow-y-auto p-1.5"
      >
        {filtered.length === 0 ? (
          <li className="px-3 py-3 font-sans text-sm text-muted-foreground" role="presentation">
            <span className="flex items-center gap-2">
              No matches
              {allowCustom && query.trim() ? `. Press Enter to use "${query.trim()}"` : ""}
            </span>
          </li>
        ) : (
          filtered.map((option, index) => (
            <li key={option.value}>
              <button
                type="button"
                id={`${inputId}-option-${index}`}
                data-index={index}
                role="option"
                aria-selected={option.value === value}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(option.value)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-start font-sans text-sm",
                  index === activeIndex ? "bg-cream-100 text-maroon-900" : "text-foreground",
                )}
              >
                <span className="truncate">{option.label}</span>
                {option.value === value ? (
                  <Check className="size-4 shrink-0 text-maroon-700" aria-hidden="true" />
                ) : null}
              </button>
            </li>
          ))
        )}

        {allowCustom && query.trim() && !filtered.some((o) => o.value === query.trim()) ? (
          <li className="border-t border-border/70 pt-1">
            <button
              type="button"
              onClick={() => commit(query.trim())}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-start font-sans text-sm text-maroon-800 hover:bg-cream-100"
            >
              <Search className="size-3.5" aria-hidden="true" />
              Use "{query.trim()}"
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );

  return (
    <div className={cn("flex flex-col gap-1.5", className)} ref={containerRef}>
      {label ? (
        <label htmlFor={inputId} className="font-sans text-sm font-medium text-maroon-900">
          {label}
          {required ? (
            <span className="ms-1 text-maroon-600" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="relative">
        <button
          ref={triggerRef}
          id={inputId}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-describedby={described}
          aria-invalid={isInvalid ? true : undefined}
          disabled={disabled}
          className={cn(
            controlClass,
            "flex items-center justify-between gap-2 pe-10 text-start",
            !selected && !value && "text-muted-foreground",
            isInvalid && "border-red-500 focus-visible:ring-red-400",
          )}
          onClick={() => {
            if (disabled) return;
            setOpen((current) => !current);
          }}
          onKeyDown={handleTriggerKeyDown}
          onBlur={(event) => {
            // Focus moving into the portalled panel is not a real blur, and the
            // panel being open should never trigger "please select" errors.
            if (open) return;
            const next = event.relatedTarget as Node | null;
            if (panelRef.current?.contains(next)) return;
            if (!containerRef.current?.contains(next)) onBlur?.();
          }}
        >
          <span className="truncate">{selected?.label ?? (value || placeholder)}</span>
        </button>

        <ChevronDown
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-maroon-800/60 transition-transform",
            open && "rotate-180",
          )}
        />
      </div>

      {panel ? createPortal(panel, document.body) : null}

      {hint && !error ? (
        <p id={hintId} className="text-xs leading-5 text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error && !describedBy ? (
        <p id={errorId} role="alert" className="text-xs font-medium leading-5 text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
