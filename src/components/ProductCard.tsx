import { Star, StarHalf, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: number | string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isPrime?: boolean;
  dealBadge?: string;
  sellerId?: string;
}

const ProductCard = ({
  id,
  title,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  isPrime = false,
  dealBadge,
  sellerId = ""
}: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} className="fill-current" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={14} className="fill-current" />);
    }
    return stars;
  };

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: String(id),
      name: title,
      price: price,
      image_url: image,
      seller_id: sellerId
    });

    toast({
      title: "Added to cart",
      description: `${title.substring(0, 30)}... added to your cart`,
    });
  };

  return (
    <div className="product-card group block relative">
      <Link to={`/product/${id}`}>
        {dealBadge && (
          <span className="deal-badge mb-2 inline-block">{dealBadge}</span>
        )}
        <div className="relative aspect-square mb-3 overflow-hidden rounded">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-sm text-card-foreground line-clamp-2 mb-1 group-hover:text-amazon-orange transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1 mb-1">
          <div className="flex star-rating">{renderStars(rating)}</div>
          <span className="text-xs text-amazon-blue hover:text-amazon-orange cursor-pointer">
            {reviewCount.toLocaleString()}
          </span>
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          {discountPercentage > 0 && (
            <span className="text-amazon-deal text-sm font-medium">-{discountPercentage}%</span>
          )}
          <span className="text-xl font-medium text-card-foreground">
            <sup className="text-xs">$</sup>
            {Math.floor(price)}
            <sup className="text-xs">{((price % 1) * 100).toFixed(0).padStart(2, '0')}</sup>
          </span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        {isPrime && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-amazon-blue font-bold text-xs">prime</span>
            <span className="text-xs text-muted-foreground">FREE Delivery</span>
          </div>
        )}
      </Link>
      
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-2 w-full flex items-center justify-center gap-2 amazon-button py-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ShoppingCart size={16} />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
