import {studentSchemaOut , studentSchemaCreate} from "@/schemas/studentSchemas"
import type z from "zod"
const API_BASE = 'http://localhost:8000'

export const studentsService = {
  async getAll() : Promise<z.infer<typeof studentSchemaOut>[]>  {
    const response = await fetch(`${API_BASE}/students`)
    return response.json()
  },

  async create(student : z.infer< typeof studentSchemaCreate>) {
    const response = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })
    return response.json()
  },

  async delete(id : number) {
    await fetch(`${API_BASE}/students/${id}`, { method: 'DELETE' })
  },
}

