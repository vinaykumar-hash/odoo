"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Clock } from "lucide-react"

const teamPerformanceData = [
  {
    name: "Archie",
    tasksCompleted: 23,
    completionRate: 92,
    avgTime: "2.1d",
    status: "excellent",
  },
  {
    name: "Salvi",
    tasksCompleted: 19,
    completionRate: 86,
    avgTime: "2.8d",
    status: "good",
  },
  {
    name: "Vinay",
    tasksCompleted: 17,
    completionRate: 81,
    avgTime: "3.2d",
    status: "good",
  },
  {
    name: "Arya",
    tasksCompleted: 15,
    completionRate: 88,
    avgTime: "2.5d",
    status: "good",
  },
  {
    name: "Salvi",
    tasksCompleted: 21,
    completionRate: 95,
    avgTime: "1.9d",
    status: "excellent",
  },
]

export function TeamPerformance() {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-accent text-accent-foreground"
      case "good":
        return "bg-primary text-primary-foreground"
      case "needs-improvement":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const topPerformer = teamPerformanceData.reduce((prev, current) =>
    prev.completionRate > current.completionRate ? prev : current,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-accent" />
          <span>Team Performance</span>
        </CardTitle>
        <CardDescription>Individual performance metrics this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center space-x-3">
            <Trophy className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium">Top Performer</p>
              <p className="text-xs text-muted-foreground">
                {topPerformer.name} - {topPerformer.completionRate}% completion rate
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {teamPerformanceData.map((member) => (
            <div key={member.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Target className="h-3 w-3" />
                        <span>{member.tasksCompleted} tasks</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{member.avgTime} avg</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className={getStatusColor(member.status)}>
                  {member.completionRate}%
                </Badge>
              </div>
              <Progress value={member.completionRate} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
