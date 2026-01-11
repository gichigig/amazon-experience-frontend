import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "https://flagcdn.com/w20/us.png" },
  { code: "es", name: "Español", flag: "https://flagcdn.com/w20/es.png" },
  { code: "de", name: "Deutsch", flag: "https://flagcdn.com/w20/de.png" },
  { code: "fr", name: "Français", flag: "https://flagcdn.com/w20/fr.png" },
  { code: "pt", name: "Português", flag: "https://flagcdn.com/w20/br.png" },
  { code: "zh", name: "中文", flag: "https://flagcdn.com/w20/cn.png" },
  { code: "ja", name: "日本語", flag: "https://flagcdn.com/w20/jp.png" },
  { code: "ar", name: "العربية", flag: "https://flagcdn.com/w20/sa.png" },
];

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const currentLang = languages.find(l => l.code === selectedLang) || languages[0];

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hidden lg:flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
        <img src={currentLang.flag} alt={currentLang.code.toUpperCase()} className="w-5 h-4" />
        <span className="font-bold text-sm">{currentLang.code.toUpperCase()}</span>
        <ChevronDown size={12} />
      </div>

      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full right-0 mt-1 w-[280px] bg-card border border-border rounded-md shadow-xl z-50 transition-all duration-200 ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="p-4">
          <h3 className="font-bold text-card-foreground mb-3">Change language</h3>
          <ul className="space-y-1">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => setSelectedLang(lang.code)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-muted text-card-foreground text-left transition-colors"
                >
                  <img src={lang.flag} alt={lang.name} className="w-5 h-4" />
                  <span className="flex-1">{lang.name} - {lang.code.toUpperCase()}</span>
                  {selectedLang === lang.code && <Check size={16} className="text-amazon-orange" />}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="font-bold text-card-foreground mb-2">Change currency</h3>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-muted text-card-foreground text-left transition-colors">
              <span>$ - USD - US Dollar</span>
              <span className="text-amazon-blue text-sm">Change</span>
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="font-bold text-card-foreground mb-2">Change country/region</h3>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted text-card-foreground text-left transition-colors">
              <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-4" />
              <span>🇺🇸 United States</span>
              <span className="text-amazon-blue text-sm ml-auto">Change</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageDropdown;
