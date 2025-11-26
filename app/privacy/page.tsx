import Image from "next/image";

function page() {
  return (
    <div className="border border-gray-200 p-10 mt-2">
      <h1 className="text-2xl font-medium font-mono mb-2">Privacy Policy</h1>
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
          <h2 className="font-semibold text-base text-gray-900 mb-2">1. Introduction</h2>
          <p>
            PromptKit ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you use our web application and 
            browser extension.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">2. Information We Collect</h2>
          
          <h3 className="font-medium text-sm text-gray-900 mt-3 mb-1">2.1 Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Account Information:</strong> Email address, username, and password when you create an account</li>
            <li><strong>Profile Information:</strong> Optional profile details you choose to provide</li>
            <li><strong>Content:</strong> Prompts, folders, and other content you create or save using our Service</li>
            <li><strong>Payment Information:</strong> Billing details processed securely through our payment processor (Stripe)</li>
          </ul>

          <h3 className="font-medium text-sm text-gray-900 mt-3 mb-1">2.2 Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Usage Data:</strong> Information about how you use the Service, including features accessed and actions taken</li>
            <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
            <li><strong>Log Data:</strong> IP address, access times, and pages viewed</li>
            <li><strong>Cookies:</strong> Authentication cookies and preferences to maintain your session</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">3. How We Use Your Information</h2>
          <p className="mb-2">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide, maintain, and improve the Service</li>
            <li>Create and manage your account</li>
            <li>Process your transactions and send related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Monitor and analyze usage patterns to improve user experience</li>
            <li>Detect, prevent, and address technical issues and security threats</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">4. How We Share Your Information</h2>
          <p className="mb-2">We do not sell your personal information. We may share your information in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., hosting, analytics, payment processing)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition of all or part of our business</li>
            <li><strong>With Your Consent:</strong> When you authorize us to share your information</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">5. Data Storage and Security</h2>
          <p>
            We use industry-standard security measures to protect your information, including encryption and secure 
            authentication through Supabase. Your data is stored on secure servers and we implement appropriate 
            technical and organizational measures to prevent unauthorized access, disclosure, or loss.
          </p>
          <p className="mt-2">
            However, no method of transmission over the internet or electronic storage is 100% secure. While we 
            strive to protect your information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">6. Your Rights and Choices</h2>
          <p className="mb-2">You have the following rights regarding your information:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
            <li><strong>Export:</strong> Request a copy of your data in a portable format</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, please contact us through your account settings or our support email.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">7. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to maintain your session, remember your preferences, 
            and analyze usage patterns. Essential cookies are necessary for the Service to function, while optional 
            cookies help us improve your experience.
          </p>
          <p className="mt-2">
            You can control cookies through your browser settings, but disabling certain cookies may limit your 
            ability to use some features of the Service.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">8. Browser Extension</h2>
          <p>
            Our Chrome extension accesses cookies from promptkit.so to sync your authentication state and retrieve 
            your prompts. The extension does not collect or transmit any additional personal information beyond 
            what is necessary to provide the Service.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">9. Children's Privacy</h2>
          <p>
            Our Service is not intended for users under the age of 13. We do not knowingly collect personal 
            information from children under 13. If you believe we have collected information from a child under 13, 
            please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">10. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence. 
            We ensure appropriate safeguards are in place to protect your information in accordance with this 
            Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">11. Data Retention</h2>
          <p>
            We retain your information for as long as your account is active or as needed to provide the Service. 
            If you delete your account, we will delete or anonymize your information within a reasonable timeframe, 
            unless we are required to retain it for legal purposes.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">12. Third-Party Services</h2>
          <p className="mb-2">Our Service integrates with third-party services:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Supabase:</strong> For authentication and data storage</li>
            <li><strong>Stripe:</strong> For payment processing</li>
            <li><strong>Vercel:</strong> For hosting and content delivery</li>
          </ul>
          <p className="mt-2">
            These third parties have their own privacy policies. We are not responsible for their practices and 
            encourage you to review their policies.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">13. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by 
            updating the "Last Updated" date and, for significant changes, providing additional notice through 
            the Service or email. Your continued use of the Service after changes constitutes acceptance of the 
            updated policy.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">14. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our privacy practices, please contact 
            us through our website or the email address provided on our contact page.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base text-gray-900 mb-2">15. Your California Privacy Rights</h2>
          <p>
            If you are a California resident, you have additional rights under the California Consumer Privacy Act 
            (CCPA), including the right to know what personal information we collect, the right to delete your 
            information, and the right to opt-out of the sale of your information (though we do not sell personal 
            information).
          </p>
        </section>
      </div>
    </div>
  );
}

export default page;

