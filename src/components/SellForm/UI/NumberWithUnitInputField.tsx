import { FlatUserFormData } from "src/types/Types";
import { handleInputChange } from "../../../utils/FormUtils";
import React from "react";

interface NumberWithUnitInputFieldProps {
        label: string,
        field: string, 
        unit: string,
        required: boolean,
        placeholder: string,
        formData: FlatUserFormData,
        updateFormData: (newData: FlatUserFormData) => void,
        isValidated: boolean
}

const NumberWithUnitInputField: React.FC<NumberWithUnitInputFieldProps> = ({ label, field, unit, placeholder, required=false, formData, updateFormData, isValidated=false }) => {
    
    const fieldValue = formData[field as keyof FlatUserFormData] || '';

    const isFieldValueValid = (fieldValue: string) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(fieldValue);
    }

    return (
        <div className='flex flex-col content-center relative'>
            <label 
                htmlFor={`${field}_input`}
                className='font-medium text-slate-700 py-2 pb-4'
            >{label}</label>

            {isValidated && !isFieldValueValid(fieldValue) && 
                <div className='absolute text-red-600 top-4 right-0 font-medium pr-1'>
                    Invalid Phone Number
                </div>
            }

            <div className='flex'>
                <span className='h-full bg-slate-300 px-4 py-2 pb-3  
                    font-medium text-slate-600 rounded-tl-lg rounded-bl-lg'>
                    {unit}
                </span>
                <input
                    className={`px-4 pt-2 pb-3 border border-solid rounded-tr-lg rounded-br-lg max-w-[75%]
                        ${isValidated && !isFieldValueValid(fieldValue) ? 
                            `border-red-600 focus-visible:outline-red-600` 
                            : `border-neutral-300 focus-visible:outline-blue-800`}
                        `}
                    id={`${field}_input`}
                    name={field}
                    placeholder={placeholder}
                    value={fieldValue}
                    type="tel"
                    pattern="\d{10}"
                    required={required}
                    onChange={(event) => handleInputChange(event, formData, updateFormData)}
                />
            </div>
        </div>
    )
};

export default NumberWithUnitInputField;