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
}: InputFieldProps) => {
  return (
    <form action={action} method={method}>
      <label htmlFor={id}>
        <div className="w-[315px] text-[20px] font-semibold relative group">
          <input
            className="w-[315px] border-b-[1px] border-[#5F5F5F] pl-[2px] leading-9 placeholder:text-[#C2C2C2] focus:outline-none peer"
            type={type}
            id={id}
            placeholder={placeholder}
            minLength={minLength}
            value={value}
            required
          />
          <span className="block absolute bottom-[27px] left-0 bg-[#8FB6FF] w-0 h-[2px] transition-all duration-500 group-focus-within:w-full"></span>
          <p className="mt-2 invisible peer-focus:peer-invalid:visible peer-placeholder-shown:invisible text-pink-600 text-sm">
            {errorMessage}
          </p>
        </div>
      </label>
    </form>
  );
};

export default FormInput;
