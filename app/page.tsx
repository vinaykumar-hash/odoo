import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Users, Zap, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Enhanced Dark Purple Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/20 to-background"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>

      {/* Enhanced Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-secondary/15 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border backdrop-blur-xl glass-strong shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg"></div>
                <span className="text-xl font-bold text-foreground">Synergy</span>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How it works
                </Link>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-foreground hover:bg-muted glass-subtle">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">Sign up</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8">
              {/* Announcement Badge */}
              <Badge variant="secondary" className="glass-subtle text-primary border-primary/30 shadow-lg">
                <Zap className="w-3 h-3 mr-1" />
                New: AI agents for teams
              </Badge>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight text-foreground drop-shadow-lg">
                  Where work happens{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    together
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-2xl drop-shadow-sm">
                  Synergy is the modern collaboration platform that brings people, projects and AI agents into one
                  focused space.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Get started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-muted glass-subtle text-foreground shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                >
                  Talk to Sales
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="hover:bg-muted glass-subtle text-foreground shadow-lg transition-all duration-300"
                >
                  See how it works
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row gap-8 pt-8">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Teams</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                    4.9
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="flex-1 relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main Dashboard Mockup */}
                <div className="glass p-6 rounded-2xl shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      <div className="text-xs text-muted-foreground">Dashboard</div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                      <div className="h-2 bg-muted rounded-full w-3/4"></div>
                      <div className="h-2 bg-muted rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 glass p-3 rounded-xl shadow-xl">
                  <Users className="w-5 h-5 text-primary" />
                </div>

                <div className="absolute -bottom-4 -left-4 glass p-3 rounded-xl shadow-xl">
                  <div className="w-8 h-2 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                </div>

                {/* Support Badge */}
                <div className="absolute -top-8 right-8">
                  <Badge className="bg-green-600 text-white border-green-500 shadow-lg">✓ 24/7 Support</Badge>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
