import React, { FormEvent } from "react";
import { FlatUserFormData } from "../types/Types";

export const handleInputChange = (
    event: FormEvent<HTMLInputElement>, 
    formData: FlatUserFormData, 
    updateFormData: (newData: FlatUserFormData) => void
): void => {
    const { name, value } = event.currentTarget;
    updateFormData({ ...formData, [name]: value });
};