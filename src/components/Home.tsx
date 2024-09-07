import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserView.css';

const Home = () => {

    type User = {
        email: string
        id: number
        name: string
        phone: string
    }

    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
            setIsLoaded(true);
        }
        fetchData();
    }, []);

    return (
        <div className='h-full py-4 flex flex-col items-center'>
            {users.length === 0 && isLoaded ? <></> :
                <h1 className='font-bold text-2xl text-slate-900 md:text-3xl py-8'> 
                    Users List 
                </h1>
            }
            <ul className='md:px-12 px-4 py-4 flex justify-evenly flex-wrap gap-8'>
                {users.length !== 0 && isLoaded ?
                    users.map((user : User, index) => (
                        <li key={index} className='p-8 md:w-[28em] w-[18em] rounded-lg active:bg-neutral-100 hover:shadow-[0px_0px_5px_2px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-transform transition-200 shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]'>
                                <Link to={`/user-view/${user.id}`}>
                                    <ul className='flex flex-col gap-2'>
                                        <li className='font-bold text-2xl text-slate-900 md:text-3xl py-2'> 
                                            {user.name}
                                        </li>
                                        <li className='sm:text-lg md:text-xl'> 
                                            <i className='fas fa-envelope pr-2'></i>
                                            {user.email} 
                                        </li>
                                        <li className='sm:text-lg md:text-xl'> 
                                            <i className='fas fa-phone pr-2'></i>
                                            {user.phone} 
                                        </li>
                                    </ul>
                                </Link>
                        </li>
                    ))
                    :
                    users.length === 0 && isLoaded ? 
                        <div className="h-screen w-full text-center content-center pb-32 text-3xl font-bold">
                            No Users found
                        </div>
                        :
                        Array.from(Array(10).keys()).map((val: number, index) => (
                            <li key={index} className='p-8 w-[28em] rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]'>
                                <div className='ph-item'>
                                    <div className='ph-col-12 h-full'>
                                        <div className="ph-row">
                                            <div className="ph-col-6 big"></div>
                                            <div className="ph-col-4 empty big"></div>
                                            <div className="ph-col-2 empty big"></div>
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-8 empty"></div>
                                            <div className="ph-col-6"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-12"></div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                }
            </ul>
        </div>
    )
};

export default Home;