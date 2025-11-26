import Image from "next/image";

function page() {
  return (
    <div className="border border-gray-200 p-10 mt-2">
      <h1 className="text-2xl font-medium font-mono mb-2">Terms of Service</h1>
      <Image
        src="/illustrations/underline.svg"
        alt="underline"
        width={232}
        height={8}
      />
      <div className="mt-6 space-y-6 text-sm text-gray-700">
        <p className="text-gray-500 text-xs">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using PromptKit ("the Service"), you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">2. Description of Service</h2>
          <p>
            PromptKit provides a platform for creating, organizing, and managing AI prompts. The Service includes 
            both a web application and browser extension that allow users to store, categorize, and access their 
            prompts across various AI platforms.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">3. User Accounts</h2>
          <p className="mb-2">When you create an account with PromptKit, you agree to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access to your account</li>
            <li>Accept responsibility for all activities that occur under your account</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">4. User Content</h2>
          <p className="mb-2">
            You retain all rights to the prompts and content you create using PromptKit. By using the Service, you grant us:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>A license to host, store, and display your content as necessary to provide the Service</li>
            <li>The right to use aggregated, anonymized data for improving the Service</li>
          </ul>
          <p className="mt-2">
            You are responsible for ensuring your content does not violate any laws or third-party rights.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">5. Subscription Plans</h2>
          <p className="mb-2">PromptKit offers both free and paid subscription plans:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Free plan: Limited to 5 prompts</li>
            <li>Pro plan: Unlimited prompts and additional features</li>
            <li>Lifetime plan: One-time payment for unlimited access</li>
          </ul>
          <p className="mt-2">
            Paid subscriptions are billed according to the plan you select. You may cancel your subscription at any time, 
            but refunds are not provided for partial billing periods.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">6. Acceptable Use</h2>
          <p className="mb-2">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Use automated systems to access the Service without permission</li>
            <li>Share content that is harmful, offensive, or violates others' rights</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">7. Intellectual Property</h2>
          <p>
            The PromptKit platform, including its design, features, and functionality, is owned by PromptKit and 
            protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or 
            distribute any part of the Service without our prior written permission.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">8. Privacy</h2>
          <p>
            Your use of the Service is also governed by our Privacy Policy. We collect and process your data as 
            described in that policy to provide and improve the Service.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">9. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account at any time for violations of these Terms of 
            Service or for any other reason at our discretion. Upon termination, your right to use the Service will 
            immediately cease.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">10. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "as is" without warranties of any kind, either express or implied. We do not 
            guarantee that the Service will be uninterrupted, secure, or error-free.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">11. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, PromptKit shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages resulting from your use of or inability to use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will notify users of any material 
            changes by updating the "Last Updated" date. Your continued use of the Service after changes constitutes 
            acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">13. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us through our website or email us 
            at the address provided on our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}

export default page;
