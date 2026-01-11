import { Search, MapPin, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import AllMenuSidebar from "./AllMenuSidebar";
import NavDropdown from "./NavDropdown";
import AccountDropdown from "./AccountDropdown";
import CartDropdown from "./CartDropdown";
import LanguageDropdown from "./LanguageDropdown";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = [
    "All", "Alexa Skills", "Amazon Devices", "Amazon Pharmacy", "Appliances",
    "Apps & Games", "Arts, Crafts & Sewing", "Automotive", "Baby", "Beauty & Personal Care",
    "Books", "CDs & Vinyl", "Cell Phones & Accessories", "Clothing, Shoes & Jewelry",
    "Collectibles & Fine Art", "Computers", "Electronics", "Garden & Outdoor",
    "Grocery & Gourmet Food", "Handmade", "Health, Household & Baby Care", "Home & Kitchen",
    "Industrial & Scientific", "Kindle Store", "Luggage & Travel Gear", "Movies & TV",
    "Musical Instruments", "Office Products", "Pet Supplies", "Software", "Sports & Outdoors",
    "Tools & Home Improvement", "Toys & Games", "Video Games"
  ];

  const navItems = {
    todaysDeals: [
      { name: "Deal of the Day" },
      { name: "Lightning Deals" },
      { name: "Best Deals" },
      { name: "Coupons" },
      { name: "Prime Early Access" },
      { name: "Outlet" },
      { name: "Warehouse Deals" },
      { name: "Digital Deals" },
    ],
    customerService: [
      { name: "Your Orders" },
      { name: "Returns & Refunds" },
      { name: "Manage Prime" },
      { name: "Payments & Gift Cards" },
      { name: "Account Settings" },
      { name: "Contact Us" },
      { name: "Accessibility" },
      { name: "Help Topics" },
    ],
    registry: [
      { name: "Wedding Registry" },
      { name: "Baby Registry" },
      { name: "Birthday Gift List" },
      { name: "Custom Gift List" },
      { name: "Find a Registry" },
      { name: "Registry Help" },
    ],
    giftCards: [
      { name: "eGift Cards" },
      { name: "Physical Gift Cards" },
      { name: "Gift Card by Text" },
      { name: "Gift Card by Email" },
      { name: "For Business" },
      { name: "Redeem a Gift Card" },
      { name: "Reload Your Balance" },
      { name: "View Your Balance" },
    ],
    sell: [
      { name: "Start Selling" },
      { name: "How to Sell" },
      { name: "Sell Apps" },
      { name: "Sell Services" },
      { name: "Become an Affiliate" },
      { name: "Advertise Your Products" },
      { name: "Fulfillment by Amazon" },
      { name: "Seller University" },
    ],
  };

  return (
    <>
      <header className="amazon-gradient sticky top-0 z-40">
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
                className="bg-transparent text-foreground text-xs py-2 outline-none cursor-pointer max-w-[100px]"
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
          <LanguageDropdown />

          {/* Account */}
          <AccountDropdown />

          {/* Returns & Orders */}
          <div className="hidden md:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
            <span className="text-xs text-gray-300">Returns</span>
            <span className="font-bold text-sm">& Orders</span>
          </div>

          {/* Cart */}
          <CartDropdown />
        </div>

        {/* Category Nav */}
        <nav className="category-nav flex items-center gap-1 px-2 py-1 text-sm overflow-x-auto">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-1 px-2 py-1 hover:border hover:border-white rounded whitespace-nowrap"
          >
            <Menu size={18} />
            <span className="font-bold">All</span>
          </button>
          
          <NavDropdown label="Today's Deals" items={navItems.todaysDeals} />
          <NavDropdown label="Customer Service" items={navItems.customerService} />
          <NavDropdown label="Registry" items={navItems.registry} />
          <NavDropdown label="Gift Cards" items={navItems.giftCards} />
          <NavDropdown label="Sell" items={navItems.sell} />
          
          <NavDropdown 
            label="Shop great deals on fashion" 
            items={[
              { name: "Women's Fashion" },
              { name: "Men's Fashion" },
              { name: "Girls' Fashion" },
              { name: "Boys' Fashion" },
              { name: "Jewelry" },
              { name: "Watches" },
              { name: "Handbags" },
              { name: "Shoes" },
            ]} 
            isHighlighted 
          />
        </nav>
      </header>

      {/* All Menu Sidebar */}
      <AllMenuSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
