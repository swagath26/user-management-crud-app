import { FlatUserFormData, User } from "src/types/Types";

const handleEdit = (user: User, setEditData: React.Dispatch<React.SetStateAction<FlatUserFormData>>) => {

    const data = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        website: user.website,
        address_city: user.address.city,
        address_street: user.address.street,
        address_suite: user.address.suite,
        address_zipcode: user.address.zipcode,
        address_geo_lat: user.address.geo.lat,
        address_geo_lng: user.address.geo.lng,
        company_bs: user.company.bs,
        company_catchPhrase: user.company.catchPhrase,
        company_name: user.company.name
    };
    setEditData(data);
}

export default handleEdit;