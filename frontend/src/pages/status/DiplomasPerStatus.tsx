import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { DiplomasDataTable  } from "@/components/data-table-diplomas"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { z } from "zod"

import type { diplomaSchemaOut } from "@/schemas/diplomaSchemas"
import { useDiplomaService } from "@/services/diplomaService"
import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"

export default function DiplomasPerStatusPage() {

    const [data, setData] = useState<z.infer<typeof diplomaSchemaOut>[]>([])
    const diplomaService= useDiplomaService()
    const { diplomaStatus } = useParams<{ diplomaStatus: string }>()

    useEffect(() => {
        const fetchDiplomas = async () => {
            try {
                const diplomas = await diplomaService.getByStatus(diplomaStatus)
                setData(diplomas)
                console.log("Fetched diplomas:", diplomas)
            } catch (error) {
                console.error("Failed to fetch diplomas:", error)
            }
        }

        fetchDiplomas()
    }, [diplomaStatus])

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
