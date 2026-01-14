import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-white">
        <div className="relative">
          <ShoppingCart size={28} />
          <span className="absolute -top-1 right-0 bg-amazon-orange text-secondary text-xs font-bold rounded-full px-1.5 min-w-[20px] text-center">
            {totalItems}
          </span>
        </div>
        <span className="hidden sm:block font-bold text-sm ml-1">Cart</span>
      </div>

      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full right-0 mt-1 w-[360px] bg-white border border-gray-200 rounded-md shadow-xl z-50 transition-all duration-200 ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {items.length === 0 ? (
          <div className="p-6 text-center">
            <div className="mb-4">
              <ShoppingCart size={48} className="mx-auto text-gray-400 mb-3" />
              <h3 className="font-bold text-gray-900 text-lg">Your Cart is empty</h3>
            </div>
            
            <div className="space-y-2 mb-4">
              <Link 
                to="/deals" 
                onClick={() => setIsOpen(false)}
                className="text-blue-600 text-sm hover:text-orange-500 hover:underline block"
              >
                Shop today's deals
              </Link>
            </div>

            {!user && (
              <div className="flex gap-2">
                <Link 
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 amazon-button text-sm text-center"
                >
                  Sign in to your account
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">Shopping Cart ({totalItems} items)</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex gap-3">
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-gray-900 font-medium line-clamp-2">{item.name}</h4>
                    <p className="text-sm font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900">Subtotal:</span>
                <span className="font-bold text-lg text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                className="amazon-button w-full py-2"
                onClick={() => setIsOpen(false)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
