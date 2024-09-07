import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import TextInputField from "./SellForm/UI/TextInputField";
import handleSubmitForm from "../utils/handleSubmitForm";
import initMap from "../utils/initMap";
import { FlatUserFormData } from "../types/Types";
import geocode from "src/utils/geocode";
import SearchBox from "./SellForm/UI/SearchBox";
import { useNavigate } from "react-router-dom";
import NumberWithUnitInputField from "./SellForm/UI/NumberWithUnitInputField";
import './SellForm.css'
import { ListContext } from "src/context/listContext";

const List = () => {

    const navigate = useNavigate();

    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const context = useContext(ListContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        website: '',
        address_city: '',
        address_street: '',
        address_suite: '',
        address_zipcode: '',
        address_geo_lat: '12.98',
        address_geo_lng: '77.58',
        company_bs: '',
        company_catchPhrase: '',
        company_name: '',
    });

    const updateFormData = (newData: FlatUserFormData) => {
        setFormData((prev) => (
            {...formData, ...newData}
        ))
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsValidated(true);
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setIsSubmitting(true);
            const response = await handleSubmitForm(formData);
            setIsSubmitting(false);
            if(response.success) {
                context?.setData(response.data);
                navigate('/user-view/11');
            }
        }
        else {
            window.alert('Please enter valid details..');
        }
    };

    const handleSearchChange = async () => {
        let [lat, lng] = await geocode(searchQueryRef.current);
        if (lat && lng) {
            updateFormData({ ...formData, 
                address_geo_lat: (Math.round(lat * 100000) / 100000).toString(),
                address_geo_lng: (Math.round(lng * 100000) / 100000).toString()
            });
            markerRef.current?.setLatLng([lat,lng]);
            mapRef.current?.setView([lat,lng], defaultZoom);
        } else {
          window.alert(`No results found for ${searchQueryRef.current}`);
        }
    };

    const [searchQuery, setSearchQuery] = useState<string>('');
    const searchQueryRef = useRef<string>(searchQuery);
    searchQueryRef.current = searchQuery;

    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const defaultZoom: number = 16;

    useEffect(() => {
        if(mapContainerRef.current && !mapRef.current) {
            mapRef.current = initMap(mapContainerRef.current, [parseFloat(formData.address_geo_lat), parseFloat(formData.address_geo_lng)], defaultZoom);
        }
        if(mapRef.current) {
            markerRef.current = window.L.marker([parseFloat(formData.address_geo_lat), parseFloat(formData.address_geo_lng)]).addTo(mapRef.current);
            if(markerRef.current.dragging) markerRef.current.dragging.enable();

            markerRef.current.on('dragend', function() {
                const v = markerRef.current?.getLatLng();
                if(v) {
                    updateFormData({ ...formData, 
                        address_geo_lat: (Math.round(v.lat * 100000) / 100000).toString(),
                        address_geo_lng: (Math.round(v.lng * 100000) / 100000).toString()
                    });
                }
            });
        }
    }, []);

    return (
        <div className='flex justify-center p-8'>
            
            <div className='lg:px-8 lg:py-8 lg:shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]
                2xl:w-2/3 xl:w-3/4 lg:w-4/5'>
                
                <form onSubmit={(event) => handleSubmit(event)}
                    className="flex flex-col h-full gap-5"
                    noValidate
                >

                        <TextInputField 
                            autoFocus={true}
                            label='Name'
                            field='name'
                            placeholder='e.g. Arjun Murali'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <TextInputField 
                            label='Username'
                            field='username'
                            placeholder='e.g. arjun666'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <TextInputField 
                            label='Website'
                            field='website'
                            placeholder='e.g. arjunmura.com'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <TextInputField 
                            label='Email'
                            field='email'
                            placeholder='e.g. arjunmura@gmail.com'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <NumberWithUnitInputField 
                            label='Phone'
                            field='phone'
                            placeholder='e.g. 7025408327'
                            unit="IN"
                            required={true}
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <TextInputField
                            label='City'
                            field='address_city'
                            placeholder='e.g. Thrissur'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <TextInputField 
                            label='Street'
                            field='address_street'
                            placeholder='e.g. Ethai Center'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <TextInputField 
                            label='Suite'
                            field='address_suite'
                            placeholder='e.g. prr'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <TextInputField 
                            label='Zip Code'
                            field='address_zipcode'
                            placeholder='e.g. 680616'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <TextInputField 
                            label='Company BS'
                            field='company_bs'
                            placeholder='e.g. pr'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <TextInputField 
                            label='Company Name'
                            field='company_name'
                            placeholder='e.g. Mugen'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />
                        <TextInputField 
                            label='Company Catch Phrase'
                            field='company_catchPhrase'
                            placeholder='e.g. Crafting'
                            formData={formData}
                            updateFormData={updateFormData}
                            isValidated={isValidated}
                        />

                    <div className="relative">

                        <div className='row search-row mx-12 d-flex p-2 align-items-center' style={{position: 'absolute', zIndex: 1000}}>
                            <div className='p-0 py-2'>
                                <SearchBox
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                handleSearchChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        <div ref={mapContainerRef} id="map" className="grow min-h-[70vh]"></div>

                    </div>

                    <div className="flex justify-end items-center py-4">
                        <div>
                            <button 
                                className="bg-slate-800 font-medium text-white py-2 px-5 rounded-lg" 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Please wait' : 'Submit'}
                            </button>
                        </div>
                    </div>

                </form>

            </div>
            
        </div>
    )
};

export default List;