import { FlatUserFormData } from "src/types/Types";
import { handleInputChange } from "../../../utils/FormUtils";
import React from "react";

interface TextInputFieldProps {
    label: string,
    autoFocus?: boolean,
    field: string, 
    placeholder: string,
    formData: FlatUserFormData,
    updateFormData: (newData: FlatUserFormData) => void,
    isValidated: boolean
}

const TextInputField: React.FC<TextInputFieldProps> = ({ label, autoFocus=false, field, placeholder, formData, updateFormData, isValidated }) => {

    const fieldValue = formData[field as keyof FlatUserFormData] || '';

    function isFieldValueValid(fieldValue: string) {
        const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9#]+\/?)*$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const zipcodePattern = /^\d{6}$/;
        if(field === 'email')
            return emailPattern.test(fieldValue);
        else if(field === 'address_zipcode')
            return zipcodePattern.test(fieldValue);
        else if(field === 'website')
            return urlPattern.test(fieldValue);
        else
            return fieldValue ? true : false;
    }
      

    return (
        <div className='flex flex-col gap-1 relative'>
            <label
                htmlFor={`${field}_input`}
                className='font-medium text-slate-700 pl-1'
            >{label}</label>
            <input
                autoFocus={autoFocus}
                className={`px-4 pt-2 pb-3 border border-solid rounded-lg
                    ${isValidated && !isFieldValueValid(fieldValue) ? 
                        `border-red-600 focus-visible:outline-red-600` 
                        : `border-neutral-300 focus-visible:outline-blue-800`}
                    `}
                id={`${field}_input`}
                name={field}
                value={fieldValue}
                placeholder={placeholder}
                type="text"
                onChange={(event) => handleInputChange(event, formData, updateFormData)}
                required
            />
            {isValidated && !isFieldValueValid(fieldValue) &&
                <div className='absolute text-red-600 top-0 right-0 font-medium pr-1'>
                    Invalid {label}
                </div>
            }
        </div>
    )
};

export default TextInputField;