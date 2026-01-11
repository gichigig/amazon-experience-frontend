import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const AccountDropdown = () => {
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

  const listItems = [
    "Your Account",
    "Your Orders",
    "Your Wish List",
    "Your Recommendations",
    "Your Prime Membership",
    "Your Prime Video",
    "Your Subscribe & Save Items",
    "Memberships & Subscriptions",
    "Your Seller Account",
    "Manage Your Content and Devices",
    "Your Free Amazon Business Account",
    "Switch Accounts",
    "Sign Out"
  ];

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hidden sm:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
        <span className="text-xs text-gray-300">Hello, sign in</span>
        <div className="flex items-center gap-1">
          <span className="font-bold text-sm">Account & Lists</span>
          <ChevronDown size={12} />
        </div>
      </div>

      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full right-0 mt-1 w-[400px] bg-card border border-border rounded-md shadow-xl z-50 transition-all duration-200 ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {/* Sign In Section */}
        <div className="p-4 border-b border-border text-center">
          <button className="amazon-button w-48 mb-2">Sign in</button>
          <p className="text-xs text-card-foreground">
            New customer? <a href="#" className="text-amazon-blue hover:text-amazon-orange hover:underline">Start here.</a>
          </p>
        </div>

        {/* Lists and Account */}
        <div className="flex p-4 gap-8">
          {/* Your Lists */}
          <div className="flex-1">
            <h3 className="font-bold text-card-foreground mb-2 pb-2 border-b border-border">Your Lists</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-sm text-card-foreground hover:text-amazon-orange hover:underline">Create a List</a></li>
              <li><a href="#" className="text-sm text-card-foreground hover:text-amazon-orange hover:underline">Find a List or Registry</a></li>
            </ul>
          </div>

          {/* Your Account */}
          <div className="flex-1 border-l border-border pl-8">
            <h3 className="font-bold text-card-foreground mb-2 pb-2 border-b border-border">Your Account</h3>
            <ul className="space-y-1">
              {listItems.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-card-foreground hover:text-amazon-orange hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;
