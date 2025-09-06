"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Users, CheckSquare, Clock, Target, AlertTriangle } from "lucide-react"

const monthlyData = [
  { month: "Jan", projects: 8, tasks: 124, completed: 118 },
  { month: "Feb", projects: 10, tasks: 156, completed: 142 },
  { month: "Mar", projects: 12, tasks: 189, completed: 175 },
  { month: "Apr", projects: 11, tasks: 167, completed: 159 },
  { month: "May", projects: 13, tasks: 203, completed: 195 },
  { month: "Jun", projects: 15, tasks: 234, completed: 221 },
]

const weeklyTrend = [
  { day: "Mon", productivity: 85 },
  { day: "Tue", productivity: 92 },
  { day: "Wed", productivity: 78 },
  { day: "Thu", productivity: 88 },
  { day: "Fri", productivity: 95 },
  { day: "Sat", productivity: 45 },
  { day: "Sun", productivity: 32 },
]

export function AnalyticsOverview() {
  const kpis = [
    {
      title: "Overall Productivity",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      description: "vs last month",
    },
    {
      title: "Active Team Members",
      value: "24",
      change: "+3",
      trend: "up",
      icon: Users,
      description: "3 new members",
    },
    {
      title: "Tasks This Month",
      value: "234",
      change: "+12%",
      trend: "up",
      icon: CheckSquare,
      description: "vs last month",
    },
    {
      title: "Avg. Response Time",
      value: "2.3h",
      change: "-0.5h",
      trend: "down",
      icon: Clock,
      description: "Faster responses",
    },
    {
      title: "Project Success Rate",
      value: "94%",
      change: "+2%",
      trend: "up",
      icon: Target,
      description: "On-time delivery",
    },
    {
      title: "Issues Resolved",
      value: "18",
      change: "+6",
      trend: "up",
      icon: AlertTriangle,
      description: "This week",
    },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <Badge
                    variant="secondary"
                    className={
                      kpi.trend === "up" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                    }
                  >
                    {kpi.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
            <CardDescription>Projects and task completion over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="tasks" fill="hsl(var(--primary))" name="Total Tasks" />
                <Bar dataKey="completed" fill="hsl(var(--accent))" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Productivity Trend</CardTitle>
            <CardDescription>Team productivity percentage by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="productivity"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Progress Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Goals Progress</CardTitle>
            <CardDescription>Current month objectives and completion status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Complete 15 Projects</span>
                <span className="font-medium">12/15</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Resolve 200 Tasks</span>
                <span className="font-medium">234/200</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Team Satisfaction 90%</span>
                <span className="font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>On-time Delivery 95%</span>
                <span className="font-medium">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Important trends and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Productivity Increase</p>
                  <p className="text-xs text-muted-foreground">
                    Team productivity has increased by 15% this month compared to last month.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-2">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Goal Achievement</p>
                  <p className="text-xs text-muted-foreground">
                    You're on track to exceed your monthly task completion goal by 17%.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg border border-muted">
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Response Time</p>
                  <p className="text-xs text-muted-foreground">
                    Average response time has improved by 30 minutes this week.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
