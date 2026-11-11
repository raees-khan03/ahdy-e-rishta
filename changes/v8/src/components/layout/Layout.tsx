import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageIntro } from "@/components/layout/PageIntro";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { PageSkeleton } from "@/components/common/PageSkeleton";

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-maroon-900 focus:px-5 focus:py-3 focus:font-sans focus:text-sm focus:font-semibold focus:text-cream-50"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <ScrollToTop />
      <PageIntro />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col pb-16 focus-visible:outline-none sm:pb-0"
      >
        <Suspense fallback={<PageSkeleton />}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
      <CookieConsent />
    </div>
  );
}
