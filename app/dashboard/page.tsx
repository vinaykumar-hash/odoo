"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectGrid } from "@/components/dashboard/project-grid"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { ProductivityChart } from "@/components/dashboard/productivity-chart"
import { TaskAnalytics } from "@/components/dashboard/task-analytics"
import { TeamPerformance } from "@/components/dashboard/team-performance"

interface User {
  email: string
  name: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
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

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-8">
          <DashboardStats />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-6">
              <QuickActions />
              <ProjectGrid />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProductivityChart />
                <TaskAnalytics />
              </div>
            </div>

            <div className="xl:col-span-1 space-y-6">
              <RecentActivity />
              <TeamPerformance />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
