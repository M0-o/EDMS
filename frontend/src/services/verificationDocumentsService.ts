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

  async function uploadDocuments( files: DocumentFiles) {
    const token = await getToken()
    const formData = new FormData()

    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file)
      }
    })

    const response = await fetch(`${API_BASE}/verification-documents`, {
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

