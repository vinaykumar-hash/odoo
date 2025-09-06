"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, File, ImageIcon, FileText, Download, MoreHorizontal } from "lucide-react"

interface ProjectFilesProps {
  projectId: number
}

// Mock file data
const mockFiles = [
  {
    id: 1,
    name: "Project Requirements.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "Salvi",
    uploadedAt: "2023-12-15",
  },
  {
    id: 2,
    name: "Design Mockups.fig",
    type: "design",
    size: "15.7 MB",
    uploadedBy: "Archie",
    uploadedAt: "2023-12-18",
  },
  {
    id: 3,
    name: "Homepage Screenshot.png",
    type: "image",
    size: "1.2 MB",
    uploadedBy: "Vinay",
    uploadedAt: "2023-12-20",
  },
]

export function ProjectFiles({ projectId }: ProjectFilesProps) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-8 w-8 text-accent" />
      case "pdf":
        return <FileText className="h-8 w-8 text-destructive" />
      case "design":
        return <File className="h-8 w-8 text-primary" />
      default:
        return <File className="h-8 w-8 text-muted-foreground" />
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-accent text-accent-foreground"
      case "pdf":
        return "bg-destructive text-destructive-foreground"
      case "design":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Files</h3>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockFiles.map((file) => (
          <Card key={file.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">{getFileIcon(file.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium truncate">{file.name}</h4>
                    <Badge className={getFileTypeColor(file.type)} variant="secondary">
                      {file.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>Uploaded by {file.uploadedBy}</span>
                    <span>•</span>
                    <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {mockFiles.length === 0 && (
          <div className="text-center py-12">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No files uploaded</h3>
            <p className="text-muted-foreground mb-4">Upload files to share with your team members.</p>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Your First File
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
