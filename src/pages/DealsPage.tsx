import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  rating: number | null;
  review_count: number | null;
  is_prime: boolean | null;
  is_deal: boolean | null;
}

const DealsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_deal", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching deals:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Today's Deals
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading deals...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No deals available right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.name}
                image={product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"}
                price={Number(product.price)}
                originalPrice={product.original_price ? Number(product.original_price) : undefined}
                rating={Number(product.rating) || 4.5}
                reviewCount={product.review_count || 0}
                isPrime={product.is_prime || false}
                dealBadge="Deal"
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DealsPage;
