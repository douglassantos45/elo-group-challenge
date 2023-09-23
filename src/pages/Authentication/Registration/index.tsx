import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useEffect } from 'react';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Input from '../../../components/Input';
import { Link } from 'react-router-dom';
import { RegistrationZodSchema } from '..';

import Loading from '../../../assets/spin-loading.svg';

type RegistrationProps = {
  showPassword: boolean;
  handleShowPassword(value?: boolean): void;
  showPasswordConfirmation: boolean;
  handleShowPasswordConfirmation(value?: boolean): void;
  isLoading?: boolean;
  resetAllStates(): void;
};

type ZodResolverProps = {
  register: UseFormRegister<RegistrationZodSchema>;
  errors: FieldErrors<RegistrationZodSchema>;
};

type RegistrationDataProps = {
  props: RegistrationProps;
  zod: ZodResolverProps;
};

export const Registration = ({ props, zod }: RegistrationDataProps) => {
  const {
    showPassword,
    handleShowPassword,
    showPasswordConfirmation,
    handleShowPasswordConfirmation,
    isLoading,
    resetAllStates,
  } = props;

  useEffect(() => {
    resetAllStates();
  }, []);

  return (
    <>
      <div className={`input-form`}>
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

        <div className="input-icon">
          <Input
            placeholder="Confirme a senha"
            label="Confirmar senha"
            type={showPasswordConfirmation ? 'text' : 'password'}
            {...zod.register('passwordConfirmation')}
            errors={zod.errors.passwordConfirmation}
          />
          <div className="icon-wrapper">
            {showPasswordConfirmation ? (
              <AiFillEye
                size={20}
                onClick={() => handleShowPasswordConfirmation()}
              />
            ) : (
              <AiFillEyeInvisible
                size={20}
                onClick={() => handleShowPasswordConfirmation()}
              />
            )}
          </div>
        </div>
      </div>

      <div className="button-group">
        <button disabled={isLoading}>
          {isLoading ? (
            <img src={Loading} alt="" className="w-6" />
          ) : (
            'Cadastrar'
          )}
        </button>
        <div>
          <span className="text-xs text-slate-500">
            Já possui cadastro? <Link to="/login"> Fazer o login</Link>
          </span>
        </div>
      </div>
    </>
  );
};
