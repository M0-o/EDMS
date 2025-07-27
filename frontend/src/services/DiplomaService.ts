import type z from "zod"
import { diplomaSchemaOut, diplomaSchemaCreate } from "@/schemas/diplomaSchemas"
const API_BASE = 'http://localhost:8000'

export const diplomaService = {
  async getAll(): Promise<z.infer<typeof diplomaSchemaOut>[]> {
    const response = await fetch(`${API_BASE}/diplomas`)
    return response.json()
  },

  async create(diploma: z.infer<typeof diplomaSchemaCreate>) {
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
    })
    return response.json()
  },

  async delete(id: number) {
    await fetch(`${API_BASE}/diplomas/${id}`, { method: 'DELETE' })
  },
}