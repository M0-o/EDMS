import type z from "zod"
import { useAuth } from "@clerk/clerk-react"

interface DocumentFiles {
  carteNationale: File | null;
  baccalaureat: File | null;
  diplomeBac2: File | null;
  diplomeBac3: File | null;
  releveNotes: File | null;
}

const API_BASE = 'http://localhost:8000'

export function useVerificationDocumentsService() {
  const { getToken } = useAuth()

  async function uploadDocuments( studentId: string, files: DocumentFiles ) {
    const token = await getToken()
    const formData = new FormData()

    formData.append('student_id', studentId)
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file)
      }
    })

    const response = await fetch(`${API_BASE}/documents`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    return response.json()
  }

  return { uploadDocuments }
}

