import { useState, useRef, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

const CartDropdown = () => {
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
    }, 200);
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
      <div className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
        <div className="relative">
          <ShoppingCart size={28} />
          <span className="absolute -top-1 right-0 bg-amazon-orange text-secondary text-xs font-bold rounded-full px-1.5">
            0
          </span>
        </div>
        <span className="hidden sm:block font-bold text-sm ml-1">Cart</span>
      </div>

      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full right-0 mt-1 w-[320px] bg-card border border-border rounded-md shadow-xl z-50 transition-all duration-200 ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="p-6 text-center">
          <div className="mb-4">
            <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-3" />
            <h3 className="font-bold text-card-foreground text-lg">Your Amazon Cart is empty</h3>
          </div>
          
          <div className="space-y-2 mb-4">
            <a href="#" className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline block">
              Shop today's deals
            </a>
            <a href="#" className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline block">
              Shop the New Year Sale
            </a>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 amazon-button text-sm">Sign in to your account</button>
            <button className="flex-1 border border-border rounded-lg px-4 py-2 text-sm text-card-foreground hover:bg-muted transition-colors">
              Sign up now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
