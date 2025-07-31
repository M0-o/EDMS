import { AppSidebar } from "@/components/app-sidebar"
import { StudentsDataTable  } from "@/components/data-table-students"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { studentSchemaOut } from "@/schemas/studentSchemas"
import { z } from "zod"
import { studentsService } from "@/services/studentService"
import {  useEffect, useState } from "react"

export default function Page() {
  const [students, setStudents] = useState<z.infer<typeof studentSchemaOut>[]>([])

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await studentsService.getAll().catch((error) => {
        console.error("Failed to fetch students:", error)
        return []
      })
      setStudents(students)
      console.log("Fetched students:", students)
    }

    fetchStudents()
    
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
            
              <StudentsDataTable pdata={students} />
             
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
