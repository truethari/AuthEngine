import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Privacy | AuthEngine",
  description:
    "Protecting Your Privacy: Our Commitment to Transparency and Security. Discover how AuthEngine safeguards your data, respecting your privacy at every step. Learn about our stringent measures and dedication to keeping your information secure and confidential.",
};

export default function Privacy() {
  return (
    <>
      <div className="container mt-[120px] mb-[100px]">
        <Card className="w-[100%] p-3">
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
            <CardDescription>Last Updated: 20th of July, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This page informs you of our policies regarding the collection, use, and disclosure of
              personal data when you use our Service and the choices you have associated with that
              data.
            </p>

            <div className="text-lg font-semibold	mt-7">Information Collection and Use</div>
            <p>
              We do not collect any personally identifiable information or sensitive data through
              our Service. As an open-source project, our main focus is to provide a useful tool
              without storing or processing any user data.
            </p>

            <div className="text-lg font-semibold	mt-7">Log Data</div>
            <p>
              Like many open-source projects, we may collect information that your browser sends
              whenever you use our Service (&quot;Log Data&quot;). This Log Data may include
              information such as your computer&apos;s Internet Protocol (&quot;IP&quot;) address,
              browser type, browser version, the pages of our Service that you visit, the time and
              date of your visit, the time spent on those pages, and other statistics. However, this
              data is used purely for statistical purposes, and it is not linked to any personally
              identifiable information.
            </p>

            <div className="text-lg font-semibold	mt-7">Cookies</div>
            <p>We do not use cookies or any similar tracking technologies on our Service.</p>

            <div className="text-lg font-semibold	mt-7">Third-Party Services</div>
            <p>
              As an open-source project, AuthEngine may integrate with third-party services or
              provide links to external websites. Please note that our privacy policy does not
              extend to these external services. We recommend reviewing the privacy policies of
              these third-party services separately to understand their data collection and handling
              practices.
            </p>

            <div className="text-lg font-semibold	mt-7">Data Security</div>
            <p>
              Even though we do not collect personal data, we take data security seriously. We have
              implemented appropriate security measures to protect any information you provide while
              using our Service. However, as the project is open-source and freely available for
              anyone to fork and modify, we cannot guarantee the security of any code or
              implementation beyond our official releases.
            </p>

            <div className="text-lg font-semibold	mt-7">Changes to This Privacy Policy</div>
            <p>
              We may update our Privacy Policy from time to time. Thus, we advise you to review this
              page periodically for any changes. We will notify you of any changes by posting the
              new Privacy Policy on this page. These changes are effective immediately after they
              are posted.
            </p>

            <p></p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
