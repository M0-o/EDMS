import type z from "zod"
import { diplomaSchemaOut, diplomaSchemaCreate } from "@/schemas/diplomaSchemas"
import { useAuth} from "@clerk/clerk-react"
import { diplomaStatusCreateSchema } from "@/schemas/diplomaStatusSchemas"
import { batchDiplomaStatusCreateSchema } from "@/schemas/diplomaStatusSchemas"

const API_BASE = 'http://192.168.1.64:8000'



export function useDiplomaService() {
  const {getToken} = useAuth();

  async function getAll(): Promise<z.infer<typeof diplomaSchemaOut>[]> {
    const token = await getToken({})
    const response = await fetch(`${API_BASE}/diplomas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
   const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  async function create(diploma: z.infer<typeof diplomaSchemaCreate>) {
    const token = await getToken()
    const formData = new FormData()
    formData.append("cne", diploma.cne)
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
   
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  async function deleteById(id: number) {
    const token = await getToken()
    const response = await fetch(`${API_BASE}/diplomas/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  async function getOne(id: number): Promise<z.infer<typeof diplomaSchemaOut>> {
    const token = await getToken()
    const response = await fetch(`${API_BASE}/diplomas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  async function updateStatus(newStatus: z.infer<typeof diplomaStatusCreateSchema>) {
    const token = await getToken()
    const response = await fetch(`${API_BASE}/diploma_status/${newStatus.diploma_id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStatus),
    })
    
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }
  
  async function batchUpdateStatus(newStatus: z.infer<typeof batchDiplomaStatusCreateSchema>) {
    const token = await getToken()
    const response = await fetch(`${API_BASE}/diploma_status/batch`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStatus),
    })
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  async function getByStatus(status: string): Promise<z.infer<typeof diplomaSchemaOut>[]> {
    const token = await getToken()
    const response = await fetch(`${API_BASE}/diplomas/status/${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  return { getAll, create, deleteById , getOne, updateStatus, getByStatus , batchUpdateStatus }
}