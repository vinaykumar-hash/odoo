"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const taskStatusData = [
  { name: "Completed", value: 45, color: "hsl(var(--primary))" },
  { name: "In Progress", value: 30, color: "hsl(var(--accent))" },
  { name: "To Do", value: 20, color: "hsl(var(--muted))" },
  { name: "Overdue", value: 5, color: "hsl(var(--destructive))" },
]

const priorityData = [
  { priority: "High", count: 8, total: 25, color: "bg-destructive" },
  { priority: "Medium", count: 15, total: 25, color: "bg-accent" },
  { priority: "Low", count: 12, total: 25, color: "bg-muted" },
]

export function TaskAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Analytics</CardTitle>
        <CardDescription>Current task distribution and priority breakdown</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Task Status Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2">
            {taskStatusData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Priority Breakdown</h4>
          <div className="space-y-3">
            {priorityData.map((item) => (
              <div key={item.priority} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={item.color}>
                      {item.priority}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.count} of {item.total}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{Math.round((item.count / item.total) * 100)}%</span>
                </div>
                <Progress value={(item.count / item.total) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
