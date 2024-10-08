import axios from "axios";
import { FlatUserFormData, User } from "../types/Types";

const handleSubmitForm = async (formData: FlatUserFormData, submitType: string) => {
    const data: User = {
        address: {
          city: formData.address_city,
          street: formData.address_street,
          suite: formData.address_suite,
          zipcode: formData.address_zipcode,
          geo: {
            lat: formData.address_geo_lat,
            lng: formData.address_geo_lng
          }
        },
        company: {
          bs: formData.company_bs,
          catchPhrase: formData.company_catchPhrase,
          name: formData.company_name
        },
        email: formData.email,
        id: submitType === 'post' ? 11 : parseFloat(submitType),
        name: formData.name,
        phone: formData.phone,
        username: formData.username,
        website: formData.website
    };
    try { 
        const response = 
            submitType === 'post' ? 
                await axios.post('https://jsonplaceholder.typicode.com/users/', data) :
                await axios.put(`https://jsonplaceholder.typicode.com/users/${data.id}`, data);
        console.log(response);

        if(response.status=== (submitType === 'post' ? 201 : 200)) {
            return {
                success: true,
                data: response.data
            };
        }
        else {
            window.alert('An unexpected error caused..');
            return {
                success: false
            }
        }
    }
    catch (error: unknown) {
        let errorMessage = 'An error occured..';
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(error.response.data);
                Object.entries(error.response.data).forEach(([key, value]) => {
                    console.log(`\n${key}: ${value}`);
                    if (key === 'detail') errorMessage += `\n${value}`;
                    else errorMessage += `\n${key} is invalid`;
                })
            } 
            else {
                console.log(error.message);
                errorMessage += `\n${(error as Error).message}`;
            }
        }
        else {
            console.log((error as Error).message);
            errorMessage += `\n${(error as Error).message}`;
        }
        console.log(error);
        window.alert(errorMessage);
        return {
            success: false
        }
    }
};

export default handleSubmitForm;