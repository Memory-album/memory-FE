import { useState } from 'react';

interface InputFieldProps {
  type: string;
  id: string;
  placeholder: string;
  minLength?: number;
  errorMessage?: string;
  action: string;
  method: string;
  value?: string;
  Inputwidth?: string;
  errorMessageMarginTop?: string;
  errorMessageSize?: string;
  InputTextSize?: string;
  InputLineHeight?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const FormInput = ({
  type,
  id,
  placeholder,
  minLength,
  errorMessage,
  action,
  method,
  value,
  Inputwidth = '315px',
  errorMessageMarginTop = '8px',
  errorMessageSize = '14px',
  InputTextSize = '20px',
  InputLineHeight = '36px',
  onChange,
  disabled = false,
}: InputFieldProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form action={action} method={method} onSubmit={handleSubmit}>
      <label htmlFor={id}>
        <div
          className="text-[20px] font-semibold relative group"
          style={{ width: Inputwidth, fontSize: InputTextSize }}
        >
          <input
            className="border-b-[1px] border-[#5F5F5F] pl-[2px] leading-9 placeholder:text-[#C2C2C2] focus:outline-none peer main-bg"
            type={type}
            id={id}
            placeholder={placeholder}
            minLength={minLength}
            value={value}
            onChange={onChange}
            required
            style={{ lineHeight: InputLineHeight, width: Inputwidth }}
            disabled={disabled}
          />
          <span className="block absolute bottom-[27px] left-0 bg-[#8FB6FF] w-0 h-[2px] transition-all duration-500 group-focus-within:w-full"></span>
          <p
            className="mt-2 invisible peer-focus:peer-invalid:visible peer-placeholder-shown:invisible text-pink-600 text-sm"
            style={{
              marginTop: errorMessageMarginTop,
              fontSize: errorMessageSize,
            }}
          >
            {errorMessage}
          </p>
        </div>
      </label>
    </form>
  );
};

export default FormInput;
