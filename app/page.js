import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6 mx-auto">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Lumina AI Logo" width={80} height={80} />
            <h1 className="text-xl font-bold tracking-tight text-primary">Lumina AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-24 px-4 bg-gradient-to-b from-background via-secondary/5 to-background">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Build Smarter with <span className="text-primary">AI</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Unlock your learning potential. Our AI generates personalized courses just for you — fast, effective, and smart.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-in">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold px-8 hover:bg-primary/90 transition shadow-lg shadow-primary/20">
                Get Started
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-foreground border-input hover:bg-accent hover:text-accent-foreground transition">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Cards */}
      <section className="py-20 px-6 bg-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {["Web Development", "Data Science", "UI/UX Design"].map((category, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
              >
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{category}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Explore custom-built AI courses tailored to your skill level and goals in {category}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Middle Message */}
      <section className="py-24 text-center px-6 bg-background">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-foreground">AI is Your New Instructor</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our platform doesn't just suggest content—it understands your pace, preferences, and progress. Start your learning
            journey with technology that adapts to *you*.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-background">
        <div className="container mx-auto text-center px-6">
          <p className="font-semibold text-foreground">© 2025 Lumina AI. All rights reserved.</p>
          <p className="text-sm mt-2 text-muted-foreground">Empowering education with the power of artificial intelligence.</p>
        </div>
      </footer>
    </div>
  );
}
