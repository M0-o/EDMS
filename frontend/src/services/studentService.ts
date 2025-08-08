import {studentSchemaOut , studentSchemaCreate} from "@/schemas/studentSchemas"
import type z from "zod"
import { useAuth } from "@clerk/clerk-react"

const API_BASE = 'http://localhost:8000'

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
    return response.json()
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
    return response.json()
  }

  async function deleteById(id : number) {
    const token = await getToken()
    await fetch(`${API_BASE}/students/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
  }

  async function getOne(id : number): Promise<z.infer<typeof studentSchemaOut>> {
    const token = await getToken()
    const response = await fetch(`${API_BASE}/students/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.json()
  }

  return {getAll , create , deleteById , getOne}
}

