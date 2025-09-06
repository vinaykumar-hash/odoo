"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskBoard } from "./task-board"
import { ProjectTeam } from "./project-team"
import { ProjectFiles } from "./project-files"
import { ProjectActivity } from "./project-activity"
import { ProjectChat } from "./project-chat"

interface Project {
  id: number
  name: string
  description: string
  progress: number
  status: string
  dueDate: string
  teamMembers: Array<{ name: string; email: string; role: string }>
}

interface ProjectTabsProps {
  project: Project
}

export function ProjectTabs({ project }: ProjectTabsProps) {
  return (
    <Tabs defaultValue="tasks" className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="tasks" className="space-y-4">
        <TaskBoard projectId={project.id} />
      </TabsContent>

      <TabsContent value="chat" className="space-y-4">
        <ProjectChat projectId={project.id} />
      </TabsContent>

      <TabsContent value="team" className="space-y-4">
        <ProjectTeam project={project} />
      </TabsContent>

      <TabsContent value="files" className="space-y-4">
        <ProjectFiles projectId={project.id} />
      </TabsContent>

      <TabsContent value="activity" className="space-y-4">
        <ProjectActivity projectId={project.id} />
      </TabsContent>
    </Tabs>
  )
}
