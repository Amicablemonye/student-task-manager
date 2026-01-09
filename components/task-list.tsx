import type { Task } from "@/app/page"
import { TaskCard } from "@/components/task-card"

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">No tasks found</div>
        <div className="text-sm text-muted-foreground">Create your first task to get started with your studies!</div>
      </div>
    )
  }

  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="space-y-6">
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Pending Tasks ({pendingTasks.length})</h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskCard key={task.id} task={task} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Completed Tasks ({completedTasks.length})</h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
