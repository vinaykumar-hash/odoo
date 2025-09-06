export interface Project {
  id: number
  name: string
  description: string
  progress: number
  status: string
  dueDate: string
  priority: string
  teamMembers: Array<{
    name: string
    email: string
    role: string
  }>
}

export interface Discussion {
  id: number
  title: string
  description: string
  category: string
  projectId?: string
  isPinned: boolean
  author: string
  createdAt: string
  replies: number
  lastActivity: string
}

export interface Task {
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

// Storage keys
const PROJECTS_KEY = "synergysphere_projects"
const DISCUSSIONS_KEY = "synergysphere_discussions"
const TASKS_KEY = "synergysphere_tasks"

// Project storage functions
export function getProjects(): Project[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(PROJECTS_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
}

export function addProject(project: Omit<Project, "id">): Project {
  const projects = getProjects()
  const newProject = {
    ...project,
    id: Date.now(), // Simple ID generation
  }
  projects.push(newProject)
  saveProjects(projects)
  return newProject
}

// Discussion storage functions
export function getDiscussions(): Discussion[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(DISCUSSIONS_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveDiscussions(discussions: Discussion[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(DISCUSSIONS_KEY, JSON.stringify(discussions))
}

export function addDiscussion(
  discussion: Omit<Discussion, "id" | "author" | "createdAt" | "replies" | "lastActivity">,
): Discussion {
  const discussions = getDiscussions()
  const newDiscussion = {
    ...discussion,
    id: Date.now(),
    author: "Current User", // In a real app, this would come from auth
    createdAt: new Date().toISOString(),
    replies: 0,
    lastActivity: new Date().toISOString(),
  }
  discussions.push(newDiscussion)
  saveDiscussions(discussions)
  return newDiscussion
}

// Task storage functions
export function getTasks(): Task[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(TASKS_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export function addTask(task: Omit<Task, "id" | "createdAt">): Task {
  const tasks = getTasks()
  const newTask = {
    ...task,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  }
  tasks.push(newTask)
  saveTasks(tasks)
  return newTask
}

// Initialize with mock data if empty
export function initializeStorage(): void {
  if (typeof window === "undefined") return

  if (getProjects().length === 0) {
    const mockProjects = [
      {
        id: 1,
        name: "Website Redesign",
        description: "Complete overhaul of company website with new branding and improved user experience",
        progress: 65,
        status: "active",
        dueDate: "2024-01-15",
        priority: "high",
        teamMembers: [
          { name: "Salvi", email: "salvi@company.com", role: "admin" },
          { name: "Archie", email: "archie@company.com", role: "member" },
        ],
      },
      {
        id: 2,
        name: "Mobile App Development",
        description: "Native iOS and Android app for customer engagement",
        progress: 30,
        status: "active",
        dueDate: "2024-02-28",
        priority: "medium",
        teamMembers: [
          { name: "Salvi", email: "salvi@company.com", role: "admin" },
          { name: "Archie", email: "archie@company.com", role: "member" },
        ],
      },
    ]
    saveProjects(mockProjects)
  }
}
