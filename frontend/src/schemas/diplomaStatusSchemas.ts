import { z } from "zod";



export const diplomaStatusBaseSchema = z.object({
    status: z.string(),
    reason: z.string().optional().nullable(), 
    notes: z.string().optional().nullable(),  
});



export const diplomaStatusOutSchema = diplomaStatusBaseSchema.extend({
    id: z.number().int(),
    diploma_id: z.number().int(),
    changed_by_clerk_user_id: z.string(),
    date: z.string(), 
});

