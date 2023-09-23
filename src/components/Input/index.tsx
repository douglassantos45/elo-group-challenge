import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  memo,
} from 'react';

import './style.scss';
import { useTheme } from '../../hooks/useTheme';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  value?: string;
  disabled?: boolean;
  errors?: any;
  isRequired?: boolean;
  fieldError?: string;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    label,
    style = '',
    disabled,
    value,
    errors,
    isRequired,
    fieldError,
    ...rest
  },
  ref
) => {
  const { theme } = useTheme();
  return (
    <label className={`input-wrapper ${theme} ${errors ? 'field-error' : ''}`}>
      <span>
        {label}
        {isRequired && <b> *</b>}
      </span>
      <div>
        <input
          type="text"
          name={name}
          id={name}
          ref={ref}
          {...rest}
          defaultValue={value}
          disabled={disabled}
        />
        {errors && <p>{errors?.message}</p>}
      </div>
    </label>
  );
};

const Input = forwardRef(InputBase);

export default memo(Input);
