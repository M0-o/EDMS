import DiplomaStatusForm from "@/components/forms/DiplomaStatusForm"
import { useParams , useNavigate} from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function UpdateDiplomaStatusPage() {
  const { diplomaId } = useParams()
  const navigate = useNavigate()

  if (!diplomaId) {
    return <div>Error: Diploma ID is required</div>
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <Button variant="outline" onClick={() => navigate(-1)}>
        Back
      </Button>
      <h1 className="text-2xl font-bold">Update Diploma Status</h1>
      <DiplomaStatusForm diplomaId={Number(diplomaId)} />
    </div>
  )
}