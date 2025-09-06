"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { ProjectAnalytics } from "@/components/analytics/project-analytics"
import { TeamInsights } from "@/components/analytics/team-insights"
import { TimeTracking } from "@/components/analytics/time-tracking"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface User {
  email: string
  name: string
}

export default function AnalyticsPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Analytics & Insights</h1>
          <p className="text-muted-foreground">Comprehensive performance metrics and team insights</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="time">Time Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AnalyticsOverview />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectAnalytics />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <TeamInsights />
          </TabsContent>

          <TabsContent value="time" className="space-y-6">
            <TimeTracking />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
