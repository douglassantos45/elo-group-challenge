import { z } from 'zod';

export const registrationSchema = z.object({
  username: z.string().min(1, { message: 'Informe o valor do username' }),
  password: z.string({ required_error: 'O valor da senha não foi informado' }).min(1, { message: 'Informe o valor da senha' }),
  passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "As senhas não conferem",
  path: ["passwordConfirmation"],
});
