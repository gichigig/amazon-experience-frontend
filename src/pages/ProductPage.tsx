import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Star, StarHalf, ChevronRight, Check, Truck } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  images: string[] | null;
  rating: number | null;
  review_count: number | null;
  is_prime: boolean | null;
  stock: number | null;
  seller_id: string;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching product:", error);
      } else if (data) {
        setProduct(data);

        // Fetch category if exists
        if (data.category_id) {
          const { data: catData } = await supabase
            .from("categories")
            .select("*")
            .eq("id", data.category_id)
            .maybeSingle();
          
          setCategory(catData);
        }
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image_url: product.image_url,
        seller_id: product.seller_id,
      });
    }

    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={18} className="fill-current" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={18} className="fill-current" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/" className="text-amazon-blue hover:text-amazon-orange hover:underline">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discountPercentage = product.original_price
    ? Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-amazon-orange">Home</Link>
          {category && (
            <>
              <ChevronRight size={14} />
              <Link to={`/category/${category.slug}`} className="hover:text-amazon-orange">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight size={14} />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 sticky top-24">
              <img
                src={product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"}
                alt={product.name}
                className="w-full aspect-square object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <h1 className="text-xl md:text-2xl font-medium text-foreground mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex star-rating">{renderStars(Number(product.rating) || 4.5)}</div>
              <span className="text-sm text-amazon-blue hover:text-amazon-orange cursor-pointer">
                {product.review_count?.toLocaleString() || 0} ratings
              </span>
            </div>

            <hr className="my-3" />

            {/* Price */}
            <div className="mb-4">
              {discountPercentage > 0 && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-amazon-deal text-lg font-medium">-{discountPercentage}%</span>
                  <span className="text-sm text-muted-foreground">Limited time deal</span>
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-medium text-foreground">
                  ${Number(product.price).toFixed(2)}
                </span>
                {product.original_price && (
                  <span className="text-sm text-muted-foreground">
                    List: <span className="line-through">${Number(product.original_price).toFixed(2)}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Prime */}
            {product.is_prime && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-amazon-blue font-bold">prime</span>
                <span className="text-sm text-muted-foreground">FREE delivery</span>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="mb-4">
                <h3 className="font-bold text-foreground mb-2">About this item</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}
          </div>

          {/* Buy Box */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
              <p className="text-3xl font-medium text-card-foreground mb-2">
                ${Number(product.price).toFixed(2)}
              </p>

              {product.is_prime && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Truck size={16} />
                  <span>FREE delivery</span>
                </div>
              )}

              {/* Stock */}
              <p className={`text-lg font-medium mb-3 ${(product.stock ?? 0) > 0 ? 'text-green-600' : 'text-amazon-deal'}`}>
                {(product.stock ?? 0) > 0 ? 'In Stock' : 'Out of Stock'}
              </p>

              {/* Quantity */}
              {(product.stock ?? 0) > 0 && (
                <div className="mb-4">
                  <label className="text-sm text-card-foreground">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="ml-2 px-3 py-1 border border-border rounded bg-background text-foreground"
                  >
                    {[...Array(Math.min(product.stock ?? 10, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={(product.stock ?? 0) === 0}
                className="amazon-button w-full py-2 mb-2 disabled:opacity-50"
              >
                Add to Cart
              </button>

              <button className="amazon-button-orange w-full py-2">
                Buy Now
              </button>

              {/* Secure transaction */}
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Check size={14} />
                <span>Secure transaction</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
