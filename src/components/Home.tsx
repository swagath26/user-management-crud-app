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

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        }
        fetchData();
    }, []);

    return (
        <div className='h-full py-4 flex flex-col items-center'>
            <h1 className='font-bold text-2xl text-slate-900 md:text-3xl py-8'> 
                Users List 
            </h1>
            <ul className='px-12 py-4 flex justify-evenly flex-wrap gap-8'>
                {
                    users.map((user : User, index) => (
                        <li key={index} className='p-8 w-[28em] rounded-lg active:bg-neutral-100 hover:shadow-[0px_0px_5px_2px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-transform transition-200 shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]'>
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
                }
            </ul>
        </div>
    )
};

export default Home;