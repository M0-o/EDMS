import DiplomaStatusForm from "@/components/forms/DiplomaStatusForm"
import { useParams } from "react-router-dom"


export default function UpdateDiplomaStatusPage() {
  const { diplomaId } = useParams()
 

  if (!diplomaId) {
    return <div>Error: Diploma ID is required</div>
  }

  return (
    <div className="flex flex-col justify-center h-screen my-[-80px]">
      <DiplomaStatusForm diplomaId={Number(diplomaId)} />
    </div>
  )
}