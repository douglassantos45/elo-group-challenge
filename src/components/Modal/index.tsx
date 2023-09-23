import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import { Checkbox as AntdCheckbox } from 'antd';
import { FiX } from 'react-icons/fi';

import { normalizePhone } from '../../utils/normalizePhone';
import { useTheme } from '../../hooks/useTheme';
import { useModal } from '../../hooks/useModal';
import Input from '../Input';

import EloGroupImg from '../../assets/logo-elogroup.png';
import './styles.scss';
import { userLeadsContext } from '../../contexts/userLeads';
import { toast } from 'react-hot-toast';

export const Modal = () => {
  const { theme } = useTheme();
  const { isOpen, close } = useModal();
  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();
  const [checkAll, setCheckAll] = useState(false);
  const [isCheckedEmpty, setIsCheckedEmpty] = useState(false);
  const { saveUserLeads } = userLeadsContext();

  const verifyCheckbox = (checkbox: any) => {
    for (let key in checkbox) {
      if (checkbox[key]) return true;
    }
    setIsCheckedEmpty(true);
    return false;
  };

  const onSubmit = (data: any) => {
    delete data.all;
    const checkbox = checkAll
      ? {
          rpa: true,
          produto_digital: true,
          analytics: true,
          bpm: true,
        }
      : {
          rpa: data.rpa ?? false,
          produto_digital: data.produto_digital ?? false,
          analytics: data.analytics ?? false,
          bpm: data.bpm ?? false,
        };
    const isValid = verifyCheckbox(checkbox);
    if (!isValid) return;
    saveUserLeads({
      username: data.username,
      phone: data.phone,
      email: data.email,
      opportunities: checkbox,
    });
    toast.success('Lead cadastrada com sucesso');
    setTimeout(() => {
      close();
    }, 700);
  };

  useEffect(() => {
    reset();
    clearErrors();
    setCheckAll(false);
  }, [isOpen]);

  const inputPhone = watch('phone');
  useEffect(() => {
    if (!inputPhone) return;
    setValue('phone', normalizePhone(inputPhone));
  }, [inputPhone]);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal
        tabIndex={0}
        className={`${theme}`}
        style={{ pointerEvents: 'auto' }}
      >
        <Dialog.Overlay
          className="DialogOverlay"
          style={{ pointerEvents: 'auto' }}
          onClick={close}
        />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogHeader">
            <img src={EloGroupImg} />
            Novo Lead
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="content">
              <section className="left">
                <Input
                  label="Nome do usuário"
                  {...register('username', {
                    required: 'Informe o nome do usuário',
                  })}
                  errors={errors.username}
                  isRequired
                />
                <Input
                  label="Telefone"
                  type="phone"
                  {...register('phone', {
                    required: 'Informe o número do telefone',
                  })}
                  errors={errors.phone}
                  isRequired
                />
                <Input
                  label="E-mail"
                  type="email"
                  {...register('email', {
                    required: 'Informe o e-mail',
                    pattern: {
                      value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                      message: 'Informe um e-mail válido',
                    },
                  })}
                  errors={errors.email}
                  isRequired
                />
              </section>
              <section className="right">
                <label>
                  <Controller
                    control={control}
                    name="all"
                    render={({ field: { value, onChange } }) => (
                      <AntdCheckbox
                        checked={value}
                        onChange={(e) => {
                          setCheckAll(!checkAll);
                          setIsCheckedEmpty(false);
                          onChange(e.target.checked);
                        }}
                      />
                    )}
                  />{' '}
                  Todos
                </label>

                <label>
                  <Controller
                    control={control}
                    name="rpa"
                    render={({ field: { value, onChange } }) => (
                      <AntdCheckbox
                        checked={checkAll ? true : value}
                        onChange={(e) => {
                          setIsCheckedEmpty(false);
                          onChange(e.target.checked);
                        }}
                      />
                    )}
                  />{' '}
                  RPA
                </label>

                <label>
                  <Controller
                    control={control}
                    name="analytics"
                    render={({ field: { value, onChange } }) => (
                      <AntdCheckbox
                        checked={checkAll ? true : value}
                        onChange={(e) => {
                          setIsCheckedEmpty(false);
                          onChange(e.target.checked);
                        }}
                      />
                    )}
                  />{' '}
                  Analytics
                </label>

                <label>
                  <Controller
                    control={control}
                    name="produto_digital"
                    render={({ field: { value, onChange } }) => (
                      <AntdCheckbox
                        checked={checkAll ? true : value}
                        onChange={(e) => {
                          setIsCheckedEmpty(false);
                          onChange(e.target.checked);
                        }}
                      />
                    )}
                  />{' '}
                  Produto Digital
                </label>

                <label>
                  <Controller
                    control={control}
                    name="bpm"
                    render={({ field: { value, onChange } }) => (
                      <AntdCheckbox
                        checked={checkAll ? true : value}
                        onChange={(e) => {
                          setIsCheckedEmpty(false);
                          onChange(e.target.checked);
                        }}
                      />
                    )}
                  />{' '}
                  BPM
                </label>
                {isCheckedEmpty && (
                  <p className="">Selecione umas das opções acima</p>
                )}
              </section>
            </div>
            <button>Salvar</button>
          </form>

          <Dialog.Close asChild>
            <button
              tabIndex={0}
              className="IconButton"
              aria-label="Close"
              onClick={close}
            >
              <FiX size={24} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
