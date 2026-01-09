"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Code2, Lightbulb, Wrench, Award } from "lucide-react"

export function ProjectResume() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Project Overview</h1>
        <p className="text-muted-foreground mt-1">Technical details and learning outcomes</p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Student Task Manager</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <span className="text-sm text-muted-foreground">| 2024</span>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex gap-3">
            <Code2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground leading-relaxed">
                Built full-stack task management app to learn React—implemented component architecture, state management
                with hooks, and local storage persistence for reliable user experience
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Wrench className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground leading-relaxed">
                Solved data persistence challenges by integrating browser storage APIs, ensuring tasks survive page
                refreshes
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground leading-relaxed">
                Applied responsive design principles and input validation to handle edge cases like empty states and
                errors
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground leading-relaxed">
                <span className="font-semibold">Key Learning:</span> Managing state flow between components and handling
                asynchronous user interactions
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-3">
        <h3 className="text-lg font-semibold">Technical Implementation</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Component-based architecture with reusable UI elements</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>React hooks (useState, useEffect) for state management and side effects</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>TypeScript for type safety and better developer experience</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Responsive design with Tailwind CSS for mobile and desktop views</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Task categorization, priority levels, and due date tracking</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
