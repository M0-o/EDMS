import DiplomaForm from "@/components/forms/DiplomaForm"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function CreateDiplomaPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <Button variant="outline" onClick={() => navigate(-1)}>
        Back
      </Button>
      <h1 className="text-2xl font-bold">Create Diploma</h1>
      <DiplomaForm />
    </div>
  )
}