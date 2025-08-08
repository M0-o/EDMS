import type z from "zod"
import { diplomaSchemaOut, diplomaSchemaCreate } from "@/schemas/diplomaSchemas"
import { useAuth} from "@clerk/clerk-react"

const API_BASE = 'http://localhost:8000'



export function useDiplomaService() {
  const {getToken} = useAuth();

  async function getAll(): Promise<z.infer<typeof diplomaSchemaOut>[]> {
    const token = await getToken({})
    const response = await fetch(`${API_BASE}/diplomas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  }

  async function create(diploma: z.infer<typeof diplomaSchemaCreate>) {
    const token = await getToken()
    const formData = new FormData()
    formData.append("student_id", diploma.student_id.toString())
    formData.append("title", diploma.title)
    formData.append("institution", diploma.institution)
    formData.append("issue_date", diploma.issue_date)

    if (diploma.file) {
      formData.append("file", diploma.file)
    }
    
    const response = await fetch(`${API_BASE}/diplomas`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
   
    return response.json()
  }

  async function deleteById(id: number) {
    const token = await getToken()
    await fetch(`${API_BASE}/diplomas/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  async function getOne(id: number): Promise<z.infer<typeof diplomaSchemaOut>> {
    const token = await getToken()
    const response = await fetch(`${API_BASE}/diplomas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  }

  return { getAll, create, deleteById , getOne}
}