import { X, ChevronRight, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AllMenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SubItem {
  name: string;
  slug?: string;
}

interface MenuItem {
  name: string;
  slug?: string;
  subItems?: SubItem[];
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    title: "Digital Content & Devices",
    items: [
      { name: "Amazon Music", subItems: [{ name: "Open Web Player" }, { name: "Music Unlimited" }, { name: "Free Streaming Music" }, { name: "Podcasts" }] },
      { name: "Kindle E-readers & Books", subItems: [{ name: "Kindle eReaders" }, { name: "Kindle Store" }, { name: "Kindle Unlimited" }, { name: "Prime Reading" }] },
      { name: "Amazon Appstore", subItems: [{ name: "All Apps and Games" }, { name: "Games" }, { name: "Amazon Coins" }] },
    ]
  },
  {
    title: "Shop by Department",
    items: [
      { name: "Electronics", slug: "electronics", subItems: [
        { name: "Accessories & Supplies" }, { name: "Camera & Photo" }, { name: "Car & Vehicle Electronics" }, 
        { name: "Cell Phones" }, { name: "Computers & Tablets" }, { name: "GPS & Navigation" }, 
        { name: "Headphones" }, { name: "Home Audio" }, { name: "Office Electronics" }, 
        { name: "Television & Video" }, { name: "Wearable Technology" }
      ]},
      { name: "Computers", slug: "computers", subItems: [
        { name: "Computer Accessories" }, { name: "Computer Components" }, { name: "Computers & Tablets" },
        { name: "Data Storage" }, { name: "Monitors" }, { name: "Networking Products" },
        { name: "Printers" }, { name: "Laptop Accessories" }
      ]},
      { name: "Home & Kitchen", slug: "home-kitchen", subItems: [
        { name: "Kitchen & Dining" }, { name: "Bedding" }, { name: "Bath" }, { name: "Furniture" },
        { name: "Home Décor" }, { name: "Lighting & Ceiling Fans" }, { name: "Storage & Organization" }
      ]},
      { name: "Books", slug: "books", subItems: [
        { name: "Fiction" }, { name: "Non-Fiction" }, { name: "Children's Books" }, { name: "Textbooks" },
        { name: "Audiobooks" }, { name: "Magazines" }
      ]},
      { name: "Toys & Games", slug: "toys-games", subItems: [
        { name: "Action Figures" }, { name: "Arts & Crafts" }, { name: "Building Toys" },
        { name: "Dolls & Accessories" }, { name: "Games" }, { name: "Puzzles" }, { name: "Outdoor Play" }
      ]},
      { name: "Sports & Outdoors", slug: "sports-outdoors", subItems: [
        { name: "Exercise & Fitness" }, { name: "Outdoor Recreation" }, { name: "Team Sports" },
        { name: "Golf" }, { name: "Cycling" }, { name: "Hunting & Fishing" }
      ]},
      { name: "Beauty & Personal Care", slug: "beauty-personal-care", subItems: [
        { name: "Makeup" }, { name: "Skin Care" }, { name: "Hair Care" }, { name: "Fragrance" },
        { name: "Men's Grooming" }, { name: "Personal Care" }
      ]},
      { name: "Clothing", slug: "clothing", subItems: [
        { name: "Women's Fashion" }, { name: "Men's Fashion" }, { name: "Girls' Fashion" },
        { name: "Boys' Fashion" }, { name: "Shoes" }, { name: "Jewelry" }, { name: "Watches" }
      ]},
      { name: "Automotive", subItems: [
        { name: "Car Care" }, { name: "Car Electronics" }, { name: "Exterior Accessories" },
        { name: "Interior Accessories" }, { name: "Oils & Fluids" }, { name: "Replacement Parts" }
      ]},
      { name: "Baby", subItems: [
        { name: "Baby Care" }, { name: "Diapering" }, { name: "Feeding" }, { name: "Nursery" },
        { name: "Strollers & Accessories" }, { name: "Baby Toys" }
      ]},
      { name: "Pet Supplies", subItems: [
        { name: "Dogs" }, { name: "Cats" }, { name: "Fish & Aquatic Pets" }, { name: "Birds" },
        { name: "Small Animals" }
      ]},
      { name: "Health & Household", subItems: [
        { name: "Health Care" }, { name: "Household Supplies" }, { name: "Vitamins & Supplements" },
        { name: "Personal Care" }, { name: "Oral Care" }
      ]}
    ]
  },
  {
    title: "Programs & Features",
    items: [
      { name: "Gift Cards" },
      { name: "Today's Deals", slug: "deals" },
      { name: "Amazon Live" },
      { name: "International Shopping" }
    ]
  },
  {
    title: "Help & Settings",
    items: [
      { name: "Your Account" },
      { name: "Customer Service" },
      { name: "Sign In / Sign Up" }
    ]
  }
];

