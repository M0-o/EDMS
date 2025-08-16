import { z } from "zod";



export const diplomaStatusCreateSchema = z.object({
    status: z.string(),
    reason: z.string().optional().nullable(), 
    notes: z.string().optional().nullable(),  
    diploma_id: z.number().int(),
});

export const batchDiplomaStatusCreateSchema = z.object({
    status: z.string(),
    reason: z.string().optional().nullable(), 
    notes: z.string().optional().nullable(),  
    diploma_ids: z.array(z.number().int()),
});

export const diplomaStatusOutSchema = diplomaStatusCreateSchema.extend({
    id: z.number().int(),
    changed_by_clerk_user_id: z.string(),
    date: z.string(), 
});

