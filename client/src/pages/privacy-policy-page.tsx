import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: June 4, 2025</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We collect information you provide directly to us, such as when you create an account, complete our investor questionnaire, or contact us for support.
              </p>
              <h4 className="font-semibold mt-4">Personal Information:</h4>
              <ul className="list-disc pl-6 mt-2">
                <li>Name, email address, phone number</li>
                <li>Financial information to verify accredited investor status</li>
                <li>Investment preferences and risk tolerance</li>
                <li>Communication preferences</li>
              </ul>
              <h4 className="font-semibold mt-4">Automatically Collected Information:</h4>
              <ul className="list-disc pl-6 mt-2">
                <li>Device information, IP address, browser type</li>
                <li>Usage data and interaction with our platform</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-4">
                <li>Provide and maintain our investment platform services</li>
                <li>Verify your accredited investor status as required by law</li>
                <li>Match you with suitable DST investment opportunities</li>
                <li>Send you important updates about your investments</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services and user experience</li>
                <li>Respond to your questions and provide customer support</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li><strong>Investment Partners:</strong> With sponsors and trustees of DST investments you choose to participate in</li>
                <li><strong>Service Providers:</strong> With trusted third parties who assist in operating our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or regulatory request</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security audits and monitoring</li>
                <li>Employee training on data protection practices</li>
                <li>Compliance with financial industry security standards</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>Provide our services and maintain your account</li>
                <li>Comply with legal and regulatory obligations</li>
                <li>Resolve disputes and enforce our agreements</li>
                <li>Meet record-keeping requirements for financial services</li>
              </ul>
              <p className="mt-4">
                Investment-related records may be retained for up to 7 years or as required by applicable securities laws.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-4">
                <li>Access and review your personal information</li>
                <li>Update or correct inaccurate information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We use cookies and similar technologies to enhance your experience on our platform:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our site</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser preferences, though disabling certain cookies may limit platform functionality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Third-Party Links</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4">
                <p><strong>DST Brokerage</strong></p>
                <p>123 Financial District</p>
                <p>New York, NY 10001</p>
                <p>Phone: (800) 555-1234</p>
                <p>Email: privacy@dstbrokerage.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}