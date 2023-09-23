import bcrypt from 'bcryptjs';

export const generateHashedPassword = async (
  password: string,
  saltRounds?: number
) => {
  const salt = await bcrypt.genSalt(saltRounds ?? 10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
