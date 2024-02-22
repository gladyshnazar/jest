import { InputHTMLAttributes, forwardRef } from "react";

type FormInputPropTypes = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  error: string | null;
};

const FormInput = forwardRef<HTMLInputElement, FormInputPropTypes>(
  ({ label, error, name, ...rest }, ref) => {
    return (
      <div className='form-input'>
        <label htmlFor={name} className='form-input-label'>
          {label}
        </label>
        <input
          name={name}
          id={name}
          className='form-input-field'
          {...rest}
          ref={ref}
        />
        <div className='form-input-error'>{error}</div>
      </div>
    );
  }
);

export default FormInput;
