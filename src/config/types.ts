import z, { email } from "zod"
export const addUserSchema=z.object({
    name: z.string(),
    email: z.string().email(),
    position: z.string(),
    salary: z.coerce.number()
})