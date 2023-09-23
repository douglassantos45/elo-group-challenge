import * as CheckboxUI from '@radix-ui/react-checkbox';
import './styles.scss';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

export const CheckboxBase: ForwardRefRenderFunction<HTMLInputElement, any> = (
  { name, label, value, errors, isRequired, fieldError, ...rest },
  ref
) => (
  <div style={{ display: 'flex', alignItems: 'center' }} {...rest}>
    <CheckboxUI.Root className="CheckboxRoot" defaultChecked={true} id="c1">
      <CheckboxUI.Indicator className="CheckboxIndicator" ref={ref}>
        x
      </CheckboxUI.Indicator>
    </CheckboxUI.Root>
    <label className="Label" htmlFor="c1">
      Accept terms and conditions.
    </label>
    {errors && errors.message}
  </div>
);

const CheckBox = forwardRef(CheckboxBase);

export default memo(CheckBox);
