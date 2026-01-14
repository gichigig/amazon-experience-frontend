import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { user, profile, signOut, activeRole, switchToSeller, switchToCustomer } = useAuth();
  const navigate = useNavigate();

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

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate("/");
  };

  const handleSwitchRole = () => {
    if (activeRole === "seller") {
      switchToCustomer();
    } else if (profile?.is_seller) {
      switchToSeller();
    }
    setIsOpen(false);
  };

  const guestListItems = [
    { name: "Your Account", link: "/login" },
    { name: "Your Orders", link: "/login" },
    { name: "Your Wish List", link: "/login" },
    { name: "Your Recommendations", link: "/login" },
  ];

  const userListItems = [
    { name: "Your Account", link: "#" },
    { name: "Your Orders", link: "#" },
    { name: "Your Wish List", link: "#" },
    { name: "Your Recommendations", link: "#" },
    { name: "Your Prime Membership", link: "#" },
    { name: "Memberships & Subscriptions", link: "#" },
  ];

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hidden sm:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
        <span className="text-xs text-gray-300">
          Hello, {user ? displayName : "sign in"}
        </span>
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
        {!user ? (
          <>
            {/* Guest: Sign In Section */}
            <div className="p-4 border-b border-border text-center">
              <Link 
                to="/login"
                onClick={() => setIsOpen(false)}
                className="amazon-button inline-block w-48 mb-2 text-center"
              >
                Sign in
              </Link>
              <p className="text-xs text-card-foreground">
                New customer?{" "}
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="text-amazon-blue hover:text-amazon-orange hover:underline"
                >
                  Start here.
                </Link>
              </p>
            </div>

            {/* Guest Lists and Account */}
            <div className="flex p-4 gap-8">
              <div className="flex-1">
                <h3 className="font-bold text-card-foreground mb-2 pb-2 border-b border-border">Your Lists</h3>
                <ul className="space-y-1">
                  <li>
                    <Link 
                      to="/login" 
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-card-foreground hover:text-amazon-orange hover:underline"
                    >
                      Create a List
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/login" 
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-card-foreground hover:text-amazon-orange hover:underline"
                    >
                      Find a List or Registry
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex-1 border-l border-border pl-8">
                <h3 className="font-bold text-card-foreground mb-2 pb-2 border-b border-border">Your Account</h3>
                <ul className="space-y-1">
                  {guestListItems.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-card-foreground hover:text-amazon-orange hover:underline"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Logged In User Section */}
            <div className="p-4 border-b border-border">
              <p className="text-sm text-card-foreground mb-2">
                Welcome, <span className="font-bold">{displayName}</span>
              </p>
              {profile?.is_seller && (
                <p className="text-xs text-muted-foreground mb-2">
                  Current role: <span className="font-medium capitalize">{activeRole}</span>
                </p>
              )}
            </div>

            <div className="flex p-4 gap-8">
              <div className="flex-1">
                <h3 className="font-bold text-card-foreground mb-2 pb-2 border-b border-border">Quick Links</h3>
                <ul className="space-y-1">
                  {profile?.is_seller && (
                    <li>
                      <button
                        onClick={handleSwitchRole}
                        className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
                      >
                        {activeRole === "seller" ? "Switch to Customer" : "Switch to Seller"}
                      </button>
                    </li>
                  )}
                  {activeRole === "seller" && (
                    <li>
                      <Link 
                        to="/seller/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-card-foreground hover:text-amazon-orange hover:underline"
                      >
                        Seller Dashboard
                      </Link>
                    </li>
                  )}
                  {!profile?.is_seller && (
                    <li>
                      <Link 
                        to="/seller/login"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-card-foreground hover:text-amazon-orange hover:underline"
                      >
                        Start Selling
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex-1 border-l border-border pl-8">
                <h3 className="font-bold text-card-foreground mb-2 pb-2 border-b border-border">Your Account</h3>
                <ul className="space-y-1">
                  {userListItems.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-card-foreground hover:text-amazon-orange hover:underline"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-sm text-red-600 hover:text-red-700 hover:underline"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountDropdown;
