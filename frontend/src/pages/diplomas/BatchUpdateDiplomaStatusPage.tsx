import BatchDiplomaStatusForm from "@/components/forms/DiplomaStatusBatchForm"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function BatchUpdateDiplomaStatusPage() {
  const { diplomaIds } = useParams()
  const Navigate = useNavigate()
  if (!diplomaIds) {
    return <div>Error: Diploma IDs are required</div>
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <Button variant="outline" onClick={() => Navigate(-1)}>
        Back
      </Button>
      <h1 className="text-2xl font-bold">Update Diploma Status</h1>
      <BatchDiplomaStatusForm diplomaIds={JSON.parse(decodeURIComponent(diplomaIds)).map(Number)} />
    </div>
  )
}