import BatchDiplomaStatusForm from "@/components/forms/DiplomaStatusBatchForm"
import { useParams } from "react-router-dom"


export default function BatchUpdateDiplomaStatusPage() {
  const { diplomaIds } = useParams()

  if (!diplomaIds) {
    return <div>Error: Diploma IDs are required</div>
  }

  return (
    <div className="flex flex-col justify-center h-screen my-[-80px]">
      <BatchDiplomaStatusForm diplomaIds={JSON.parse(decodeURIComponent(diplomaIds)).map(Number)} />
    </div>
  )
}