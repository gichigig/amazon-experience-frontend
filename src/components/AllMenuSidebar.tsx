import { X, ChevronRight, User, Globe, HelpCircle } from "lucide-react";
import { useState } from "react";

interface AllMenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuCategories = [
  {
    title: "Digital Content & Devices",
    items: [
      { name: "Amazon Music", subItems: ["Open Web Player", "Music Unlimited", "Free Streaming Music", "Podcasts"] },
      { name: "Kindle E-readers & Books", subItems: ["Kindle eReaders", "Kindle Store", "Kindle Unlimited", "Prime Reading"] },
      { name: "Amazon Appstore", subItems: ["All Apps and Games", "Games", "Amazon Coins"] },
    ]
  },
  {
    title: "Shop by Department",
    items: [
      { name: "Electronics", subItems: ["Accessories & Supplies", "Camera & Photo", "Car & Vehicle Electronics", "Cell Phones", "Computers & Tablets", "GPS & Navigation", "Headphones", "Home Audio", "Office Electronics", "Portable Audio", "Security & Surveillance", "Television & Video", "Video Game Consoles", "Wearable Technology"] },
      { name: "Computers", subItems: ["Computer Accessories", "Computer Components", "Computers & Tablets", "Data Storage", "External Components", "Laptop Accessories", "Monitors", "Networking Products", "Power Strips", "Printers", "Scanners", "Servers", "Tablet Accessories", "Warranties"] },
      { name: "Smart Home", subItems: ["Amazon Smart Home", "Smart Home Lighting", "Smart Locks & Entry", "Security Cameras", "Smart Plugs", "Heating & Cooling", "Detectors & Sensors", "Home Entertainment", "Voice Assistants", "Network & WiFi"] },
      { name: "Arts & Crafts", subItems: ["Painting", "Drawing", "Knitting & Crochet", "Sewing", "Scrapbooking", "Beading & Jewelry", "Model Building", "Craft Supplies", "Gift Wrapping", "Party Decorations"] },
      { name: "Automotive", subItems: ["Car Care", "Car Electronics", "Exterior Accessories", "Interior Accessories", "Lights & Accessories", "Motorcycle Parts", "Oils & Fluids", "Paint & Supplies", "Performance Parts", "Replacement Parts", "RV Parts", "Tires & Wheels", "Tools & Equipment"] },
      { name: "Baby", subItems: ["Activity & Entertainment", "Apparel & Accessories", "Baby & Toddler Toys", "Baby Care", "Baby Stationery", "Car Seats & Accessories", "Diapering", "Feeding", "Gifts", "Nursery", "Potty Training", "Pregnancy & Maternity", "Safety", "Strollers & Accessories", "Travel Gear"] },
      { name: "Beauty & Personal Care", subItems: ["Makeup", "Skin Care", "Hair Care", "Fragrance", "Foot & Hand Care", "Men's Grooming", "Oral Care", "Shave & Hair Removal", "Personal Care", "Tools & Accessories"] },
      { name: "Women's Fashion", subItems: ["Clothing", "Shoes", "Jewelry", "Watches", "Handbags", "Accessories"] },
      { name: "Men's Fashion", subItems: ["Clothing", "Shoes", "Watches", "Accessories"] },
      { name: "Girls' Fashion", subItems: ["Clothing", "Shoes", "Jewelry", "Watches", "Accessories"] },
      { name: "Boys' Fashion", subItems: ["Clothing", "Shoes", "Watches", "Accessories"] },
      { name: "Health & Household", subItems: ["Baby & Child Care", "Health Care", "Household Supplies", "Medical Supplies", "Oral Care", "Personal Care", "Sexual Wellness", "Sports Nutrition", "Stationery & Gift Wrapping", "Vitamins & Supplements", "Wellness & Relaxation"] },
      { name: "Home & Kitchen", subItems: ["Kids' Home Store", "Kitchen & Dining", "Bedding", "Bath", "Furniture", "Home Décor", "Wall Art", "Lighting & Ceiling Fans", "Seasonal Décor", "Event & Party Supplies", "Heating & Cooling", "Irons & Steamers", "Vacuums & Floor Care", "Storage & Organization"] },
      { name: "Industrial & Scientific", subItems: ["Abrasive & Finishing Products", "Additive Manufacturing", "Commercial Door Products", "Cutting Tools", "Fasteners", "Filtration", "Food Service Equipment", "Hydraulics & Pneumatics", "Industrial Electrical", "Industrial Hardware", "Industrial Power", "Janitorial & Sanitation", "Lab & Scientific", "Material Handling", "Occupational Health", "Packaging & Shipping", "Power Transmission", "Professional Dental", "Professional Medical", "Raw Materials", "Retail Store Fixtures", "Robotics", "Science Education", "Tapes & Adhesives", "Test & Measure"] },
      { name: "Luggage", subItems: ["Carry-ons", "Backpacks", "Garment Bags", "Travel Totes", "Luggage Sets", "Laptop Bags", "Suitcases", "Kids' Luggage", "Travel Accessories", "Umbrellas"] },
      { name: "Movies & Television", subItems: ["Movies", "TV Shows", "Blu-ray", "4K Ultra HD", "Best Sellers"] },
      { name: "Pet Supplies", subItems: ["Dogs", "Cats", "Fish & Aquatic Pets", "Birds", "Horses", "Reptiles & Amphibians", "Small Animals"] },
      { name: "Software", subItems: ["Accounting & Finance", "Antivirus & Security", "Business & Office", "Children's", "Design & Illustration", "Education & Reference", "Games", "Lifestyle & Hobbies", "Music", "Networking & Servers", "Operating Systems", "Photography", "Programming & Web Development", "Tax Preparation", "Utilities", "Video"] },
      { name: "Sports & Outdoors", subItems: ["Sports & Fitness", "Outdoor Recreation", "Fan Shop"] },
      { name: "Tools & Home Improvement", subItems: ["Appliances", "Building Supplies", "Electrical", "Hardware", "Kitchen & Bath Fixtures", "Light Bulbs", "Lighting & Ceiling Fans", "Measuring & Layout Tools", "Painting Supplies", "Power & Hand Tools", "Rough Plumbing", "Safety & Security", "Storage & Home Organization", "Welding & Soldering"] },
      { name: "Toys & Games", subItems: ["Action Figures", "Arts & Crafts", "Baby & Toddler Toys", "Building Toys", "Dolls & Accessories", "Dress Up & Pretend Play", "Electronics for Kids", "Games", "Grown-Up Toys", "Hobbies", "Kids' Furniture", "Learning & Education", "Novelty & Gag Toys", "Party Supplies", "Puzzles", "Sports & Outdoor Play", "Stuffed Animals", "Toy Remote Control", "Tricycles & Scooters", "Video Games"] },
      { name: "Video Games", subItems: ["PlayStation 5", "PlayStation 4", "Xbox Series X & S", "Xbox One", "Nintendo Switch", "PC", "Mac", "Retro Gaming", "Accessories", "Digital Games", "Kids & Family"] }
    ]
  },
  {
    title: "Programs & Features",
    items: [
      { name: "Gift Cards" },
      { name: "Shop By Interest", subItems: ["Collectibles & Fine Art", "Luxury Stores", "Handmade", "Climate Pledge Friendly", "Launchpad", "Made in USA"] },
      { name: "Amazon Live" },
      { name: "International Shopping" }
    ]
  },
  {
    title: "Help & Settings",
    items: [
      { name: "Your Account" },
      { name: "English" },
      { name: "United States" },
      { name: "Customer Service" }
    ]
  }
];

