import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Users,
  Store,
  ChevronDown,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string | null;
  category_id: string | null;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  order_id: string;
  orders: {
    id: string;
    status: string;
    total: number;
    created_at: string;
  } | null;
}

const SellerDashboard = () => {
  const { user, profile, signOut, switchToCustomer, activeRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Product form state
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    if (!profile?.is_seller) {
      navigate("/seller/login");
      return;
    }
    fetchProducts();
    fetchOrders();
  }, [profile, navigate]);

  const fetchProducts = async () => {
    if (!profile) return;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", profile.id);

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    if (!profile) return;
    const { data, error } = await supabase
      .from("order_items")
      .select(`
        *,
        orders (
          id,
          status,
          total,
          created_at
        )
      `)
      .eq("seller_id", profile.id);

    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      setOrderItems(data || []);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const productData = {
      seller_id: profile.id,
      name: productName,
      price: parseFloat(productPrice),
      stock: parseInt(productStock),
      image_url: productImage || null,
      description: productDescription || null,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Product updated!" });
        setEditingProduct(null);
      }
    } else {
      const { error } = await supabase.from("products").insert(productData);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Product added!" });
      }
    }

    setShowAddProduct(false);
    resetForm();
    fetchProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Product deleted!" });
      fetchProducts();
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductPrice(product.price.toString());
    setProductStock(product.stock.toString());
    setProductImage(product.image_url || "");
    setShowAddProduct(true);
  };

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductStock("");
    setProductImage("");
    setProductDescription("");
    setEditingProduct(null);
  };

  const totalRevenue = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOrders = new Set(orderItems.map((item) => item.order_id)).size;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1">
              <span className="text-xl font-bold">amazon</span>
              <span className="text-amazon-blue text-sm">seller central</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={switchToCustomer}
              className="text-sm hover:text-amazon-orange transition-colors"
            >
              Switch to Customer
            </button>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm">
                {profile?.full_name || user?.email}
                <ChevronDown size={14} />
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button
                  onClick={signOut}
                  className="w-full px-4 py-2 text-left text-sm text-secondary hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="text-amazon-blue" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-secondary">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingCart className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-secondary">{totalOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Package className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Products</p>
                <p className="text-2xl font-bold text-secondary">{totalProducts}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingUp className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-secondary">{lowStockProducts}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-border">
          <div className="flex border-b border-border">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "products", label: "Products", icon: Package },
              { id: "orders", label: "Orders", icon: ShoppingCart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-amazon-blue text-amazon-blue"
                    : "border-transparent text-muted-foreground hover:text-secondary"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-lg font-bold text-secondary mb-4">Performance Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-secondary mb-3">Recent Orders</h3>
                    {orderItems.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No orders yet</p>
                    ) : (
                      <ul className="space-y-2">
                        {orderItems.slice(0, 5).map((item) => (
                          <li key={item.id} className="flex justify-between text-sm">
                            <span className="text-secondary">Order #{item.order_id.slice(0, 8)}</span>
                            <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-secondary mb-3">Top Products</h3>
                    {products.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No products yet</p>
                    ) : (
                      <ul className="space-y-2">
                        {products.slice(0, 5).map((product) => (
                          <li key={product.id} className="flex justify-between text-sm">
                            <span className="text-secondary truncate">{product.name}</span>
                            <span className="text-muted-foreground">${product.price.toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-secondary">Your Products</h2>
                  <button
                    onClick={() => {
                      resetForm();
                      setShowAddProduct(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-amazon-blue text-white rounded hover:bg-opacity-90 transition-colors"
                  >
                    <Plus size={18} />
                    Add Product
                  </button>
                </div>

                {showAddProduct && (
                  <div className="mb-6 p-4 border border-border rounded-lg bg-gray-50">
                    <h3 className="font-medium text-secondary mb-4">
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </h3>
                    <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Name</label>
                        <input
                          type="text"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-blue outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-blue outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Stock</label>
                        <input
                          type="number"
                          value={productStock}
                          onChange={(e) => setProductStock(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-blue outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Image URL</label>
                        <input
                          type="url"
                          value={productImage}
                          onChange={(e) => setProductImage(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-blue outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-secondary mb-1">Description</label>
                        <textarea
                          value={productDescription}
                          onChange={(e) => setProductDescription(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-blue outline-none"
                          rows={3}
                        />
                      </div>
                      <div className="md:col-span-2 flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-amazon-blue text-white rounded hover:bg-opacity-90 transition-colors"
                        >
                          {editingProduct ? "Update Product" : "Add Product"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddProduct(false);
                            resetForm();
                          }}
                          className="px-4 py-2 border border-border rounded hover:bg-gray-100 transition-colors text-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {products.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No products yet. Add your first product to start selling!
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Image</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Stock</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b border-border hover:bg-gray-50">
                            <td className="py-3 px-4">
                              {product.image_url ? (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                  <Package size={20} className="text-gray-400" />
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4 text-sm text-secondary">{product.name}</td>
                            <td className="py-3 px-4 text-sm text-secondary">${product.price.toFixed(2)}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-sm px-2 py-1 rounded ${
                                  product.stock < 10
                                    ? "bg-red-100 text-red-600"
                                    : "bg-green-100 text-green-600"
                                }`}
                              >
                                {product.stock}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => startEdit(product)}
                                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                                >
                                  <Edit size={16} className="text-amazon-blue" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                                >
                                  <Trash2 size={16} className="text-red-500" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-lg font-bold text-secondary mb-4">Your Orders</h2>
                {orderItems.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No orders yet. Orders will appear here when customers purchase your products.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Quantity</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems.map((item) => (
                          <tr key={item.id} className="border-b border-border hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-secondary">
                              #{item.order_id.slice(0, 8)}
                            </td>
                            <td className="py-3 px-4 text-sm text-secondary">{item.quantity}</td>
                            <td className="py-3 px-4 text-sm text-secondary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                                {item.orders?.status || "pending"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {item.orders?.created_at
                                ? new Date(item.orders.created_at).toLocaleDateString()
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
