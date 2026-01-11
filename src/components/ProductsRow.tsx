import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isPrime?: boolean;
}

interface ProductsRowProps {
  title: string;
  products: Product[];
}

const ProductsRow = ({ title, products }: ProductsRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-4 bg-card rounded mb-4">
      <div className="px-5">
        <h2 className="text-xl font-bold text-card-foreground mb-4">{title}</h2>
      </div>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg p-2 rounded-r opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-5 pb-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[180px] max-w-[180px]">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg p-2 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={24} className="text-foreground" />
        </button>
      </div>
    </section>
  );
};

export default ProductsRow;
