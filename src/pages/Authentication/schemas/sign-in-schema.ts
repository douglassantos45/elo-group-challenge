import { z } from 'zod';

export const sigInSchema = z.object({
  username: z.string().min(1, { message: 'Informe o valor do username' }),
  password: z.string({ required_error: 'O valor da senha não foi informado' }).min(1, { message: 'Informe o valor da senha' }),
})
