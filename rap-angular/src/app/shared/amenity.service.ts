import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AmenityDTO } from '../model/amenity-dto';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

  private amenityBaseUrl:string = '/ps/amenities'
  constructor(private httpClient: HttpClient) { }



  loadAllAmenities(){
    return this.httpClient.get<Array<AmenityDTO>>(this.amenityBaseUrl);
  }
}
