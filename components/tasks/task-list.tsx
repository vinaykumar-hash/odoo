"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, User, MoreHorizontal, CheckCircle2, GripVertical } from "lucide-react"
import { mockTasks, mockProjects } from "@/lib/mock-data"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"

interface TaskListProps {
  viewMode: "list" | "card"
}

export function TaskList({ viewMode }: TaskListProps) {
  const [tasks, setTasks] = useState(mockTasks)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setTasks(items)
  }

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary text-primary-foreground"
      case "in-progress":
        return "bg-accent text-accent-foreground"
      case "todo":
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

  const getProjectName = (projectId: number) => {
    const project = mockProjects.find((p) => p.id === projectId)
    return project?.name || "Unknown Project"
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString()
  }

  const TaskCard = ({ task, index }: { task: any; index: number }) => (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group ${snapshot.isDragging ? "rotate-2 scale-105" : ""} transition-transform`}
        >
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer glassmorphism border-white/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-base truncate">{task.title}</CardTitle>
                    {task.status === "completed" && <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />}
                  </div>
                  <div className="flex items-center space-x-2 flex-wrap">
                    <Badge className={getStatusColor(task.status)} variant="secondary">
                      {task.status.replace("-", " ")}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)} variant="secondary">
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div
                    {...provided.dragHandleProps}
                    className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
              <div className="text-xs text-muted-foreground">{getProjectName(task.projectId)}</div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">{getInitials(task.assignee)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground truncate">{task.assignee}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span
                    className={`text-xs ${isOverdue(task.dueDate) ? "text-destructive font-medium" : "text-muted-foreground"}`}
                  >
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )

  const TaskListItem = ({ task, index }: { task: any; index: number }) => (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group ${snapshot.isDragging ? "scale-105" : ""} transition-transform`}
        >
          <Card className="hover:shadow-md transition-shadow cursor-pointer glassmorphism border-white/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    {task.status === "completed" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(task.status)} variant="secondary">
                      {task.status.replace("-", " ")}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)} variant="secondary">
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{getProjectName(task.projectId)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div
                    {...provided.dragHandleProps}
                    className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{getInitials(task.assignee)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{task.assignee}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span
                    className={`text-sm ${isOverdue(task.dueDate) ? "text-destructive font-medium" : "text-muted-foreground"}`}
                  >
                    {new Date(task.dueDate).toLocaleDateString()}
                    {isOverdue(task.dueDate) && " (Overdue)"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {viewMode === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <TaskListItem key={task.id} task={task} index={index} />
                ))}
              </div>
            )}
            {provided.placeholder}

            {tasks.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">You don't have any tasks assigned yet.</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
