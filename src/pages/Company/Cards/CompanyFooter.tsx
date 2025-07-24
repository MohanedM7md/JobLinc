function CompanyFooter() {
    const date = new Date();

    
    const footerSections = [
      {
        title: "General",
        links: [
          "About",
          "Accessibility",
          "Talent Solutions",
          "Professional Community",
          "Careers",
        ],
      },
      {
        title: "Solutions",
        links: [
          "Marketing Solutions",
          "Sales Solutions",
          "Small Business",
          "Safety Center",
        ],
      },
      {
        title: "Policies",
        links: [
          "Community Policies",
          "Privacy & Terms",
          "Ad Choices",
          "Advertising",
        ],
      },
      {
        title: "Resources",
        links: [
          "Mobile",
          "Questions? Visit our Help Center",
          "Manage your account and privacy",
          "Recommendation transparency",
        ],
      },
    ];
  
    return (
      <footer className="text-mutedSilver py-8 px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto">
          {/* Grid Sections */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-2">
                <h4 className="font-semibold text-charcoalBlack text-sm mb-2">
                  {section.title}
                </h4>
                <div className="flex flex-col space-y-2">
                  {section.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-sm hover:underline hover:text-crimsonRed"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
  
          {/* Lower Section */}
          <div className="border-t pt-6 mt-6">
            {/* Branding & Language */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm">JobLinc Corporation © {date.getFullYear()}</span>
              </div>
              
              {/* Additional Links */}
              <div className="flex flex-wrap gap-4">
                <a href="#" className="text-sm hover:underline hover:text-crimsonRed">
                  User Agreement
                </a>
                <a href="#" className="text-sm hover:underline hover:text-crimsonRed">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm hover:underline hover:text-crimsonRed">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default CompanyFooter;