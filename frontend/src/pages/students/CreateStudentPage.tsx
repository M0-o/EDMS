import StudentForm from "@/components/forms/StudentForm"

export default function CreateStudentPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <h1 className="text-2xl font-bold">Create Student</h1>
      <StudentForm />
    </div>
  )
}