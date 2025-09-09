import StudentForm from "@/components/forms/StudentForm"
import { Button } from "@/components/ui/button"
import {useNavigate} from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function CreateStudentPage() {
  const navigate = useNavigate()
  return (
    <>
    
    <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

      <StudentForm />
    </div>
    </>
  )
}