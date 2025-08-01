import { studentSchemaOut } from "@/schemas/studentSchemas";
import z from "zod"
//this is a page to view an individual student's details 

export default function StudentDetailPage() {
  // Fetch student data based on ID from URL params
  // For now, we will use a static example
  const student: z.infer<typeof studentSchemaOut> = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    cne: "CNE123",
    apogee: "APOGEE123",
    email: "john.doe@example.com",
    created_at: "2023-10-01T12:00:00Z",
  }

  return (
    <div>
      <h1>Student Details</h1>
      <p>
        <strong>Name:</strong> {student.first_name} {student.last_name}
      </p>
      <p>
        <strong>CNE:</strong> {student.cne}
      </p>
      <p>
        <strong>Apogee:</strong> {student.apogee}
      </p>
      <p>
        <strong>Email:</strong> {student.email}
      </p>
    </div>
  )
}