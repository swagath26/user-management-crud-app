import React, { useEffect, useRef, useState } from "react"
import initMap from "src/utils/initMap"
import './UserView.css'

type Geo = {
    lat: string
    lng: string
}

type Address = {
    city: string
    geo: Geo
    street: string
    suite: string
    zipcode: string
}

type Company = {
    bs: string
    catchPhrase: string
    name: string
}

type User = {
    address: Address
    company: Company
    email: string
    id: number
    name: string
    phone: string
    username: string
    website: string
}

interface UserViewProps {
    userProp: User | null
}

const UserView:React.FC<UserViewProps> = ({userProp}) => {
    const [user, setUser] = useState<User | null>(userProp);

    useEffect(() => {
        setUser(userProp);
    }, [userProp]);

    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const defaultZoom: number = 3;

    useEffect(() => {
        if(user) {
            if(mapContainerRef.current && !mapRef.current) {
                mapRef.current = initMap(mapContainerRef.current, [parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng)], defaultZoom);
            }
            if(mapRef.current && !markerRef.current) {
                markerRef.current = window.L.marker(
                    [parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng)]
                ).addTo(mapRef.current);
            }
        }
    }, [user]);

    return (
        <div className='h-full p-4 flex justify-center w-full'>
                <div className='p-8 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)] w-full md:w-3/4 lg:w-full xl:w-3/4'>
                {user? (
                    <ul className='flex flex-col items-center gap-2 w-full h-full'>

                        <h1 className='font-bold text-2xl text-slate-900 md:text-3xl py-8 lg:py-12'> 
                            {user.name} 
                        </h1>
                        
                        <div className="flex lg:flex-row flex-col justify-center gap-8 lg:gap-20 w-full h-full">
                            <div className="px-4">
                                <div className="py-4 flex flex-col gap-3 w-full">
                                    <h2 className='font-bold text-xl text-slate-900 md:text-2xl py-3'>
                                        Basic Info
                                    </h2>
                                    <li className='sm:text-md font-medium md:text-lg'> 
                                        <i className='fas fa-envelope pr-2'></i>
                                        {user.email} 
                                    </li>
                                    <li className='sm:text-lg font-medium md:text-xl'> 
                                        <i className='fas fa-phone pr-2'></i>
                                        {user.phone} 
                                    </li>
                                    <li className='sm:text-lg font-medium md:text-xl'> 
                                        <i className='fas fa-user pr-2'></i>
                                        {user.username} 
                                    </li>
                                    <li className='sm:text-lg font-medium md:text-xl cursor-pointer w-fit' onClick={() => {
                                        const formattedURL = user.website.startsWith('http://') || user.website.startsWith('https://')
                                        ? user.website
                                        : `https://${user.website}`;
                                        window.open(formattedURL, '_blank');
                                    }}> 
                                        <i className='fas fa-globe pr-2'></i>
                                        {user.website} 
                                    </li>
                                </div>

                                <div className="py-4 w-full">
                                    <h2 className='font-bold text-xl text-slate-900 md:text-2xl py-3'>
                                        Address
                                    </h2>

                                    <ul className="flex flex-col gap-2">
                                        <li className='sm:text-md font-medium md:text-lg'> {user.address.suite}, {user.address.street}, {user.address.city} </li>
                                        <li className='sm:text-md font-medium md:text-lg'> PIN: {user.address.zipcode} </li>
                                    </ul>
                                </div>

                                <div className="py-4 w-full">
                                    <h2 className='font-bold text-xl text-slate-900 md:text-2xl py-3'>
                                        Company Info
                                    </h2>

                                    <ul className="flex flex-col gap-1">
                                        <li className='sm:text-lg font-medium md:text-xl py-1'> {user.company.name} </li>
                                        <li className='sm:text-md font-medium md:text-lg'> {user.company.catchPhrase} </li>
                                        <li className='sm:text-md font-medium md:text-lg'> {user.company.bs} </li>
                                    </ul>
                                </div>
                            </div>
                            <div ref={mapContainerRef} id="map" className="grow min-h-[70vh]"></div>
                        </div>
                    </ul>
                ) : (
                    <ul className='flex flex-col items-center gap-2 w-full h-full'>

                        <h1 className='font-bold text-2xl text-slate-900 md:text-3xl py-8 lg:py-12 ph-item'> 
                            <div className="ph-col-12 w-80">
                                <div className="ph-picture h-8"></div>
                            </div>
                        </h1>
                        
                        <div className="flex lg:flex-row flex-col justify-center gap-8 lg:gap-20 w-full h-full">
                            <div className="min-w-80">
                                <div className="py-4 flex flex-col gap-3 w-full ph-item">
                                    <h2 className='font-bold text-xl text-slate-900 md:text-2xl py-2'>
                                        Basic Info
                                    </h2>
                                    <div className="ph-col-12">
                                        <div className="ph-picture h-20"></div>
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

                                <div className="py-4 flex flex-col w-full ph-item">
                                    <h2 className='font-bold text-xl text-slate-900 md:text-2xl py-2'>
                                        Address
                                    </h2>
                                    <div className="ph-col-12">
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

                                <div className="py-4 flex flex-col w-full ph-item">
                                    <h2 className='font-bold text-xl text-slate-900 md:text-2xl py-2'>
                                        Company Info
                                    </h2>
                                    <div className="ph-col-12">
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
                            </div>
                            <div ref={mapContainerRef} id="map" className="grow min-h-[70vh] ph-item">
                                <div className="ph-picture h-full"></div>
                            </div>
                        </div>
                    </ul>
                )}
                </div>
        </div>
    )
};

export default UserView;