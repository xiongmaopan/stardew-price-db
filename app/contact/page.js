import Link from 'next/link';

export const metadata = {
  title: 'Contact Us - StardewPriceDB | Get in Touch',
  description: 'Contact the StardewPriceDB team. Report bugs, suggest features, or ask questions about our Stardew Valley price database and calculators.',
  keywords: [
    'contact StardewPriceDB',
    'Stardew Valley database support',
    'report bug Stardew Valley',
    'Stardew Valley community'
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact StardewPriceDB',
    description: 'Get in touch with our team for support, feedback, or suggestions.',
    url: 'https://stardewpricedb.com/contact',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact StardewPriceDB',
  description: 'Contact the StardewPriceDB team',
  url: 'https://stardewpricedb.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'StardewPriceDB',
    email: 'contact@stardewpricedb.com',
    url: 'https://stardewpricedb.com'
  }
};

function ContactCard({ title, description, link, linkText }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-slate-800 mb-4">{title}</h2>
      <p className="text-slate-600 mb-4">{description}</p>
      <a 
        href={link} 
        target={link.startsWith('http') ? '_blank' : undefined}
        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:text-blue-700 font-medium"
      >
        {linkText}
      </a>
    </div>
  );
}

function HelpCard({ title, description, bgColor, borderColor }) {
  return (
    <div className={`${bgColor} rounded-xl p-5 border ${borderColor}`}>
      <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200">
      <h3 className="font-bold text-slate-800 mb-2">{question}</h3>
      <p className="text-slate-600 text-sm">{answer}</p>
    </div>
  );
}

export default function ContactPage() {
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
          <span className="text-slate-800">Contact</span>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Get in Touch</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have a question, found a bug, or want to suggest a feature? We would love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <ContactCard 
            title="Email Us"
            description="For general inquiries, partnerships, or detailed questions."
            link="mailto:contact@stardewpricedb.com"
            linkText="contact@stardewpricedb.com"
          />
          <ContactCard 
            title="GitHub"
            description="Found a bug or want to contribute? Open an issue or pull request."
            link="https://github.com/stardewpricedb"
            linkText="github.com/stardewpricedb"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">How Can We Help?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <HelpCard 
              title="Report a Bug"
              description="Found incorrect data or a broken feature? Let us know so we can fix it quickly."
              bgColor="bg-red-50"
              borderColor="border-red-100"
            />
            <HelpCard 
              title="Suggest a Feature"
              description="Have an idea for a new calculator or guide? We are always looking to improve."
              bgColor="bg-amber-50"
              borderColor="border-amber-100"
            />
            <HelpCard 
              title="Ask a Question"
              description="Confused about game mechanics or need help using our tools? We are here to help."
              bgColor="bg-green-50"
              borderColor="border-green-100"
            />
          </div>
        </section>

        <section className="bg-slate-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem 
              question="How often is the database updated?"
              answer="We update our database with every major Stardew Valley patch. Our data is currently verified for version 1.6.14."
            />
            <FAQItem 
              question="Can I use your data for my own project?"
              answer="For non-commercial educational or personal projects, feel free to reference our data with attribution. For commercial use, please contact us first."
            />
            <FAQItem 
              question="I found a price that does not match the game. What should I do?"
              answer="Please email us with the item name, the price you see in-game, and your game version. We will investigate and fix it!"
            />
            <FAQItem 
              question="Do you accept contributions?"
              answer="Absolutely! We welcome contributions for data corrections, new features, or translations. Check our GitHub for contribution guidelines."
            />
          </div>
        </section>

        <div className="mt-8 text-center text-slate-500 text-sm">
          Average response time: 24-48 hours
        </div>
      </main>
    </>
  );
}
