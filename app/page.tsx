"use client";

import { useState } from "react";
import { TaskList } from "@/components/task-list";
import { TaskForm } from "@/components/task-form";
import { TaskStats } from "@/components/task-stats";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: "assignment" | "project" | "study" | "exam";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  const addTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks([task, ...tasks]);
    setShowTaskForm(false);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks =
    selectedCategory === "all"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        tasks={tasks}
      />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">
                {selectedCategory === "all"
                  ? "All Tasks"
                  : selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1) +
                    "s"}
              </h1>
              <p className="text-muted-foreground mt-1">
                Stay organized and boost your academic productivity
              </p>
            </div>
            <Button onClick={() => setShowTaskForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>

          <TaskStats tasks={filteredTasks} />

          {showTaskForm && (
            <TaskForm
              onSubmit={addTask}
              onCancel={() => setShowTaskForm(false)}
            />
          )}

          <TaskList
            tasks={filteredTasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
}
