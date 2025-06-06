import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: June 4, 2025</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                By accessing and using DST Brokerage's platform and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Investment Services and Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                DST Brokerage provides information and brokerage services related to Delaware Statutory Trust (DST) investments. All investments involve risk, including the potential loss of principal. Past performance does not guarantee future results.
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>DST investments are illiquid and typically have long holding periods</li>
                <li>Returns are not guaranteed and may vary significantly</li>
                <li>Investors must meet accreditation requirements to participate</li>
                <li>All investment decisions should be made in consultation with qualified financial advisors</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Accredited Investor Requirements</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                DST investments are limited to accredited investors as defined by the Securities and Exchange Commission (SEC). By using our platform, you represent and warrant that you meet the accredited investor criteria, which includes:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>Individual net worth exceeding $1 million (excluding primary residence)</li>
                <li>Individual income exceeding $200,000 in each of the two most recent years</li>
                <li>Joint income with spouse exceeding $300,000 in each of the two most recent years</li>
                <li>Other qualifications as defined by applicable securities regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. User Accounts and Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, current, and complete information during registration and keep your account information updated.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our services, you consent to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                The content, features, and functionality of our platform are owned by DST Brokerage and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                DST Brokerage shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability to you for any claim shall not exceed the amount you paid for our services in the 12 months preceding the claim.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Regulatory Compliance</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Our services are subject to various federal and state securities laws and regulations. We reserve the right to verify your accredited investor status and may require documentation to confirm your eligibility to participate in offered investments.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any such changes constitutes your acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4">
                <p><strong>DST Brokerage</strong></p>
                <p>123 Financial District</p>
                <p>New York, NY 10001</p>
                <p>Phone: (800) 555-1234</p>
                <p>Email: info@dstbrokerage.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}