"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { User, Mail, Hash, GraduationCap } from "lucide-react"

import { studentsService } from "@/services/studentService"
import { studentSchemaCreate } from "@/schemas/studentSchemas"
import { useSearchParams } from "react-router-dom"

import debounce from 'lodash/debounce'
import { useEffect, useMemo } from 'react'

export default function StudentForm() {

  const [URLsearchParams , setURLsearchParams] = useSearchParams();
    const initialValues = {
        first_name: URLsearchParams.get("first_name") || "",
        last_name: URLsearchParams.get("last_name") || "",
        cne: URLsearchParams.get("cne") || "",
        apogee: URLsearchParams.get("apogee") || "",
        email: URLsearchParams.get("email") || "",
    }

  const form = useForm<z.infer<typeof studentSchemaCreate>>({
    resolver: zodResolver(studentSchemaCreate),
    defaultValues: initialValues
  })
  
  //persist the form data in the URL search params
   const debouncedUpdateParams = useMemo(
    () =>
      debounce((value: z.infer<typeof studentSchemaCreate>) => {
        const params = new URLSearchParams()
        params.set("first_name", value.first_name || "")
        params.set("last_name",  value.last_name  || "")
        params.set("cne",        value.cne        || "")
        params.set("apogee",     value.apogee     || "")
        params.set("email",      value.email      || "")
        setURLsearchParams(params, { replace: true })
      }, 300),
    [setURLsearchParams]
  )

  useEffect(() => {
    const subscription = form.watch((value) => {
      debouncedUpdateParams(value as z.infer<typeof studentSchemaCreate>)
    })
    return () => {
      subscription.unsubscribe()
      debouncedUpdateParams.cancel()
    }
  }, [form, debouncedUpdateParams])

  function onSubmit(values: z.infer<typeof studentSchemaCreate>) {


    // Convert empty email to undefined for optional handling
    const submitData = {
      ...values,
      email: values.email === "" ? undefined : values.email,
    }
    // Call the create method from your service
    studentsService.create(submitData)
      .then((data) => {
        console.log("Student created successfully:", data)
        //show success toast and redirect to students page using react router 
        toast.success("Student registered successfully!", {
      description: (
        <div className="mt-2 space-y-1">
          <p>
            <strong>
              {submitData.first_name} {submitData.last_name}
            </strong>
          </p>
          <p>CNE: {submitData.cne}</p>
          <p>Apogee: {submitData.apogee}</p>
          {submitData.email && <p>Email: {submitData.email}</p>}
        </div>
      ),
    })
      })
      .catch((error) => {
        console.error("Error creating student:", error)
        toast.error("Failed to register student. Please try again.")
      })

    form.reset()
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center">
            <GraduationCap className="w-6 h-6 " />
          </div>
          <CardTitle className="text-2xl font-bold ">Student Registration</CardTitle>
          <CardDescription >Register a new student in the academic system</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Student ID Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cne"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        CNE (National Student Code)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="A123456789" className="h-11 font-mono" {...field} />
                      </FormControl>
                      <FormDescription>Format: Letter followed by 9 digits (e.g., A123456789)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apogee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Apogee Code
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="12345678" className="h-11 font-mono" {...field} />
                      </FormControl>
                      <FormDescription>8-digit student identification number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                      <span className="text-sm font-normal">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="student@university.edu" className="h-11" {...field} />
                    </FormControl>
                    <FormDescription>Optional email address for communication and notifications</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-medium"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Registering Student...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Register Student
                    </div>
                  )}
                </Button>
              </div>

              {/* Form Status */}
              <div className="text-center text-sm ">All fields marked with * are required</div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
