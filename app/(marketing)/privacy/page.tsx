import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mirror collects, uses, and protects information from visitors and clients.",
};

/**
 * /privacy
 *
 * v1 ships with the placeholder legal text below. Brief §10.1 directs us
 * to use a generator (Termly, GetTerms, iubenda) for the actual legal
 * content; replace the children of <LegalPage> with the generator output
 * before launch and update the lastUpdated stamp.
 *
 * TODO(richard): swap this content for generator output. The structure
 * here is reasonable boilerplate but should not ship to production
 * unreviewed.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="PRIVACY POLICY"
      title="Privacy Policy"
      lastUpdated="April 26, 2026"
    >
      <p>
        This Privacy Policy describes how Mirror collects, uses, and shares
        information when you visit mirror-site or engage with us as a
        client. By using the site or our services, you agree to the
        practices described here.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect three categories of information.
      </p>
      <ul>
        <li>
          Information you give us directly: name, business email, company,
          revenue band, ad spend band, and the answers you provide on the
          Diagnostic Call booking form.
        </li>
        <li>
          Engagement data: during a Mirror/Recon, Mirror/Install, or
          Mirror/Operate engagement, you provide customer data (CRM
          exports, sales call recordings, support tickets, reviews, NPS
          data, and customer interview content). This data is the
          substance of the engagement and is treated as your confidential
          information.
        </li>
        <li>
          Usage data: we use Plausible Analytics to understand site
          traffic in aggregate. Plausible does not set cookies and does
          not collect personally identifying information.
        </li>
      </ul>

      <h2>How we use information</h2>
      <p>
        We use the information you give us directly to deliver Mirror
        services, to schedule and conduct Diagnostic Calls, and to send
        proposals or contracts. We use engagement data solely to build,
        calibrate, retrain, and operate your Mirror. We use usage data to
        improve the site and the funnel.
      </p>
      <p>
        We do not sell your information. We do not use your engagement
        data to train cross-client models. Each Mirror is calibrated on
        one company&apos;s data only.
      </p>

      <h2>How we share information</h2>
      <p>
        We share information with vendors who help us run the business
        (transactional email, calendar booking, hosting, analytics) under
        confidentiality obligations. We share information when required
        by law or to protect rights and safety. We do not share your
        engagement data with anyone outside Mirror absent your written
        consent or a binding legal order.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain information you give us directly for as long as we have
        an active or recently active relationship, plus a period required
        for tax, accounting, and legal compliance. Engagement data is
        retained for the duration of the engagement and for 180 days
        after termination, unless a longer retention is contractually
        agreed. You may request earlier deletion of engagement data by
        emailing privacy.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your jurisdiction, you may have the right to access,
        correct, delete, port, or restrict the processing of your
        personal information. To exercise any of these rights, contact us
        at privacy. We will respond within 30 days.
      </p>

      <h2>Security</h2>
      <p>
        We use industry-standard administrative, technical, and physical
        safeguards to protect information. Engagement data is encrypted
        at rest and in transit. We restrict access on a need-to-know
        basis to the Mirror team members assigned to your engagement.
      </p>

      <h2>Children</h2>
      <p>
        Mirror&apos;s services are not intended for and not directed at
        anyone under 18. We do not knowingly collect information from
        anyone under 18.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last
        updated&quot; date at the bottom of the page reflects the most recent
        change. Material changes will be communicated to active clients
        directly.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to the contact address
        provided at booking. We respond within 5 business days.
      </p>
    </LegalPage>
  );
}
