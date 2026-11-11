import { Link } from "react-router-dom";
import { CheckCircle2, Clock, MessageSquare, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

interface RegisterSuccessProps {
  name: string;
  city: string;
  whatsappUrl: string;
}

/** Shown in place of the wizard once a submission has been sent. */
export function RegisterSuccess({ name, city, whatsappUrl }: RegisterSuccessProps) {
  return (
    <div className="w-full max-w-2xl rounded-3xl border border-green-200 bg-white p-6 shadow-xl shadow-maroon-900/10 sm:p-8">
      <span className="grid size-14 place-items-center rounded-full bg-green-50 text-green-800">
        <CheckCircle2 className="size-7" aria-hidden="true" />
      </span>

      <h2 className="mt-4 font-heading text-3xl font-semibold text-maroon-800">
        Thank you, {name}!
      </h2>
      <p className="mt-2 max-w-[58ch] font-sans text-[15px] leading-7 text-maroon-900/80">
        Your details have been sent to our {city} desk and a copy is in WhatsApp. A consultant will
        call within one working day to confirm everything and explain the next step.
      </p>

      <h3 className="mt-6 font-heading text-lg font-semibold text-maroon-900">What happens next</h3>
      <ol className="mt-3 space-y-3">
        {[
          {
            icon: Phone,
            title: "A call from the office",
            text: "We confirm the details and ask anything needed before the file is written.",
          },
          {
            icon: ShieldCheck,
            title: "Checks",
            text: "Phone, identity and family details are checked. Nothing is shared before that.",
          },
          {
            icon: MessageSquare,
            title: "Proposals that fit",
            text: "Your consultant sends a short list to your family first, never to strangers.",
          },
        ].map((item) => (
          <li
            key={item.title}
            className="flex gap-3 rounded-2xl border border-border bg-white p-3.5"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cream-100 text-maroon-700">
              <item.icon className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold text-maroon-900">{item.title}</p>
              <p className="font-sans text-xs leading-5 text-muted-foreground">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild className="bg-green-800 text-white hover:bg-green-900">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Open WhatsApp again
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Back to home</Link>
        </Button>
      </div>

      <p className="mt-5 flex items-start gap-2 font-sans text-xs leading-5 text-muted-foreground">
        <Clock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        Office hours are Monday to Saturday, 10:00 AM to 7:00 PM. If you sent this after hours,
        expect a call the next working day.
      </p>
    </div>
  );
}
