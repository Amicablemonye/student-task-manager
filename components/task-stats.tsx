import type { Task } from "@/app/page"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertTriangle, TrendingUp } from "lucide-react"
import { isPast, isToday, isTomorrow } from "date-fns"

interface TaskStatsProps {
  tasks: Task[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks

  const overdueTasks = tasks.filter((task) => task.dueDate && isPast(task.dueDate) && !task.completed).length

  const dueTodayTasks = tasks.filter((task) => task.dueDate && isToday(task.dueDate) && !task.completed).length

  const dueTomorrowTasks = tasks.filter((task) => task.dueDate && isTomorrow(task.dueDate) && !task.completed).length

  const highPriorityTasks = tasks.filter((task) => task.priority === "high" && !task.completed).length

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const stats = [
    {
      label: "Completed",
      value: completedTasks,
      total: totalTasks,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200",
    },
    {
      label: "Pending",
      value: pendingTasks,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
    },
    {
      label: "High Priority",
      value: highPriorityTasks,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200",
    },
    {
      label: "Overdue",
      value: overdueTasks,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className={`${stat.bgColor} border`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {stat.total && <p className="text-sm text-muted-foreground">/ {stat.total}</p>}
                  </div>
                  {stat.label === "Completed" && totalTasks > 0 && (
                    <Badge variant="secondary" className="mt-1">
                      {completionRate}% complete
                    </Badge>
                  )}
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
