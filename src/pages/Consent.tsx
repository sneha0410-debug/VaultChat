import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const Consent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [allowDataCollection, setAllowDataCollection] = useState(true);
  const [allowAiTraining, setAllowAiTraining] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    loadConsentSettings();
  }, [user]);

  const loadConsentSettings = async () => {
    const { data, error } = await supabase
      .from("consent_settings")
      .select("*")
      .eq("user_id", user!.id)
      .single();

    if (error) {
      console.error("Error loading consent settings:", error);
      setLoading(false);
      return;
    }

    if (data) {
      setAllowDataCollection(data.allow_data_collection);
      setAllowAiTraining(data.allow_ai_training);
      setAllowAnalytics(data.allow_analytics);
    }
    setLoading(false);
  };

  const saveSettings = async () => {
    const { error } = await supabase
      .from("consent_settings")
      .update({
        allow_data_collection: allowDataCollection,
        allow_ai_training: allowAiTraining,
        allow_analytics: allowAnalytics,
      })
      .eq("user_id", user!.id);

    if (error) {
      toast.error("Failed to save settings");
      return;
    }

    toast.success("Consent settings updated");
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
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Consent Management</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Consent Settings</CardTitle>
            <CardDescription>
              Control how your data is collected and used. You have full control over your privacy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card">
                <div className="flex-1">
                  <Label htmlFor="data-collection" className="text-base font-semibold">
                    Data Collection
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Allow collection of your chat messages for service improvement and personalization
                  </p>
                </div>
                <Switch
                  id="data-collection"
                  checked={allowDataCollection}
                  onCheckedChange={setAllowDataCollection}
                />
              </div>

              <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card">
                <div className="flex-1">
                  <Label htmlFor="ai-training" className="text-base font-semibold">
                    AI Training
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Allow your conversations to be used for improving AI models (anonymized)
                  </p>
                </div>
                <Switch
                  id="ai-training"
                  checked={allowAiTraining}
                  onCheckedChange={setAllowAiTraining}
                />
              </div>

              <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card">
                <div className="flex-1">
                  <Label htmlFor="analytics" className="text-base font-semibold">
                    Usage Analytics
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track your usage patterns to provide insights and improve your experience
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={allowAnalytics}
                  onCheckedChange={setAllowAnalytics}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button onClick={saveSettings} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Your Privacy Matters:</strong> We believe in transparency and user control.
                These settings can be changed at any time, and you can request data deletion from your settings page.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Consent;
