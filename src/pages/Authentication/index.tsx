import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useMatch, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { z } from 'zod';

import { getLocalStorage, saveLocalStorage } from '../../utils/local-storage';
import { registrationSchema } from './schemas/registration-schema';
import { sigInSchema } from './schemas/sign-in-schema';
import { useTheme } from '../../hooks/useTheme';
import { Registration } from './Registration';
import { SignIn } from './SignIn';

import './style.scss';
import EloLogo from '../../assets/logo-elogroup.png';
import { generateHashedPassword } from '../../utils/generate-hashed-password';
import { compareHashedPassword } from '../../utils/compare-hashed-password';

export type RegistrationZodSchema = z.infer<typeof registrationSchema>;
export type SignInZodSchema = z.infer<typeof sigInSchema>;

export const Authentication = () => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const routerMatch = useMatch('/registration');
  const navigate = useNavigate();

  const token = getLocalStorage('@elo-group:token');

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(routerMatch ? registrationSchema : sigInSchema),
  });

  const handleShowPassword = (value?: boolean | null) => {
    setShowPassword(value ?? !showPassword);
  };

  const handleShowPasswordConfirmation = (value?: boolean) => {
    setShowPasswordConfirmation(value ?? !showPasswordConfirmation);
  };

  const registrationSubmit = async (data: RegistrationZodSchema) => {
    const registration = {
      username: data.username,
      password: await generateHashedPassword(data.password),
    };
    saveLocalStorage('@elo-group:registration', registration);
  };

  const singInVerification = async (data: any) => {
    const singInVerificationResponseError = () => {
      setTimeout(() => {
        setIsLoading(false);
        setFocus('username', {});
        setError('username', {});
        setError('password', {});
        toast.error('Usuário ou senha inválidos');
      }, 2000);
    };
    const credentials = getLocalStorage('@elo-group:registration') ?? {};
    const isPasswordMatch = await compareHashedPassword(
      data?.password,
      credentials?.password
    );
    if (!isPasswordMatch) return singInVerificationResponseError();
    if (data?.username !== credentials?.username)
      return singInVerificationResponseError();
    setTimeout(() => {
      setIsLoading(false);
      saveLocalStorage('@elo-group:token', crypto?.randomUUID());
      return navigate('/');
    }, 2000);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    setIsLoading(true);
    if (!routerMatch) return singInVerification(data);
    registrationSubmit(data);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Cadastro efetuado com sucesso!');
      return navigate('/login');
    }, 2000);
  };

  const resetAllStates = () => {
    handleShowPassword(false);
    handleShowPasswordConfirmation(false);
    clearErrors();
    reset();
  };

  if (token) return <Navigate to="/" replace />;

  return (
    <div className="auth">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`auth-form ${theme}`}
        action=""
      >
        <img src={EloLogo} />
        {routerMatch ? (
          <Registration
            props={{
              showPassword,
              handleShowPassword,
              showPasswordConfirmation,
              handleShowPasswordConfirmation,
              isLoading,
              resetAllStates,
            }}
            zod={{
              register,
              errors,
            }}
          />
        ) : (
          <SignIn
            props={{
              showPassword,
              handleShowPassword,
              isLoading,
              resetAllStates,
            }}
            zod={{
              register,
              errors,
            }}
          />
        )}
      </form>
    </div>
  );
};
