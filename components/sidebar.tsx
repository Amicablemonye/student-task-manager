"use client";

import type { Task } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FolderOpen,
  GraduationCap,
  FileText,
  Calendar,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  tasks: Task[];
}

const categories = [
  { id: "all", label: "All Tasks", icon: FileText },
  { id: "assignment", label: "Assignments", icon: BookOpen },
  { id: "project", label: "Projects", icon: FolderOpen },
  { id: "study", label: "Study", icon: GraduationCap },
  { id: "exam", label: "Exams", icon: Calendar },
];

export function Sidebar({
  selectedCategory,
  onCategoryChange,
  tasks,
}: SidebarProps) {
  const getTaskCount = (category: string) => {
    if (category === "all") return tasks.length;
    if (category === "project-info") return 0;
    return tasks.filter((task) => task.category === category).length;
  };

  const getCompletedCount = (category: string) => {
    if (category === "all")
      return tasks.filter((task) => task.completed).length;
    if (category === "project-info") return 0;
    return tasks.filter((task) => task.category === category && task.completed)
      .length;
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-4">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-sidebar-foreground mb-4">
            Student Tasks
          </h2>

          <Card className="p-4 bg-sidebar-primary">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-sidebar-primary-foreground" />
              <span className="text-sm font-medium text-sidebar-primary-foreground">
                Progress
              </span>
            </div>
            <div className="text-2xl font-bold text-sidebar-primary-foreground mb-1">
              {completionRate}%
            </div>
            <div className="text-xs text-sidebar-primary-foreground/80">
              {completedTasks} of {totalTasks} completed
            </div>
            <div className="w-full bg-sidebar-primary-foreground/20 rounded-full h-2 mt-3">
              <div
                className="bg-sidebar-primary-foreground h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </Card>
        </div>

        <nav className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = getTaskCount(category.id);
            const completed = getCompletedCount(category.id);
            const isSelected = selectedCategory === category.id;
            const showCount = category.id !== "project-info" && count > 0;

            return (
              <Button
                key={category.id}
                variant={isSelected ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-auto p-3 ${
                  isSelected
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                <Icon className="h-4 w-4" />
                <div className="flex-1 text-left">
                  <div className="font-medium">{category.label}</div>
                  {showCount && (
                    <div className="text-xs opacity-70">
                      {completed}/{count} completed
                    </div>
                  )}
                </div>
                {showCount && (
                  <Badge variant="secondary" className="ml-auto">
                    {count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
