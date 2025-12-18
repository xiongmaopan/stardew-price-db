import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - StardewPriceDB',
  description: 'Privacy Policy for StardewPriceDB. Learn how we collect, use, and protect your information when using our Stardew Valley price database.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - StardewPriceDB',
    description: 'Our commitment to protecting your privacy while using StardewPriceDB.',
    url: 'https://stardewpricedb.com/privacy',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy - StardewPriceDB',
  description: 'Privacy policy for StardewPriceDB website',
  url: 'https://stardewpricedb.com/privacy',
  dateModified: '2024-12-09'
};

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">Privacy Policy</span>
        </nav>

        <article>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-600 mb-8">Last updated: December 9, 2024</p>

          <div className="space-y-8 text-slate-700">
            <p>
              StardewPriceDB operates the website stardewpricedb.com. This page informs you of our policies 
              regarding the collection, use, and disclosure of personal information when you use our Service.
            </p>

            <Section title="Information Collection and Use">
              <p className="mb-4">
                StardewPriceDB is designed with privacy in mind. We collect minimal information 
                necessary to provide and improve our Service.
              </p>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Information We Collect</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Usage Data:</strong> We may collect information about how the Service is accessed 
                  and used. This may include your browser type, browser version, the pages you visit, 
                  the time and date of your visit, and other diagnostic data.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies and similar tracking technologies to track 
                  activity on our Service and hold certain information. You can instruct your browser 
                  to refuse all cookies or indicate when a cookie is being sent.
                </li>
              </ul>
            </Section>

            <Section title="Use of Data">
              <p className="mb-3">StardewPriceDB uses the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </Section>

            <Section title="Google AdSense and Advertising">
              <p className="mb-4">
                We use Google AdSense to display advertisements on our website. Google AdSense uses 
                cookies to serve ads based on your prior visits to our website or other websites. 
                You may opt out of personalized advertising by visiting Google Ads Settings.
              </p>
              <p>
                Third-party vendors, including Google, use cookies to serve ads based on your 
                prior visits to this website or other websites. Google use of advertising 
                cookies enables it and its partners to serve ads based on your visit to this 
                site and other sites on the Internet.
              </p>
            </Section>

            <Section title="Google Analytics">
              <p>
                We may use Google Analytics to track and analyze website traffic. Google Analytics 
                uses cookies to collect information about how visitors use our website. This 
                information is used to compile reports and help us improve the website.
              </p>
            </Section>

            <Section title="Data Security">
              <p>
                The security of your data is important to us. While we strive to use commercially 
                acceptable means to protect your personal information, no method of transmission 
                over the Internet or electronic storage is 100% secure.
              </p>
            </Section>

            <Section title="Third-Party Links">
              <p>
                Our Service may contain links to other sites that are not operated by us. If you 
                click on a third-party link, you will be directed to that third party site. 
                We strongly advise you to review the Privacy Policy of every site you visit.
              </p>
            </Section>

            <Section title="Children Privacy">
              <p>
                Our Service does not address anyone under the age of 13. We do not knowingly 
                collect personally identifiable information from children under 13.
              </p>
            </Section>

            <Section title="Changes to This Privacy Policy">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the 
                Last updated date.
              </p>
            </Section>

            <Section title="Contact Us">
              <p className="mb-3">If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By email: contact@stardewpricedb.com</li>
                <li>By visiting our <Link href="/contact" className="text-blue-600 hover:underline">Contact Page</Link></li>
              </ul>
            </Section>

            <hr className="my-8 border-slate-200" />

            <Section title="Cookie Policy">
              <p className="mb-4">
                Cookies are small pieces of text sent to your browser by a website you visit. 
                They help that website remember information about your visit, like your preferred 
                language and other settings.
              </p>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track ad campaign performance.</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">Managing Cookies</h3>
              <p>
                Most web browsers allow you to control cookies through their settings. However, 
                limiting cookies may impact your experience on our website.
              </p>
            </Section>
          </div>
        </article>
      </main>
    </>
  );
}
