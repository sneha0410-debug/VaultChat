import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings, BarChart3, Shield, LogOut } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">VaultChat</h1>
          </div>
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
            <p className="text-muted-foreground">Choose where you'd like to go</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/chat")}
              className="group p-6 bg-card hover:bg-accent/10 border rounded-lg transition-all duration-200 text-left hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI Chat</h3>
              <p className="text-sm text-muted-foreground">
                Start a conversation with your privacy-first AI assistant
              </p>
            </button>

            <button
              onClick={() => navigate("/consent")}
              className="group p-6 bg-card hover:bg-accent/10 border rounded-lg transition-all duration-200 text-left hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Consent Management</h3>
              <p className="text-sm text-muted-foreground">
                Control what data is collected and how it's used
              </p>
            </button>

            <button
              onClick={() => navigate("/analytics")}
              className="group p-6 bg-card hover:bg-accent/10 border rounded-lg transition-all duration-200 text-left hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Usage Analytics</h3>
              <p className="text-sm text-muted-foreground">
                View your AI usage metrics and insights
              </p>
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="group p-6 bg-card hover:bg-accent/10 border rounded-lg transition-all duration-200 text-left hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4 group-hover:bg-muted/80 transition-colors">
                <Settings className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Settings</h3>
              <p className="text-sm text-muted-foreground">
                Manage your account and privacy settings
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
