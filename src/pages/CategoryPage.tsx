import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
}

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

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch category
      const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (categoryData) {
        setCategory(categoryData);

        // Fetch sub-categories
        const { data: subCats } = await supabase
          .from("categories")
          .select("*")
          .eq("parent_id", categoryData.id);
        
        setSubCategories(subCats || []);

        // Fetch products in this category and sub-categories
        const categoryIds = [categoryData.id, ...(subCats?.map(c => c.id) || [])];
        const { data: productsData } = await supabase
          .from("products")
          .select("*")
          .in("category_id", categoryIds)
          .order("created_at", { ascending: false });

        setProducts(productsData || []);
      }
      
      setLoading(false);
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-amazon-orange">Home</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">{category?.name || slug}</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          {category?.name || slug}
        </h1>

        {/* Sub-categories */}
        {subCategories.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-foreground mb-3">Shop by Category</h2>
            <div className="flex flex-wrap gap-2">
              {subCategories.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/category/${sub.slug}`}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm text-card-foreground hover:border-amazon-orange transition-colors"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
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
                dealBadge={product.is_deal ? "Deal" : undefined}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
