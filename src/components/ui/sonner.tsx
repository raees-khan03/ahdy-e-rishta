import { Toaster as SonnerToaster } from "sonner";

function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      offset={16}
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border !border-khaki-300/70 !bg-cream-50 !font-sans !text-maroon-900 !shadow-lg !shadow-maroon-900/15",
          title: "!font-heading !text-base !font-semibold",
          description: "!text-sm !text-muted-foreground",
          actionButton: "!rounded-full !bg-maroon-800 !text-cream-50",
          cancelButton: "!rounded-full !bg-cream-200 !text-maroon-900",
        },
      }}
    />
  );
}

export { Toaster };
