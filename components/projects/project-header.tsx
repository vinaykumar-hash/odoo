"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, MoreHorizontal, Settings, Users, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { InviteMemberDialog } from "./invite-member-dialog"

interface Project {
  id: number
  name: string
  description: string
  progress: number
  status: string
  dueDate: string
  teamMembers: Array<{ name: string; email: string; role: string }>
}

interface ProjectHeaderProps {
  project: Project
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-accent text-accent-foreground"
      case "completed":
        return "bg-primary text-primary-foreground"
      case "on-hold":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/projects")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <Badge className={getStatusColor(project.status)} variant="secondary">
                {project.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Project Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsInviteDialogOpen(true)}>
                <Users className="mr-2 h-4 w-4" />
                Invite Members
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3" />
          </div>

          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Team Members</span>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {project.teamMembers.slice(0, 5).map((member, index) => (
                  <Avatar key={index} className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                ))}
                {project.teamMembers.length > 5 && (
                  <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">+{project.teamMembers.length - 5}</span>
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsInviteDialogOpen(true)}>
                <Users className="mr-1 h-3 w-3" />
                Invite
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Due Date</span>
            <div className="text-sm font-medium">
              {new Date(project.dueDate).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      <InviteMemberDialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen} projectId={project.id} />
    </>
  )
}
