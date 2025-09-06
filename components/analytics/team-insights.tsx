"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  tasksCompleted: number
  hoursWorked: number
  efficiency: number
}

const mockTeamData: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Frontend Developer",
    tasksCompleted: 24,
    hoursWorked: 38,
    efficiency: 92,
  },
  {
    id: "2",
    name: "Mike Chen",
    role: "Backend Developer",
    tasksCompleted: 18,
    hoursWorked: 35,
    efficiency: 88,
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "UI/UX Designer",
    tasksCompleted: 15,
    hoursWorked: 32,
    efficiency: 85,
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    role: "Project Manager",
    tasksCompleted: 12,
    hoursWorked: 40,
    efficiency: 78,
  },
]

export function TeamInsights() {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600"
    if (efficiency >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Insights
        </CardTitle>
        <CardDescription>Individual performance metrics and team collaboration insights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">4</div>
            <div className="text-sm text-muted-foreground">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">69</div>
            <div className="text-sm text-muted-foreground">Tasks Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">145h</div>
            <div className="text-sm text-muted-foreground">Total Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">86%</div>
            <div className="text-sm text-muted-foreground">Avg Efficiency</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Team Performance</h4>
          {mockTeamData.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium">{member.tasksCompleted}</div>
                  <div className="text-muted-foreground">Tasks</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{member.hoursWorked}h</div>
                  <div className="text-muted-foreground">Hours</div>
                </div>
                <div className="text-center">
                  <div className={`font-medium ${getEfficiencyColor(member.efficiency)}`}>{member.efficiency}%</div>
                  <div className="text-muted-foreground">Efficiency</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Team Collaboration Score</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Communication</span>
              <span>92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Task Coordination</span>
              <span>88%</span>
            </div>
            <Progress value={88} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Knowledge Sharing</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
