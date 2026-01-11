import { Search, MapPin, ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All", "Alexa Skills", "Amazon Devices", "Amazon Pharmacy", "Appliances",
    "Apps & Games", "Arts, Crafts & Sewing", "Automotive", "Baby", "Beauty & Personal Care"
  ];

  return (
    <header className="amazon-gradient sticky top-0 z-50">
      {/* Main Header */}
      <div className="flex items-center gap-2 px-2 py-2 md:gap-4 md:px-4">
        {/* Logo */}
        <div className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer min-w-fit">
          <span className="text-white text-xl md:text-2xl font-bold tracking-tight">
            amazon
          </span>
          <span className="text-amazon-orange text-xs">.com</span>
        </div>

        {/* Deliver To */}
        <div className="hidden md:flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
          <MapPin size={18} />
          <div className="flex flex-col text-xs">
            <span className="text-gray-300">Deliver to</span>
            <span className="font-bold">United States</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 max-w-3xl">
          <div className="hidden md:flex items-center bg-muted rounded-l px-2 border-r border-border">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-foreground text-xs py-2 outline-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Amazon"
            className="flex-1 px-3 py-2 text-sm text-foreground outline-none rounded-l md:rounded-none"
          />
          <button className="bg-amazon-orange hover:bg-amazon-orange-hover px-3 py-2 rounded-r transition-colors">
            <Search size={20} className="text-secondary" />
          </button>
        </div>

        {/* Language */}
        <div className="hidden lg:flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
          <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-4" />
          <span className="font-bold text-sm">EN</span>
          <ChevronDown size={12} />
        </div>

        {/* Account */}
        <div className="hidden sm:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
          <span className="text-xs text-gray-300">Hello, sign in</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm">Account & Lists</span>
            <ChevronDown size={12} />
          </div>
        </div>

        {/* Returns & Orders */}
        <div className="hidden md:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
          <span className="text-xs text-gray-300">Returns</span>
          <span className="font-bold text-sm">& Orders</span>
        </div>

        {/* Cart */}
        <div className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
          <div className="relative">
            <ShoppingCart size={28} />
            <span className="absolute -top-1 right-0 bg-amazon-orange text-secondary text-xs font-bold rounded-full px-1.5">
              0
            </span>
          </div>
          <span className="hidden sm:block font-bold text-sm ml-1">Cart</span>
        </div>
      </div>

      {/* Category Nav */}
      <nav className="category-nav flex items-center gap-1 px-2 py-1 text-sm overflow-x-auto">
        <button className="flex items-center gap-1 px-2 py-1 hover:border hover:border-white rounded whitespace-nowrap">
          <Menu size={18} />
          <span className="font-bold">All</span>
        </button>
        {["Today's Deals", "Customer Service", "Registry", "Gift Cards", "Sell"].map((item) => (
          <button 
            key={item}
            className="px-2 py-1 hover:border hover:border-white rounded whitespace-nowrap"
          >
            {item}
          </button>
        ))}
        <span className="px-2 py-1 font-bold text-amazon-orange whitespace-nowrap">
          Shop great deals on fashion
        </span>
      </nav>
    </header>
  );
};

export default Header;
