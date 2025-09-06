"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const productivityData = [
  { name: "Mon", tasks: 12, completed: 10 },
  { name: "Tue", tasks: 15, completed: 13 },
  { name: "Wed", tasks: 18, completed: 16 },
  { name: "Thu", tasks: 14, completed: 12 },
  { name: "Fri", tasks: 16, completed: 15 },
  { name: "Sat", tasks: 8, completed: 7 },
  { name: "Sun", tasks: 5, completed: 5 },
]

export function ProductivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Productivity</CardTitle>
        <CardDescription>Task creation vs completion over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productivityData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-muted-foreground" />
            <YAxis className="text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              name="Tasks Created"
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--accent))" }}
              name="Tasks Completed"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
