"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Play, Pause, Square, Calendar } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const weeklyData = [
  { day: "Mon", hours: 8.5, target: 8 },
  { day: "Tue", hours: 7.2, target: 8 },
  { day: "Wed", hours: 9.1, target: 8 },
  { day: "Thu", hours: 8.8, target: 8 },
  { day: "Fri", hours: 6.5, target: 8 },
  { day: "Sat", hours: 2.0, target: 0 },
  { day: "Sun", hours: 0.5, target: 0 },
]

const projectBreakdown = [
  { project: "Project Alpha", hours: 18.5, percentage: 45 },
  { project: "Project Beta", hours: 12.3, percentage: 30 },
  { project: "Project Gamma", hours: 8.2, percentage: 20 },
  { project: "Admin Tasks", hours: 2.6, percentage: 5 },
]

export function TimeTracking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Time Tracking
        </CardTitle>
        <CardDescription>Monitor time allocation and productivity patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Timer */}
        <div className="p-4 rounded-lg border bg-muted/50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold">Current Session</div>
              <div className="text-sm text-muted-foreground">Working on: UI Component Library</div>
            </div>
            <Badge variant="secondary">In Progress</Badge>
          </div>
          <div className="text-3xl font-mono font-bold text-center mb-4">02:34:18</div>
          <div className="flex justify-center gap-2">
            <Button size="sm" variant="outline">
              <Pause className="h-4 w-4 mr-1" />
              Pause
            </Button>
            <Button size="sm" variant="outline">
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">This Week</h4>
            <div className="text-sm text-muted-foreground">42.6 / 40 hours</div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="hsl(var(--primary))" />
                <Bar dataKey="target" fill="hsl(var(--muted))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Breakdown */}
        <div className="space-y-4">
          <h4 className="font-semibold">Project Time Allocation</h4>
          <div className="space-y-3">
            {projectBreakdown.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{project.project}</span>
                  <span className="text-muted-foreground">
                    {project.hours}h ({project.percentage}%)
                  </span>
                </div>
                <Progress value={project.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg border">
            <div className="text-lg font-bold text-green-600">8.5h</div>
            <div className="text-sm text-muted-foreground">Daily Average</div>
          </div>
          <div className="text-center p-3 rounded-lg border">
            <div className="text-lg font-bold text-blue-600">94%</div>
            <div className="text-sm text-muted-foreground">Productivity Score</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <Play className="h-4 w-4 mr-1" />
            Start Timer
          </Button>
          <Button size="sm" variant="outline">
            <Calendar className="h-4 w-4 mr-1" />
            View Reports
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
