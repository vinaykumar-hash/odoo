"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, User } from "lucide-react"
import { mockTasks } from "@/lib/mock-data"
import { CreateTaskDialog } from "./create-task-dialog"
import { TaskDetailDialog } from "./task-detail-dialog"

interface TaskBoardProps {
  projectId: number
}

interface Task {
  id: number
  projectId: number
  title: string
  description: string
  status: string
  priority: string
  assignee: string
  dueDate: string
  createdAt: string
}

export function TaskBoard({ projectId }: TaskBoardProps) {
  const [tasks, setTasks] = useState(mockTasks.filter((task) => task.projectId === projectId))
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [createDialogStatus, setCreateDialogStatus] = useState<string>("")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false)

  const todoTasks = tasks.filter((task) => task.status === "todo")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
  const completedTasks = tasks.filter((task) => task.status === "completed")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-accent text-accent-foreground"
      case "low":
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

  const handleCreateTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...newTask,
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, task])
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsTaskDetailOpen(true)
  }

  const handleCreateClick = (status: string) => {
    setCreateDialogStatus(status)
    setIsCreateDialogOpen(true)
  }

  const TaskColumn = ({ title, tasks, status }: { title: string; tasks: Task[]; status: string }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          {title} ({tasks.length})
        </h3>
        <Button variant="ghost" size="sm" onClick={() => handleCreateClick(status)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleTaskClick(task)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                <Badge className={getPriorityColor(task.priority)} variant="secondary">
                  {task.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs">{getInitials(task.assignee)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No {status} tasks</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 bg-transparent"
              onClick={() => handleCreateClick(status)}
            >
              <Plus className="mr-1 h-3 w-3" />
              Create Task
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskColumn title="To Do" tasks={todoTasks} status="todo" />
        <TaskColumn title="In Progress" tasks={inProgressTasks} status="in-progress" />
        <TaskColumn title="Completed" tasks={completedTasks} status="completed" />
      </div>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        projectId={projectId}
        initialStatus={createDialogStatus}
        onCreateTask={handleCreateTask}
      />

      {selectedTask && (
        <TaskDetailDialog
          open={isTaskDetailOpen}
          onOpenChange={setIsTaskDetailOpen}
          task={selectedTask}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </>
  )
}
