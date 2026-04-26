import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of mirror-site and any Mirror engagement.",
};

/**
 * /terms
 *
 * v1 placeholder. Replace with output from a legal generator (Termly,
 * GetTerms, iubenda) plus a review by counsel before launch.
 *
 * TODO(richard): swap this content for generator output. The boilerplate
 * here covers the obvious surface area but is not legal advice and
 * should not ship to production unreviewed.
 */
export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="TERMS OF SERVICE"
      title="Terms of Service"
      lastUpdated="April 26, 2026"
    >
      <p>
        These Terms of Service govern your use of mirror-site (the
        &quot;Site&quot;) and any engagement you enter into with Mirror (the
        &quot;Services&quot;). By using the Site or engaging Mirror, you agree to
        these terms.
      </p>

      <h2>Eligibility</h2>
      <p>
        Mirror&apos;s Services are intended for businesses meeting the ICP
        defined in our Company Charter. The buyer must be authorized to
        enter into agreements on behalf of the company. By booking a
        Diagnostic Call you represent that you are 18 or older and have
        such authority.
      </p>

      <h2>The Services</h2>
      <p>
        Mirror offers three engagement tiers:
      </p>
      <ul>
        <li>
          Mirror/Recon: a 14-day diagnostic engagement at $4,500 one-time
          delivering a lightweight Mirror, the Truth Report, and a
          60-minute live session.
        </li>
        <li>
          Mirror/Install: a 60-day build engagement at $18,000 plus
          $6,500 per month with a 12-month minimum, delivering a fully
          calibrated Mirror deployed in your stack and owned by you.
        </li>
        <li>
          Mirror/Operate: a $15,000 to $25,000 per month engagement
          scoped quarterly, in which we operate your Mirror on your
          behalf.
        </li>
      </ul>
      <p>
        Specific deliverables, timelines, and acceptance criteria for any
        engagement are set forth in the corresponding Statement of Work.
        These Terms apply alongside the SOW; the SOW controls in case of
        conflict.
      </p>

      <h2>Payment</h2>
      <p>
        Mirror/Recon is invoiced at kickoff and due net 7. Mirror/Install
        build fee is invoiced 50% at kickoff and 50% on day 30; the
        monthly retainer begins on day 60 and is billed in advance on the
        same calendar day each month. Mirror/Operate is billed monthly
        in advance. Late payments incur 1.5% per month or the maximum
        rate permitted by law, whichever is lower.
      </p>

      <h2>Intellectual property and ownership</h2>
      <p>
        You retain ownership of the customer data you provide to Mirror.
        Upon completion of Mirror/Install, we transfer ownership of the
        deployed Mirror, the Calibration Briefs, and the trained
        multi-persona model to you, subject to a perpetual license back
        to Mirror to use anonymized methodology learnings to improve our
        approach.
      </p>
      <p>
        Mirror retains ownership of the underlying methodology, the
        Council Charter, the prompt architecture, and any tooling we
        use to build, calibrate, and operate Mirrors. Nothing in the SOW
        or these Terms grants you a license to those materials beyond
        your own engagement.
      </p>

      <h2>Confidentiality</h2>
      <p>
        Both parties will treat all non-public information disclosed in
        connection with the engagement as confidential. We do not use
        your engagement data to train cross-client models. We do not
        disclose the existence of an engagement without your written
        consent. The obligations in this section survive termination for
        five years.
      </p>

      <h2>Guarantees</h2>
      <p>
        Each tier carries a written guarantee, set forth at /pricing and
        in the corresponding SOW. Mirror&apos;s only liability for a missed
        guarantee is the remedy stated in the SOW (refund of build fee,
        next-quarter reduction, etc.). The guarantees are exclusive of
        all other warranties.
      </p>

      <h2>Termination</h2>
      <p>
        Mirror/Recon engagements terminate on delivery. Mirror/Install
        engagements may be terminated by you with 30 days notice after
        the 12-month minimum has been completed; Mirror may terminate at
        any time with 60 days notice. Mirror/Operate engagements run
        quarter to quarter and may be terminated at the end of any
        quarter with 30 days notice. Earned fees are non-refundable
        except as expressly provided in the SOW.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Mirror&apos;s aggregate
        liability arising out of or related to the Services is limited
        to the fees paid by you to Mirror in the 12 months preceding the
        event giving rise to the claim. In no event will Mirror be
        liable for indirect, incidental, special, consequential, or
        punitive damages.
      </p>

      <h2>Disclaimer</h2>
      <p>
        Mirror provides outputs derived from the customer data you
        provide. Mirror outputs are not guarantees of customer behavior,
        market outcomes, or revenue. You are responsible for the
        decisions you make based on Mirror outputs. Mirror is not a
        substitute for legal, financial, or regulatory advice.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction listed
        in the SOW. Disputes are subject to the dispute-resolution
        process in the SOW; absent an SOW, disputes are resolved in the
        courts of Mirror&apos;s home jurisdiction.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms from time to time. Material changes
        will be communicated to active clients directly. Continued use
        of the Site or Services after a change constitutes acceptance of
        the updated Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms can be sent to the contact address
        provided at booking.
      </p>
    </LegalPage>
  );
}
