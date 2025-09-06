"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, CheckSquare, FolderOpen, MessageSquare, Clock, Target } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2",
      changeType: "increase" as const,
      icon: FolderOpen,
      description: "2 new this month",
    },
    {
      title: "Tasks Completed",
      value: "89",
      change: "+15%",
      changeType: "increase" as const,
      icon: CheckSquare,
      description: "vs last month",
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3",
      changeType: "increase" as const,
      icon: Users,
      description: "3 joined recently",
    },
    {
      title: "Discussions",
      value: "156",
      change: "+8%",
      changeType: "increase" as const,
      icon: MessageSquare,
      description: "Active conversations",
    },
    {
      title: "Avg. Completion Time",
      value: "3.2d",
      change: "-0.5d",
      changeType: "decrease" as const,
      icon: Clock,
      description: "Faster delivery",
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+2%",
      changeType: "increase" as const,
      icon: Target,
      description: "On-time delivery",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground truncate pr-2">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between space-x-2">
              <div className="text-2xl font-bold truncate">{stat.value}</div>
              <Badge
                variant="secondary"
                className={`flex-shrink-0 ${
                  stat.changeType === "increase"
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {stat.changeType === "increase" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span className="text-xs">{stat.change}</span>
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
