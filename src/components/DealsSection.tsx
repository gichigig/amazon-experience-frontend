import ProductCard from "./ProductCard";

const deals = [
  {
    id: 1,
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=300&fit=crop",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.5,
    reviewCount: 125847,
    isPrime: true,
    dealBadge: "Limited time deal"
  },
  {
    id: 2,
    title: "Samsung Galaxy Tab S9 Ultra 14.6\" 256GB Wi-Fi",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.7,
    reviewCount: 8432,
    isPrime: true,
    dealBadge: "Deal of the Day"
  },
  {
    id: 3,
    title: "Sony WH-1000XM5 Noise Cancelling Wireless Headphones",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop",
    price: 278.00,
    originalPrice: 399.99,
    rating: 4.6,
    reviewCount: 45621,
    isPrime: true,
    dealBadge: "Lightning Deal"
  },
  {
    id: 4,
    title: "Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop",
    price: 79.95,
    originalPrice: 129.95,
    rating: 4.8,
    reviewCount: 234567,
    isPrime: true,
    dealBadge: "Best Seller"
  },
  {
    id: 5,
    title: "Kindle Paperwhite (16 GB) – Now with 6.8\" display",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviewCount: 89234,
    isPrime: true
  },
  {
    id: 6,
    title: "Apple Watch Series 9 [GPS 45mm] Smartwatch",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop",
    price: 349.00,
    originalPrice: 429.00,
    rating: 4.5,
    reviewCount: 12543,
    isPrime: true
  }
];

const DealsSection = () => {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Today's Deals</h2>
        <a href="/deals" className="text-amazon-blue text-sm hover:text-amazon-orange hover:underline">
          See all deals
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {deals.map((product) => (
          <ProductCard key={product.id} {...product} title={product.title} />
        ))}
      </div>
    </section>
  );
};

export default DealsSection;
