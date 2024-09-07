import { useContext, useEffect, useState } from "react"
import { ListContext } from "src/context/listContext"
import UserView from "./UserView";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User } from "src/types/Types";
import success from '../assets/img/success.png';

const UserViewWrapper = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showUpdated, setShowUpdated] = useState(false);
    const context = useContext(ListContext);
    const params = useParams();

    const fetchData = async () => {
        try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${user_id}`);
            setUser(response.data);
            setIsLoaded(true);
        }
        catch(error) {
            setUser(null);
            setIsLoaded(true);
        }
    }
    const user_id = params.id || '' ;

    useEffect(() => {
        if(context?.data?.id === parseFloat(user_id)) {
            setUser(context.data);
            user_id === '11' ? setShowSuccess(true) : setShowUpdated(true);
            setIsLoaded(true);
        }
        else if(user_id !== '') {
            fetchData();
        }
        else {
            setUser(null);
            setIsLoaded(true);
        }
    }, []);

    return user || !isLoaded ? 
        <>
            {showSuccess || showUpdated ? 
                <div className="flex gap-4 pt-8 pb-20 flex-col items-center justify-center">
                    <img className='m-4 p-4' src={success} width='150' height='150' />
                    <h1 className='text-3xl font-medium text-slate-900'>Thank You</h1>
                    <p className='text-slate-500 text-lg'>User info is successfully {showSuccess ? 'listed' : 'updated'}..</p>
                </div> :
                <></>
            }
            <UserView userProp={user} />
        </> : 
        <div className="h-screen w-full text-center content-center pb-20 text-3xl font-bold">
            No User found
        </div>
}

export default UserViewWrapper;