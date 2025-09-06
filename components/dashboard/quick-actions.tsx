import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, MessageSquare, Calendar } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Create Project",
      description: "Start a new project and invite team members",
      icon: Plus,
      color: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    {
      title: "Invite Team",
      description: "Add new members to your workspace",
      icon: Users,
      color: "bg-accent text-accent-foreground hover:bg-accent/90",
    },
    {
      title: "Start Discussion",
      description: "Begin a new conversation with your team",
      icon: MessageSquare,
      color: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    },
    {
      title: "Schedule Meeting",
      description: "Plan your next team meeting",
      icon: Calendar,
      color: "bg-muted text-muted-foreground hover:bg-muted/90",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Get started with common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className={`h-auto min-h-[100px] p-4 flex flex-col items-center justify-center space-y-2 ${action.color}`}
            >
              <action.icon className="h-6 w-6 flex-shrink-0" />
              <div className="text-center w-full">
                <div className="font-medium text-sm truncate w-full">{action.title}</div>
                <div className="text-xs opacity-80 line-clamp-2 leading-tight mt-1">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
