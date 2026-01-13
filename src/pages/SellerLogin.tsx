import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const SellerLogin = () => {
  const [mode, setMode] = useState<"login" | "signup" | "upgrade">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, upgradeToSeller, user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup") {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // After signup, upgrade to seller
        setTimeout(async () => {
          const { error: upgradeError } = await upgradeToSeller();
          if (upgradeError) {
            toast({
              title: "Error",
              description: upgradeError.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Success",
              description: "Seller account created successfully!",
            });
            navigate("/seller/dashboard");
          }
          setLoading(false);
        }, 1000);
        return;
      }
    } else if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Signed in successfully!",
        });
        navigate("/seller/dashboard");
      }
    }
    setLoading(false);
  };

  const handleUpgrade = async () => {
    setLoading(true);
    const { error } = await upgradeToSeller();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "You are now a seller!",
      });
      navigate("/seller/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8">
      {/* Logo */}
      <Link to="/" className="mb-6">
        <span className="text-3xl font-bold text-secondary">
          amazon<span className="text-amazon-blue">.com</span>
        </span>
      </Link>

      {/* Form Card */}
      <div className="w-full max-w-[400px] bg-white border border-border rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-normal text-secondary mb-2">
          {mode === "signup" ? "Create Seller Account" : mode === "upgrade" ? "Upgrade to Seller" : "Seller Central"}
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          Start selling on Amazon today
        </p>

        {/* Show upgrade option if user is logged in but not a seller */}
        {user && profile && !profile.is_seller && mode !== "signup" ? (
          <div className="space-y-4">
            <p className="text-sm text-secondary">
              Logged in as: <strong>{user.email}</strong>
            </p>
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full py-3 bg-amazon-blue text-white font-medium rounded hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {loading ? "Please wait..." : "Upgrade to Seller Account"}
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <button
              onClick={() => setMode("signup")}
              className="w-full py-2 border border-border rounded text-sm text-secondary hover:bg-gray-50 transition-colors"
            >
              Create a new seller account with different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-bold text-secondary mb-1">
                  Business/Seller name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-blue focus:border-amazon-blue outline-none text-secondary"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-secondary mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-blue focus:border-amazon-blue outline-none text-secondary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-secondary mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-blue focus:border-amazon-blue outline-none text-secondary"
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amazon-blue text-white font-medium rounded hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : mode === "signup"
                ? "Create your seller account"
                : "Sign in"}
            </button>
          </form>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          {mode === "login" ? (
            <button
              onClick={() => setMode("signup")}
              className="text-sm text-amazon-blue hover:underline"
            >
              New seller? Register now
            </button>
          ) : (
            <button
              onClick={() => setMode("login")}
              className="text-sm text-amazon-blue hover:underline"
            >
              Already have a seller account? Sign in
            </button>
          )}
        </div>
      </div>

      {/* Customer Account Link */}
      <div className="mt-6 w-full max-w-[400px]">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-muted-foreground">
              Looking to shop?
            </span>
          </div>
        </div>
        <Link
          to="/login"
          className="mt-4 block w-full text-center border border-border rounded-lg py-2 text-sm text-secondary hover:bg-gray-50 transition-colors"
        >
          Go to customer sign in
        </Link>
      </div>
    </div>
  );
};

export default SellerLogin;
