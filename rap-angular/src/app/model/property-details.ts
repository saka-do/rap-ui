export class PropertyDetails{
    propertyId:number;
    name:string;
    description:string;
    price:string;
    owner:string;
    imageIds:Array<number>;
    amenityIds:Array<number>;
    address:Address;
}

export class Address{
    addressLine:string;
    city:string;
    state:string;
    country:string;
    pincode:string;
}