import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Input from '../../../components/Input';
import { Link } from 'react-router-dom';
import { SignInZodSchema } from '..';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Loading from '../../../assets/spin-loading.svg';

type SingInProps = {
  showPassword: boolean;
  handleShowPassword(value?: boolean): void;
  isLoading?: boolean;
  resetAllStates(): void;
};

type ZodResolverProps = {
  register: UseFormRegister<SignInZodSchema>;
  errors: FieldErrors<SignInZodSchema>;
};

type SingInDataProps = {
  props: SingInProps;
  zod: ZodResolverProps;
};

export const SignIn = ({ props, zod }: SingInDataProps) => {
  const { showPassword, handleShowPassword, isLoading, resetAllStates } = props;

  useEffect(() => {
    resetAllStates();
  }, []);
  return (
    <>
      <div className="input-form">
        <Input
          placeholder="Informe seu nome"
          label="Nome"
          {...zod.register('username')}
          errors={zod.errors.username}
        />
        <div className="input-icon">
          <Input
            placeholder="Informe sua senha"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            {...zod.register('password')}
            errors={zod.errors.password}
          />
          <div className="icon-wrapper">
            {showPassword ? (
              <AiFillEye size={20} onClick={() => handleShowPassword()} />
            ) : (
              <AiFillEyeInvisible
                size={20}
                onClick={() => handleShowPassword()}
              />
            )}
          </div>
        </div>
      </div>

      <div className="button-group">
        <button disabled={isLoading}>
          {isLoading ? <img src={Loading} alt="" className="w-6" /> : 'Entrar'}
        </button>
        <div>
          <span>
            Ainda não fez o cadastro?{' '}
            <Link to="/registration">Fazer o cadastro</Link>
          </span>
        </div>
      </div>
    </>
  );
};
