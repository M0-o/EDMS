import {studentSchemaOut , studentSchemaCreate} from "@/schemas/studentSchemas"
import type z from "zod"
import { useAuth } from "@clerk/clerk-react"

const API_BASE = 'http://192.168.1.58:8000'


export function useStudentService() {
  const { getToken } = useAuth()

  async function getAll() : Promise<z.infer<typeof studentSchemaOut>[]>  {
 
    const token = await getToken()
    const response = await fetch(`${API_BASE}/students`,{
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  async function create(student : z.infer< typeof studentSchemaCreate>) {
 
    const token = await getToken()
    const response = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(student),
    })
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  async function deleteById(id : number) {
    const token = await getToken()
    const response = await fetch(`${API_BASE}/students/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  async function getOne(id : number): Promise<z.infer<typeof studentSchemaOut>> {
    const token = await getToken()
    const response = await fetch(`${API_BASE}/students/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  async function getOneMinimal(id : number) {
    const token = await getToken()
    const response = await fetch(`${API_BASE}/students/${id}/minimal`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
    const strResponse = await response.json()
    strResponse.status = response.status
    return strResponse
  }

  return {getAll , create , deleteById , getOne , getOneMinimal}
}

