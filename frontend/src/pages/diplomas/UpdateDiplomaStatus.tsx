import DiplomaStatusForm from "@/components/forms/DiplomaStatusForm"
import { useParams } from "react-router-dom"


export default function UpdateDiplomaStatusPage() {
  const { diplomaId } = useParams()

  if (!diplomaId) {
    return <div>Error: Diploma ID is required</div>
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <h1 className="text-2xl font-bold">Update Diploma Status</h1>
      <DiplomaStatusForm diplomaId={Number(diplomaId)} />
    </div>
  )
}