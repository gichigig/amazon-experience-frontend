const Footer = () => {
  const footerSections = [
    {
      title: "Get to Know Us",
      links: ["Careers", "Blog", "About Amazon", "Investor Relations", "Amazon Devices", "Amazon Science"]
    },
    {
      title: "Make Money with Us",
      links: ["Sell products on Amazon", "Sell on Amazon Business", "Sell apps on Amazon", "Become an Affiliate", "Advertise Your Products", "Self-Publish with Us"]
    },
    {
      title: "Amazon Payment Products",
      links: ["Amazon Business Card", "Shop with Points", "Reload Your Balance", "Amazon Currency Converter"]
    },
    {
      title: "Let Us Help You",
      links: ["Amazon and COVID-19", "Your Account", "Your Orders", "Shipping Rates & Policies", "Returns & Replacements", "Manage Your Content and Devices", "Help"]
    }
  ];

  return (
    <footer className="mt-8">
      {/* Back to top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-amazon-navy-light hover:bg-[hsl(210,25%,20%)] text-white py-3 text-sm transition-colors"
      >
        Back to top
      </button>

      {/* Main Footer */}
      <div className="bg-amazon-navy text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-bold mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-300 text-sm hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
              <div className="text-2xl font-bold">
                amazon
                <span className="text-amazon-orange text-sm">.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>🌐 English</span>
                <span>$ USD - U.S. Dollar</span>
                <span>🇺🇸 United States</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-amazon-navy-light text-gray-400 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs mb-2">
            {["Conditions of Use", "Privacy Notice", "Consumer Health Data Privacy Disclosure", "Your Ads Privacy Choices"].map((item) => (
              <a key={item} href="#" className="hover:underline">
                {item}
              </a>
            ))}
          </div>
          <p className="text-center text-xs">
            © 1996-2024, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
