import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProfilesPage = lazy(() => import("@/pages/ProfilesPage"));
const ProfileDetailPage = lazy(() => import("@/pages/ProfileDetailPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"));
const PackagesPage = lazy(() => import("@/pages/PackagesPage"));
const HowItWorksPage = lazy(() => import("@/pages/HowItWorksPage"));
const SuccessStoriesPage = lazy(() => import("@/pages/SuccessStoriesPage"));
const VideosPage = lazy(() => import("@/pages/VideosPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const TeamPage = lazy(() => import("@/pages/TeamPage"));
const BranchesPage = lazy(() => import("@/pages/BranchesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const SafetyTipsPage = lazy(() => import("@/pages/SafetyTipsPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const ShortlistPage = lazy(() => import("@/pages/ShortlistPage"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const AccountPage = lazy(() => import("@/pages/AccountPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profiles" element={<ProfilesPage />} />
          <Route path="profiles/:id" element={<ProfileDetailPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="success-stories" element={<SuccessStoriesPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="safety-tips" element={<SafetyTipsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="shortlist" element={<ShortlistPage />} />
          <Route path="terms" element={<LegalPage variant="terms" />} />
          <Route path="privacy" element={<LegalPage variant="privacy" />} />
          <Route path="refund-policy" element={<LegalPage variant="refund" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="account"
            element={
              <ProtectedRoute allow={["user", "admin"]}>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
