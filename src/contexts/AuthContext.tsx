import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "customer" | "seller";
  is_seller: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  upgradeToSeller: () => Promise<{ error: Error | null }>;
  switchToSeller: () => void;
  switchToCustomer: () => void;
  activeRole: "customer" | "seller";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<"customer" | "seller">(() => {
    const stored = localStorage.getItem("activeRole");
    return (stored === "seller" ? "seller" : "customer");
  });

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
    return data as Profile | null;
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setTimeout(async () => {
            const profile = await fetchProfile(session.user.id);
            setProfile(profile);
            if (profile?.is_seller) {
              const stored = localStorage.getItem("activeRole");
              if (stored === "seller") {
                setActiveRole("seller");
              }
            } else {
              setActiveRole("customer");
              localStorage.setItem("activeRole", "customer");
            }
            setLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setActiveRole("customer");
          localStorage.setItem("activeRole", "customer");
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchProfile(session.user.id).then((profile) => {
          setProfile(profile);
          if (profile?.is_seller) {
            const stored = localStorage.getItem("activeRole");
            if (stored === "seller") {
              setActiveRole("seller");
            }
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setActiveRole("customer");
    localStorage.setItem("activeRole", "customer");
  };

  const upgradeToSeller = async () => {
    if (!profile) {
      return { error: new Error("No profile found") };
    }

    const { error } = await supabase
      .from("profiles")
      .update({ 
        is_seller: true, 
        role: "seller",
        seller_approved_at: new Date().toISOString() 
      })
      .eq("id", profile.id);

    if (!error) {
      setProfile({ ...profile, is_seller: true, role: "seller" });
      setActiveRole("seller");
      localStorage.setItem("activeRole", "seller");
    }

    return { error: error as Error | null };
  };

  const switchToSeller = () => {
    if (profile?.is_seller) {
      setActiveRole("seller");
      localStorage.setItem("activeRole", "seller");
    }
  };

  const switchToCustomer = () => {
    setActiveRole("customer");
    localStorage.setItem("activeRole", "customer");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        upgradeToSeller,
        switchToSeller,
        switchToCustomer,
        activeRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
