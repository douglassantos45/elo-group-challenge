import bcrypt from 'bcryptjs';

export const compareHashedPassword = async (
  currentPassword: string,
  passwordHashed: string
) => await bcrypt.compare(currentPassword, passwordHashed);
