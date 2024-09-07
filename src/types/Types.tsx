export type Geo = {
    lat: string
    lng: string
}

export type Address = {
    city: string
    geo: Geo
    street: string
    suite: string
    zipcode: string
}

export type Company = {
    bs: string
    catchPhrase: string
    name: string
}

export type User = {
    address: Address
    company: Company
    email: string
    id: number
    name: string
    phone: string
    username: string
    website: string
}

export type FlatUserFormData = {
    name: string;
    email: string;
    phone: string;
    username: string;
    website: string;
    address_city: string;
    address_street: string;
    address_suite: string;
    address_zipcode: string;
    address_geo_lat: string;
    address_geo_lng: string;
    company_bs: string;
    company_catchPhrase: string;
    company_name: string;
};