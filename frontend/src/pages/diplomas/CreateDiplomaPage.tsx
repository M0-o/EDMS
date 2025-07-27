import DiplomaForm from "@/components/forms/DiplomaForm"

export default function CreateDiplomaPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <h1 className="text-2xl font-bold">Create Diploma</h1>
      <DiplomaForm />
    </div>
  )
}