import VerificationDocumentsForm from "@/components/forms/VerificationDocumentsForm"
import { useParams } from "react-router-dom"


export default function uploadDocumentsPage(){
    const { studentId } = useParams<{ studentId: string }>();
  

    if (!studentId) return <div>Student ID is required</div>;

    return(
        <div className="flex flex-col items-center justify-center mx-auto mt-10">
            <p className="mb-6 text-center">Please upload the necessary verification documents for student ID: {studentId}</p>
            <VerificationDocumentsForm studentId={studentId} />
        </div>
    )
}