const AllMenuSidebar = ({ isOpen, onClose }: AllMenuSidebarProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [subMenuItems, setSubMenuItems] = useState<string[]>([]);
  const [subMenuTitle, setSubMenuTitle] = useState("");

  const handleItemClick = (itemName: string, subItems?: string[]) => {
    if (subItems && subItems.length > 0) {
      setSubMenuTitle(itemName);
      setSubMenuItems(subItems);
      setExpandedItem(itemName);
    }
  };

  const handleBackClick = () => {
    setExpandedItem(null);
    setSubMenuItems([]);
    setSubMenuTitle("");
  };

  const handleCloseAll = () => {
    setExpandedItem(null);
    setSubMenuItems([]);
    setSubMenuTitle("");
    onClose();
  };

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
        className={`fixed top-0 left-0 h-full w-[365px] max-w-[85vw] bg-card z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-hidden flex`}
      >
        {/* Primary Menu */}
        <div className={`w-full flex flex-col transition-transform duration-300 ${expandedItem ? "-translate-x-full" : "translate-x-0"}`}>
          {/* Header */}
          <div className="bg-amazon-navy text-white p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User size={20} className="text-foreground" />
            </div>
            <span className="font-bold text-lg">Hello, sign in</span>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto">
            {menuCategories.map((category, catIndex) => (
              <div key={catIndex} className="border-b border-border">
                <h3 className="font-bold text-card-foreground px-6 py-3 text-lg">
                  {category.title}
                </h3>
                <ul>
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <button
                        onClick={() => handleItemClick(item.name, item.subItems)}
                        className="w-full flex items-center justify-between px-6 py-3 hover:bg-muted text-card-foreground text-left"
                      >
                        <span>{item.name}</span>
                        {item.subItems && <ChevronRight size={18} className="text-muted-foreground" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Submenu */}
        <div className={`absolute top-0 left-0 w-full h-full bg-card flex flex-col transition-transform duration-300 ${expandedItem ? "translate-x-0" : "translate-x-full"}`}>
          {/* Submenu Header */}
          <div className="bg-amazon-navy text-white p-4">
            <button 
              onClick={handleBackClick}
              className="flex items-center gap-2 font-bold"
            >
              <ChevronRight size={18} className="rotate-180" />
              <span>Main Menu</span>
            </button>
          </div>

          {/* Submenu Title */}
          <h3 className="font-bold text-card-foreground px-6 py-4 text-lg border-b border-border">
            {subMenuTitle}
          </h3>

          {/* Submenu Items */}
          <div className="flex-1 overflow-y-auto">
            <ul>
              {subMenuItems.map((subItem, index) => (
                <li key={index}>
                  <button className="w-full px-6 py-3 hover:bg-muted text-card-foreground text-left">
                    {subItem}
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
