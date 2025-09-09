import VerificationDocumentsForm from "@/components/forms/VerificationDocumentsForm"
import { useParams , useNavigate} from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function uploadDocumentsPage(){
    const { studentId } = useParams<{ studentId: string }>();
    const navigate = useNavigate();

    if (!studentId) return <div>Student ID is required</div>;

    return(
        <div className="flex flex-col items-center justify-center mx-auto mt-10">
            <Button variant="outline" onClick={() => navigate(-1)}>
                Back
            </Button>
            <h1 className="text-2xl font-bold mb-4">Upload Verification Documents</h1>
            <p className="mb-6 text-center">Please upload the necessary verification documents for student ID: {studentId}</p>
            <VerificationDocumentsForm studentId={studentId} />
        </div>
    )
}
