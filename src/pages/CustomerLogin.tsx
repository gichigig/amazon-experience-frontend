import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const CustomerLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        navigate("/");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        navigate("/");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-8">
      {/* Logo */}
      <Link to="/" className="mb-6">
        <span className="text-3xl font-bold text-foreground">
          amazon<span className="text-amazon-orange">.com</span>
        </span>
      </Link>

      {/* Form Card */}
      <div className="w-full max-w-[350px] bg-card border border-border rounded-lg p-6">
        <h1 className="text-2xl font-normal text-card-foreground mb-4">
          {isSignUp ? "Create account" : "Sign in"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-bold text-card-foreground mb-1">
                Your name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange outline-none text-foreground bg-background"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-card-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange outline-none text-foreground bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-card-foreground mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange outline-none text-foreground bg-background"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="amazon-button w-full py-2 font-medium disabled:opacity-50"
          >
            {loading ? "Please wait..." : isSignUp ? "Create your Amazon account" : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-xs text-muted-foreground">
          By continuing, you agree to Amazon's{" "}
          <a href="#" className="text-amazon-blue hover:text-amazon-orange hover:underline">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-amazon-blue hover:text-amazon-orange hover:underline">
            Privacy Notice
          </a>.
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          {!isSignUp ? (
            <button
              onClick={() => setIsSignUp(true)}
              className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
            >
              New to Amazon? Create your Amazon account
            </button>
          ) : (
            <button
              onClick={() => setIsSignUp(false)}
              className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
            >
              Already have an account? Sign in
            </button>
          )}
        </div>
      </div>

      {/* Seller Account Link */}
      <div className="mt-6 w-full max-w-[350px]">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">
              Want to sell on Amazon?
            </span>
          </div>
        </div>
        <Link
          to="/seller/login"
          className="mt-4 block w-full text-center border border-border rounded-lg py-2 text-sm text-card-foreground hover:bg-muted transition-colors"
        >
          Create a seller account
        </Link>
      </div>
    </div>
  );
};

export default CustomerLogin;
