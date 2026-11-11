import { LoginForm } from "@/components/forms/LoginForm";
import { DamaskBackground } from "@/components/forms/backgrounds/DamaskBackground";
import { RoseBackground } from "@/components/forms/backgrounds/RoseBackground";
import { LoginIntro } from "@/components/forms/LoginIntro";
import { useSeo } from "@/hooks/useSeo";

export default function LoginPage() {
  useSeo({
    title: "Sign in",
    description:
      "Sign in to your Ahd-e-Rishta account with the phone number and password given by the office.",
    path: "/login",
    noIndex: true,
  });

  return (
    <div className="grid flex-1 lg:-mb-16 lg:grid-cols-2">
      <LoginIntro />
      <div className="relative isolate flex items-center justify-center overflow-hidden px-4 py-12 sm:px-10 sm:py-16 lg:py-20">
        {/* Nakshi pattern aur gulab, sirf decoration. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <DamaskBackground color="#5e1322" opacity={0.09} size={200} />
          <RoseBackground opacity={0.2} />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
