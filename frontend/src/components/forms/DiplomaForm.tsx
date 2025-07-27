"use client"

import type React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { FileText, Upload, Calendar, Building, Hash, X } from "lucide-react"
import { useState } from "react"
import { diplomaSchemaCreate } from "@/schemas/diplomaSchemas"
import { useSearchParams } from "react-router-dom"
export default function DiplomaForm() {

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [URLsearchParams, setURLsearchParams] = useSearchParams()
    const initialValues = {
        student_id: Number(URLsearchParams.get("student_id")) || 0,
        title: URLsearchParams.get("title") || "",
        institution: URLsearchParams.get("institution") || "",
        issue_date: URLsearchParams.get("issue_date") || "",
    }
  const form = useForm<z.infer<typeof diplomaSchemaCreate>>({
    resolver: zodResolver(diplomaSchemaCreate),
    defaultValues: initialValues,
  })

/*   form.watch((value) => {
    const params = new URLSearchParams()
    params.set("student_id", value.student_id?.toString() as string)
    params.set("title", value.title as string)
    params.set("institution", value.institution as string)
    params.set("issue_date", value.issue_date as string)
    setURLsearchParams(params, { replace: true })
  }) */
function updateParam(key: string, value: string) {
  const p = new URLSearchParams(URLsearchParams)
  if (value) p.set(key, value)
  else p.delete(key)
  setURLsearchParams(p, { replace: true })
}
  function onSubmit(values: z.infer<typeof diplomaSchemaCreate>) {

    toast.success("Diploma registered successfully!", {
      description: (
        <div className="mt-2 space-y-1">
          <p>
            <strong>{values.title}</strong>
          </p>
          <p>Student ID: {values.student_id}</p>
          <p>Institution: {values.institution}</p>
          <p>Issue Date: {new Date(values.issue_date).toLocaleDateString()}</p>
          {uploadedFile && <p>File: {uploadedFile.name}</p>}
        </div>
      ),
    })

    // Reset form and file after successful submission
    form.reset()
    setUploadedFile(null)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB")
        return
      }

      // Check file type (allow common document formats)
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF, JPEG, or PNG file")
        return
      }

      setUploadedFile(file)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    // Reset the file input
    const fileInput = document.getElementById("diploma-file") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Diploma Registration</CardTitle>
          <CardDescription>Register a new diploma in the academic system</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Student ID */}
              <FormField
                control={form.control}
                name="student_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Student ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter student ID"
                        {...field}
                        onChange={(e) =>
                           { updateParam("student_id", e.target.value)
                            return field.onChange(Number.parseInt(e.target.value) || 0)}}
                      />
                    </FormControl>
                    <FormDescription>The unique identifier for the student</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Diploma Title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bachelor of Science in Computer Science" {...field} />
                    </FormControl>
                    <FormDescription>The full title of the diploma or degree</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Institution */}
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Institution
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., University of Technology" {...field} />
                    </FormControl>
                    <FormDescription>The name of the educational institution</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Issue Date */}
              <FormField
                control={form.control}
                name="issue_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Issue Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>The date when the diploma was issued</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <Upload className="w-4 h-4" />
                  Diploma Document
                  <span className="text-muted-foreground font-normal">(Optional)</span>
                </label>

                {!uploadedFile ? (
                  <div className=" relative border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PDF, JPEG, PNG up to 10MB</p>
                    </div>
                    <Input
                      id="diploma-file"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={removeFile} className="h-8 w-8 p-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Upload a scanned copy or digital version of the diploma (optional)
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Registering Diploma...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Register Diploma
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
