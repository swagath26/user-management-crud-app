import axios from "axios";

const handleDelete = async (id: number) => {
    try { 
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        console.log(response);

        if(response.status === 200) {
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
}

export default handleDelete;