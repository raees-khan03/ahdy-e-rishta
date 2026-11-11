import { RegisterForm } from "@/components/forms/RegisterForm";
import { DamaskBackground } from "@/components/forms/backgrounds/DamaskBackground";
import { RoseBackground } from "@/components/forms/backgrounds/RoseBackground";
import { RegisterIntro } from "@/components/forms/RegisterIntro";
import { useSeo } from "@/hooks/useSeo";

export default function RegisterPage() {
  useSeo({
    title: "Register with the bureau",
    description:
      "Register your rishta with Ahd-e-Rishta. Six short steps, a consultant calls you back within one working day.",
    path: "/register",
  });

  return (
    <div className="grid flex-1 lg:-mb-16 lg:grid-cols-2">
      <RegisterIntro />
      <div className="relative isolate flex items-start justify-center overflow-hidden px-4 py-10 sm:px-8 lg:py-14">
        {/* Nakshi pattern aur gulab, sirf decoration. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <DamaskBackground color="#5e1322" opacity={0.09} size={220} />
          <RoseBackground opacity={0.2} />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
