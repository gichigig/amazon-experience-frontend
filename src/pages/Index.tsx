import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryCard from "@/components/CategoryCard";
import CategoryGrid from "@/components/CategoryGrid";
import DealsSection from "@/components/DealsSection";
import ProductsRow from "@/components/ProductsRow";
import Footer from "@/components/Footer";

const categoryGridItems = {
  gaming: [
    { name: "Headsets", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150&h=150&fit=crop" },
    { name: "Keyboards", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=150&h=150&fit=crop" },
    { name: "Computer mice", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop" },
    { name: "Chairs", image: "https://images.unsplash.com/photo-1612550761236-e813928f7271?w=150&h=150&fit=crop" }
  ],
  home: [
    { name: "Dining", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop" },
    { name: "Home", image: "https://images.unsplash.com/photo-1484101403633-571e4eb9a66a?w=150&h=150&fit=crop" },
    { name: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=150&h=150&fit=crop" },
    { name: "Health and Beauty", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=150&h=150&fit=crop" }
  ],
  fashion: [
    { name: "Jeans under $50", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop" },
    { name: "Tops under $25", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=150&h=150&fit=crop" },
    { name: "Dresses under $30", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150&h=150&fit=crop" },
    { name: "Shoes under $50", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=150&fit=crop" }
  ],
  beauty: [
    { name: "Skincare", image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=150&h=150&fit=crop" },
    { name: "Makeup", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop" },
    { name: "Hair care", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&h=150&fit=crop" },
    { name: "Fragrance", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=150&h=150&fit=crop" }
  ]
};

const recommendedProducts = [
  { id: 101, title: "Echo Dot (5th Gen) | Smart speaker with Alexa", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=200&h=200&fit=crop", price: 27.99, originalPrice: 49.99, rating: 4.7, reviewCount: 543210, isPrime: true },
  { id: 102, title: "Fire TV Stick 4K Max streaming device", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=200&h=200&fit=crop", price: 34.99, originalPrice: 54.99, rating: 4.6, reviewCount: 234567, isPrime: true },
  { id: 103, title: "Ring Video Doorbell – 1080p HD video", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", price: 74.99, originalPrice: 99.99, rating: 4.5, reviewCount: 189432, isPrime: true },
  { id: 104, title: "Blink Mini – Compact indoor plug-in smart camera", image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=200&h=200&fit=crop", price: 19.99, originalPrice: 34.99, rating: 4.4, reviewCount: 456789, isPrime: true },
  { id: 105, title: "All-new Echo Show 8 | Smart display with Alexa", image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop", price: 84.99, originalPrice: 149.99, rating: 4.6, reviewCount: 87654, isPrime: true },
  { id: 106, title: "eero mesh WiFi router", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=200&fit=crop", price: 59.99, originalPrice: 79.99, rating: 4.5, reviewCount: 65432, isPrime: true },
  { id: 107, title: "Kindle Scribe - The first Kindle for reading and writing", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=200&h=200&fit=crop", price: 279.99, originalPrice: 339.99, rating: 4.3, reviewCount: 23456, isPrime: true },
  { id: 108, title: "Fire HD 10 tablet, 10.1\" 1080p Full HD", image: "https://images.unsplash.com/photo-1632882765546-1ee75f53becb?w=200&h=200&fit=crop", price: 89.99, originalPrice: 149.99, rating: 4.5, reviewCount: 345678, isPrime: true }
];

const bestSellers = [
  { id: 201, title: "Stanley Quencher H2.0 FlowState Stainless Steel Vacuum Tumbler", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop", price: 35.00, rating: 4.8, reviewCount: 89234, isPrime: true },
  { id: 202, title: "CeraVe Moisturizing Cream | Body and Face Moisturizer", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop", price: 16.08, rating: 4.7, reviewCount: 156789, isPrime: true },
  { id: 203, title: "Crocs Unisex-Adult Classic Clogs", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&h=200&fit=crop", price: 39.99, originalPrice: 54.99, rating: 4.8, reviewCount: 234567, isPrime: true },
  { id: 204, title: "Liquid I.V. Hydration Multiplier", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop", price: 23.98, rating: 4.6, reviewCount: 98765, isPrime: true },
  { id: 205, title: "COSRX Snail Mucin 96% Power Repairing Essence", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop", price: 13.76, originalPrice: 25.00, rating: 4.6, reviewCount: 78654, isPrime: true },
  { id: 206, title: "Apple AirTag 4 Pack", image: "https://images.unsplash.com/photo-1586253634026-8cb574908d1e?w=200&h=200&fit=crop", price: 79.00, originalPrice: 99.00, rating: 4.7, reviewCount: 145678, isPrime: true }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Carousel with overlapping cards */}
      <div className="relative">
        <HeroCarousel />
        
        {/* Category Cards overlapping carousel */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/3">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <CategoryGrid title="Gaming accessories" items={categoryGridItems.gaming} />
              <CategoryGrid title="Deals in home décor" items={categoryGridItems.home} />
              <CategoryGrid title="Fashion deals" items={categoryGridItems.fashion} />
              <CategoryGrid title="Beauty picks" items={categoryGridItems.beauty} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-48 md:pt-56 lg:pt-48">
        {/* Second row of category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <CategoryCard 
            title="Shop for your home essentials" 
            image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
          />
          <CategoryCard 
            title="New arrivals in Toys" 
            image="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop"
          />
          <CategoryCard 
            title="Explore home bedding" 
            image="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop"
          />
          <div className="bg-card p-5 rounded flex flex-col">
            <h2 className="text-lg font-bold text-card-foreground mb-3">Sign in for the best experience</h2>
            <button className="amazon-button w-full mb-3">Sign in securely</button>
            <a href="#" className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline">
              Create an account
            </a>
          </div>
        </div>

        {/* Deals Section */}
        <DealsSection />

        {/* Recommended Products Row */}
        <ProductsRow title="Inspired by your browsing history" products={recommendedProducts} />

        {/* Best Sellers Row */}
        <ProductsRow title="Best Sellers in Electronics" products={bestSellers} />

        {/* More Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <CategoryCard 
            title="Refresh your space" 
            image="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=300&fit=crop"
          />
          <CategoryCard 
            title="Shop Pet supplies" 
            image="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop"
          />
          <CategoryCard 
            title="Computers & Accessories" 
            image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
          />
          <CategoryCard 
            title="Deals in Outdoor" 
            image="https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=400&h=300&fit=crop"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
