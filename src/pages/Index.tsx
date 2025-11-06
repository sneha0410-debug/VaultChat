import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Zap, Eye, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">VaultChat</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/auth")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Privacy-First AI Platform
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Your Data. Your Control.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the power of AI without compromising your privacy. 
              VaultChat puts you in control of your data with transparent consent management.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" onClick={() => navigate("/auth")}>
                Start Chatting
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why VaultChat?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-card border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy-First Design</h3>
                <p className="text-muted-foreground">
                  Built from the ground up with privacy as the core principle. Your conversations stay yours.
                </p>
              </div>

              <div className="p-6 bg-card border rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Consent Management</h3>
                <p className="text-muted-foreground">
                  Full transparency and control over how your data is collected and used.
                </p>
              </div>

              <div className="p-6 bg-card border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Powered by AI</h3>
                <p className="text-muted-foreground">
                  Advanced AI capabilities with state-of-the-art language models for intelligent conversations.
                </p>
              </div>

              <div className="p-6 bg-card border rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Usage Analytics</h3>
                <p className="text-muted-foreground">
                  Track your AI usage with transparent metrics - only with your permission.
                </p>
              </div>

              <div className="p-6 bg-card border rounded-lg md:col-span-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Encrypted</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security with end-to-end encryption. Your data is protected at rest and in transit.
                  Delete your data anytime with one click.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto bg-primary/10 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to experience privacy-first AI?</h2>
            <p className="text-muted-foreground mb-8">
              Join VaultChat today and take control of your AI interactions
            </p>
            <Button size="lg" onClick={() => navigate("/auth")}>
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 VaultChat. Privacy-first AI assistant platform.</p>
          <p className="mt-2">Built with transparency, security, and user control in mind.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
