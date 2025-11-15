import { HttpClient, HttpParams } from '@angular/common/http';
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

  loadAllAmenitiesById(amenityIds:number[]){
    let params = new HttpParams();
    amenityIds.forEach(id => {
      params = params.append('ids',id);
    })
    return this.httpClient.get<AmenityDTO[]>(`${this.amenityBaseUrl}/lookup`, {params})
  }
}
