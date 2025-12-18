import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - StardewPriceDB',
  description: 'Terms of Service for StardewPriceDB. Read our terms and conditions for using the Stardew Valley price database and calculators.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service - StardewPriceDB',
    description: 'Terms and conditions for using StardewPriceDB services.',
    url: 'https://stardewpricedb.com/terms',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service - StardewPriceDB',
  description: 'Terms of service for StardewPriceDB website',
  url: 'https://stardewpricedb.com/terms',
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

export default function TermsPage() {
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
          <span className="text-slate-800">Terms of Service</span>
        </nav>

        <article>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Terms of Service</h1>
          <p className="text-lg text-slate-600 mb-8">Last updated: December 9, 2024</p>

          <div className="space-y-8 text-slate-700">
            <p>
              Welcome to StardewPriceDB. By accessing and using our website (stardewpricedb.com), 
              you accept and agree to be bound by these Terms of Service.
            </p>

            <Section title="1. Acceptance of Terms">
              <p>
                By accessing or using StardewPriceDB, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these terms, 
                you are prohibited from using or accessing this site.
              </p>
            </Section>

            <Section title="2. Use License">
              <p className="mb-3">
                Permission is granted to temporarily access the materials (information, tools, calculators) 
                on StardewPriceDB for personal, non-commercial use only. This is the grant of a license, 
                not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials for commercial purposes</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </Section>

            <Section title="3. Disclaimer">
              <p className="mb-3">
                The materials on StardewPriceDB are provided on an as is basis. StardewPriceDB makes 
                no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                including, without limitation:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Implied warranties of merchantability, fitness for a particular purpose</li>
                <li>Non-infringement of intellectual property or other violation of rights</li>
              </ul>
              <p className="mt-3">
                Further, StardewPriceDB does not warrant or make any representations concerning the 
                accuracy, likely results, or reliability of the use of the materials on its website.
              </p>
            </Section>

            <Section title="4. Accuracy of Information">
              <p>
                While we strive to provide accurate and up-to-date information about Stardew Valley 
                item prices and game mechanics, we cannot guarantee 100% accuracy. Game updates may 
                change values, and there may be occasional errors in our database. Users should 
                verify critical information in-game when necessary.
              </p>
            </Section>

            <Section title="5. Fan-Made Content Notice">
              <p className="mb-3">
                StardewPriceDB is an unofficial fan-made resource. We are not affiliated with, 
                endorsed by, or connected to ConcernedApe or Stardew Valley in any official capacity. 
                Stardew Valley and all related properties are trademarks of ConcernedApe.
              </p>
              <p>
                All game data, images, and information used on this website are the property of their 
                respective owners and are used under fair use for informational and educational purposes.
              </p>
            </Section>

            <Section title="6. Limitations">
              <p>
                In no event shall StardewPriceDB or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business interruption) 
                arising out of the use or inability to use the materials on StardewPriceDB.
              </p>
            </Section>

            <Section title="7. External Links">
              <p>
                StardewPriceDB has not reviewed all of the sites linked to its website and is not 
                responsible for the contents of any such linked site. The inclusion of any link does 
                not imply endorsement by StardewPriceDB. Use of any such linked website is at the 
                user own risk.
              </p>
            </Section>

            <Section title="8. Modifications">
              <p>
                StardewPriceDB may revise these Terms of Service at any time without notice. By using 
                this website, you are agreeing to be bound by the then current version of these Terms 
                of Service.
              </p>
            </Section>

            <Section title="9. User Conduct">
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any portion of the website</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Scrape or harvest data from the website for commercial purposes without permission</li>
                <li>Upload or transmit viruses or any other malicious code</li>
              </ul>
            </Section>

            <Section title="10. Governing Law">
              <p>
                These terms and conditions are governed by and construed in accordance with applicable 
                laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that 
                location.
              </p>
            </Section>

            <Section title="11. Contact Information">
              <p className="mb-3">If you have any questions about these Terms of Service, please contact us at:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: contact@stardewpricedb.com</li>
                <li>Website: <Link href="/contact" className="text-blue-600 hover:underline">Contact Page</Link></li>
              </ul>
            </Section>
          </div>
        </article>
      </main>
    </>
  );
}
