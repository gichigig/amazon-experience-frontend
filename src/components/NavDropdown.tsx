import { useState, useRef, useEffect } from "react";

interface NavDropdownProps {
  label: string;
  items: { name: string; href?: string }[];
  isHighlighted?: boolean;
}

const NavDropdown = ({ label, items, isHighlighted = false }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className={`px-3 py-1.5 hover:border hover:border-white rounded whitespace-nowrap transition-colors ${
          isHighlighted ? "font-bold text-amazon-orange" : ""
        }`}
      >
        {label}
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full left-0 mt-1 min-w-[200px] bg-card border border-border rounded-md shadow-xl z-50 transition-all duration-200 ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <ul className="py-2">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={item.href || "#"}
                className="block px-4 py-2 text-sm text-card-foreground hover:bg-muted transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavDropdown;
