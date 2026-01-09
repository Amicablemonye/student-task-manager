"use client"

import type { Task } from "@/app/page"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Trash2, AlertCircle, BookOpen, FolderOpen, GraduationCap, FileText } from "lucide-react"
import { format, isToday, isTomorrow, isPast } from "date-fns"

interface TaskCardProps {
  task: Task
  onUpdate: (taskId: string, updates: Partial<Task>) => void
  onDelete: (taskId: string) => void
}

const categoryIcons = {
  assignment: BookOpen,
  project: FolderOpen,
  study: GraduationCap,
  exam: FileText,
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const Icon = categoryIcons[task.category]
  const isOverdue = task.dueDate && isPast(task.dueDate) && !task.completed

  const formatDueDate = (date: Date) => {
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "MMM d, yyyy")
  }

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${
        task.completed ? "opacity-75" : ""
      } ${isOverdue ? "border-destructive/50" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => onUpdate(task.id, { completed: checked as boolean })}
            className="mt-1"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className={`font-medium text-pretty ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="text-muted-foreground hover:text-destructive shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {task.description && (
              <p
                className={`text-sm mb-3 text-pretty ${
                  task.completed ? "text-muted-foreground" : "text-foreground/80"
                }`}
              >
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="gap-1">
                <Icon className="h-3 w-3" />
                {task.category}
              </Badge>

              <Badge variant="outline" className={priorityColors[task.priority]}>
                {task.priority} priority
              </Badge>

              {task.dueDate && (
                <Badge
                  variant="outline"
                  className={`gap-1 ${
                    isOverdue ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-muted"
                  }`}
                >
                  {isOverdue ? <AlertCircle className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
                  {formatDueDate(task.dueDate)}
                </Badge>
              )}

              <Badge variant="outline" className="gap-1 text-xs">
                <Clock className="h-3 w-3" />
                {format(task.createdAt, "MMM d")}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
