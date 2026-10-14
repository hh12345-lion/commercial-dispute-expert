import { PageHero } from "@/components/page-hero";
import { PageContainer } from "@/components/page-container";
import { buildMetadata } from "@/lib/seo";
import { COOKIE_CATEGORIES } from "@/lib/cookies/types";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "How commercialdisputeexpert.com uses cookies and similar technologies, and how you can control your preferences.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        title="Cookie policy"
        intro="Last updated: May 2026"
        crumbs={[{ label: "Home", href: "/" }, { label: "Cookie policy" }]}
        currentPath="/cookie-policy"
      />
      <PageContainer>

      <div className="prose-cde mt-8">
        <p>
          This policy explains how Commercial Dispute Expert (&quot;we&quot;, &quot;us&quot;) uses
          cookies and similar technologies on commercialdisputeexpert.com. It should be read
          together with our privacy policy.
        </p>

        <h2>What are cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. Similar
          technologies (such as local storage, pixels, and tags) may also be used for the same
          purposes described below.
        </p>

        <h2>How we use cookies</h2>
        <p>
          We group cookies into categories. When you first visit the site, a cookie banner asks for
          your consent before any non-essential cookies or tracking scripts are loaded. You can
          change your choices at any time using <strong>Cookie settings</strong> in the footer.
        </p>

        <h2>Cookie categories</h2>
        {COOKIE_CATEGORIES.map((cat) => (
          <div key={cat.key}>
            <h3>{cat.label}</h3>
            <p>{cat.description}</p>
            {cat.key === "analytics" && (
              <p>
                Where configured, this may include Google Analytics (GA4), Google Tag Manager,
                Plausible Analytics, and Hotjar session analytics. These tools only load if you
                consent to analytics cookies.
              </p>
            )}
            {cat.key === "marketing" && (
              <p>
                Where configured, this may include Meta (Facebook) Pixel and LinkedIn Insight Tag
                for campaign measurement. These only load if you consent to marketing cookies.
              </p>
            )}
            {cat.key === "necessary" && (
              <p>
                We store your consent record in your browser&apos;s local storage (key:{" "}
                <code className="text-sm">cde-cookie-consent-v1</code>) for up to 12 months, after
                which you will be asked to choose again.
              </p>
            )}
          </div>
        ))}

        <h2>Third-party services</h2>
        <p>
          Third parties may set their own cookies when their scripts run. We only enable these
          scripts after you grant the relevant category. Providers may process data outside your
          country; see their privacy notices for details.
        </p>
        <ul>
          <li>Google Analytics / Google Tag Manager - Google Ireland Ltd</li>
          <li>Plausible Analytics - privacy-focused analytics (EU)</li>
          <li>Hotjar - behaviour analytics</li>
          <li>Meta Pixel - Meta Platforms Ireland Ltd</li>
          <li>LinkedIn Insight Tag - LinkedIn Ireland Unlimited Company</li>
        </ul>

        <h2>Google Consent Mode</h2>
        <p>
          Where Google tags are used, we implement Google Consent Mode v2. Non-essential storage
          defaults to <em>denied</em> until you accept the relevant categories; your choices are
          applied immediately when you save preferences.
        </p>

        <h2>Legal basis (GDPR / ePrivacy)</h2>
        <p>
          Necessary cookies are used on the basis of legitimate interests in operating a secure,
          functional website. Analytics, marketing, and preference cookies rely on your consent
          under applicable data protection law (including GDPR and the ePrivacy Directive). You may withdraw consent at any time via
          Cookie settings; withdrawal does not affect the lawfulness of processing before
          withdrawal.
        </p>

        <h2>California residents (CCPA)</h2>
        <p>
          We do not sell personal information. Optional analytics and advertising cookies may
          constitute &quot;sharing&quot; for cross-context behavioural advertising under California
          law. You may opt out by rejecting non-essential cookies or disabling marketing and
          analytics in Cookie settings.
        </p>

        <h2>Managing cookies in your browser</h2>
        <p>
          You can block or delete cookies through your browser settings. Blocking necessary cookies
          may prevent the consent banner from remembering your choices.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy: use our{" "}
          <a href="/contact">contact page</a> or email contact@commercialdisputeexpert.com.
        </p>
      </div>
      </PageContainer>
    </>
  );
}
