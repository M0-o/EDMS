import { AppSidebar } from "@/components/app-sidebar"
import { DiplomasDataTable  } from "@/components/data-table-diplomas"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { z } from "zod"

import type { diplomaSchemaOut } from "@/schemas/diplomaSchemas"
import { diplomaService } from "@/services/DiplomaService"
import { useEffect, useState } from "react"

const data : z.infer<typeof diplomaSchemaOut>[] = [{
    id: 1,
    student_id: 12345,
    title: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    issue_date: "2023-06-15",
    is_valid: true,
    created_at: "2023-06-20T10:30:00Z",
  },
  {
    id: 2,
    student_id: 12346,
    title: "Master of Business Administration",
    institution: "Business School International",
    issue_date: "2023-05-20",
    is_valid: true,
    created_at: "2023-05-25T14:15:00Z",
  },
  {
    id: 3,
    student_id: 12347,
    title: "Bachelor of Arts in Psychology",
    institution: "Liberal Arts College",
    issue_date: "2023-07-10",
    is_valid: false,
    created_at: "2023-07-15T09:45:00Z",
  },
  {
    id: 4,
    student_id: 12348,
    title: "Doctor of Philosophy in Physics",
    institution: "Research University",
    issue_date: "2023-08-01",
    is_valid: true,
    created_at: "2023-08-05T16:20:00Z",
  },
  {
    id: 5,
    student_id: 12349,
    title: "Bachelor of Engineering in Mechanical Engineering",
    institution: "Engineering Institute",
    issue_date: "2023-04-30",
    is_valid: true,
    created_at: "2023-05-02T11:10:00Z",
  },]
export default function Page() {
    const [data, setData] = useState<z.infer<typeof diplomaSchemaOut>[]>([])
    useEffect(() => {
        const fetchDiplomas = async () => {
            try {
                const diplomas = await diplomaService.getAll()
                setData(diplomas)
                console.log("Fetched diplomas:", diplomas)
            } catch (error) {
                console.error("Failed to fetch diplomas:", error)
            }
        }

        fetchDiplomas()
    }, [])
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            
              <DiplomasDataTable pdata={data} />
             
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
