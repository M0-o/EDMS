"use client"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import debounce from "lodash/debounce"
import { useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Send,
  Truck,
  Building,
  Edit,
  RotateCcw,
  PenTool,
  Package,
  CheckSquare,
} from "lucide-react"

import { diplomaStatusCreateSchema } from "@/schemas/diplomaStatusSchemas"
import { useDiplomaService } from "@/services/diplomaService"

// Status options based on the enum
const statusOptions = [
  { value: "en attente", label: "En Attente", icon: Clock },
  { value: "envoyé à la présidence", label: "Envoyé à la Présidence", icon: Send },
  { value: "arrivé à la présidence", label: "Arrivé à la Présidence", icon: Building },
  { value: "envoyé à l'établissement", label: "Envoyé à l'Établissement", icon: Truck },
  { value: "arrivé à l'établissement", label: "Arrivé à l'Établissement", icon: Building },
  { value: "correction requise", label: "Correction Requise", icon: Edit },
  { value: "renvoyé après correction", label: "Renvoyé après Correction", icon: RotateCcw },
  { value: "signé par le président", label: "Signé par le Président", icon: PenTool },
  { value: "prêt", label: "Prêt", icon: Package },
  { value: "délivré", label: "Délivré", icon: CheckSquare },
]

interface DiplomaStatusFormProps {
  diplomaId: number
}

export default function DiplomaStatusForm({
  diplomaId,
}: DiplomaStatusFormProps) {
  const [URLsearchParams, setURLsearchParams] = useSearchParams()
  const diplomaService = useDiplomaService()
  
  const form = useForm<z.infer<typeof diplomaStatusCreateSchema>>({
    resolver: zodResolver(diplomaStatusCreateSchema),
    defaultValues: {
      status: URLsearchParams.get("status") || "",
      reason: URLsearchParams.get("reason") || "",
      notes: URLsearchParams.get("notes") || "",
      diploma_id: diplomaId,
    },
  })

  const debouncedUpdateParams  = useMemo(
    () =>
      debounce((value: z.infer<typeof diplomaStatusCreateSchema >) => {
        setURLsearchParams(
          () => {
            const newParams = new URLSearchParams()
            newParams.set("status", value.status || "")
            newParams.set("reason", value.reason || "")
            newParams.set("notes", value.notes || "")
            return newParams
          },
          { replace: true },
        )
      }, 300),
    [setURLsearchParams],
  )


 useEffect(() => {
     const subscription = form.watch((value) => {
         debouncedUpdateParams(value)
     })
     return () => {
         subscription.unsubscribe()
         debouncedUpdateParams.cancel()
     }
 }, [form, debouncedUpdateParams])


 async function onFormSubmit(data: z.infer<typeof diplomaStatusCreateSchema>) {
    const response = await diplomaService.updateStatus(data)
    console.log("Diploma status updated:", response)
  }

  const selectedStatus = statusOptions.find((option) => option.value === form.getValues().status)
  const StatusIcon = selectedStatus?.icon || AlertCircle

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Update Diploma Status
        </CardTitle>
        <CardDescription>Update the status for diploma ID: {diplomaId}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Status Dropdown */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Status <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status">
                          {selectedStatus && (
                            <div className="flex items-center gap-2">
                              <StatusIcon className="h-4 w-4" />
                              {selectedStatus.label}
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((option) => {
                        const Icon = option.icon
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {option.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reason Field */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Reason
                    <span className="text-muted-foreground ml-1">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter reason for status change..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes Field */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Notes
                    <span className="text-muted-foreground ml-1">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes or comments..."
                      className="min-h-[100px] resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hidden Diploma ID Field (for reference) */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Diploma ID:</span>
                <span className="font-medium">{diplomaId}</span>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="submit"className="flex-1">
               
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Update Status
                  </>
              
              </Button>
            
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