const AllMenuSidebar = ({ isOpen, onClose }: AllMenuSidebarProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [subMenuItems, setSubMenuItems] = useState<SubItem[]>([]);
  const [subMenuTitle, setSubMenuTitle] = useState("");
  const [subMenuSlug, setSubMenuSlug] = useState<string | undefined>();
  const { user, profile } = useAuth();

  const handleItemClick = (item: MenuItem) => {
    if (item.subItems && item.subItems.length > 0) {
      setSubMenuTitle(item.name);
      setSubMenuItems(item.subItems);
      setSubMenuSlug(item.slug);
      setExpandedItem(item.name);
    } else if (item.slug) {
      onClose();
    }
  };

  const handleBackClick = () => {
    setExpandedItem(null);
    setSubMenuItems([]);
    setSubMenuTitle("");
    setSubMenuSlug(undefined);
  };

  const handleCloseAll = () => {
    setExpandedItem(null);
    setSubMenuItems([]);
    setSubMenuTitle("");
    setSubMenuSlug(undefined);
    onClose();
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "sign in";

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCloseAll}
      />

      {/* Main Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-[365px] max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-hidden flex`}
      >
        {/* Primary Menu */}
        <div className={`w-full flex flex-col transition-transform duration-300 ${expandedItem ? "-translate-x-full" : "translate-x-0"}`}>
          {/* Header */}
          <Link 
            to={user ? "#" : "/login"}
            onClick={handleCloseAll}
            className="bg-[#232f3e] text-white p-4 flex items-center gap-3 hover:bg-[#37475a] transition-colors"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-700" />
            </div>
            <span className="font-bold text-lg">Hello, {displayName}</span>
          </Link>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto">
            {menuCategories.map((category, catIndex) => (
              <div key={catIndex} className="border-b border-gray-200">
                <h3 className="font-bold text-gray-900 px-6 py-3 text-lg">
                  {category.title}
                </h3>
                <ul>
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.subItems ? (
                        <button
                          onClick={() => handleItemClick(item)}
                          className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-100 text-gray-900 text-left"
                        >
                          <span>{item.name}</span>
                          <ChevronRight size={18} className="text-gray-400" />
                        </button>
                      ) : item.slug === "deals" ? (
                        <Link
                          to="/deals"
                          onClick={handleCloseAll}
                          className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-100 text-gray-900 text-left block"
                        >
                          <span>{item.name}</span>
                        </Link>
                      ) : item.slug ? (
                        <Link
                          to={`/category/${item.slug}`}
                          onClick={handleCloseAll}
                          className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-100 text-gray-900 text-left block"
                        >
                          <span>{item.name}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={handleCloseAll}
                          className="w-full flex items-center px-6 py-3 hover:bg-gray-100 text-gray-900 text-left"
                        >
                          <span>{item.name}</span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Submenu */}
        <div className={`absolute top-0 left-0 w-full h-full bg-white flex flex-col transition-transform duration-300 ${expandedItem ? "translate-x-0" : "translate-x-full"}`}>
          {/* Submenu Header */}
          <div className="bg-[#232f3e] text-white p-4">
            <button 
              onClick={handleBackClick}
              className="flex items-center gap-2 font-bold"
            >
              <ChevronRight size={18} className="rotate-180" />
              <span>Main Menu</span>
            </button>
          </div>

          {/* Submenu Title with Link */}
          {subMenuSlug ? (
            <Link 
              to={`/category/${subMenuSlug}`}
              onClick={handleCloseAll}
              className="font-bold text-gray-900 px-6 py-4 text-lg border-b border-gray-200 hover:bg-gray-100 flex items-center justify-between"
            >
              <span>{subMenuTitle}</span>
              <span className="text-sm font-normal text-blue-600">See all</span>
            </Link>
          ) : (
            <h3 className="font-bold text-gray-900 px-6 py-4 text-lg border-b border-gray-200">
              {subMenuTitle}
            </h3>
          )}

          {/* Submenu Items */}
          <div className="flex-1 overflow-y-auto">
            <ul>
              {subMenuItems.map((subItem, index) => (
                <li key={index}>
                  <button 
                    onClick={handleCloseAll}
                    className="w-full px-6 py-3 hover:bg-gray-100 text-gray-900 text-left"
                  >
                    {subItem.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={handleCloseAll}
        className={`fixed top-4 left-[375px] z-50 text-white transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <X size={28} />
      </button>
    </>
  );
};

export default AllMenuSidebar;
