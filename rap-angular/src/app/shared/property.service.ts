import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { PropertyData } from '../model/property-data';
import { PropertyDetails } from '../model/property-details';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private getAllPropertiesUrl:string = "/ps/api/properties";
  private addPropertyUrl:string = "/ps/api/properties";
  private propertyByIdUrl:string ="/ps/api/properties/property";

  constructor(private httpClient: HttpClient) { }

  public getAllProperties():Observable<PropertyData[]>{
    return this.httpClient.get<PropertyData[]>(this.getAllPropertiesUrl).pipe(
      catchError(error => {
        //Log error
        console.error(error)
        return of([]); //Return a fallback value as empty array
      })
    );
  }

  public addProperty(propertyData:FormData):Observable<string>{
    return this.httpClient.post<string>(this.addPropertyUrl, propertyData).pipe(
      catchError(error =>{
        console.log(error)
        return of("");
      })
    )
  }

  public getPropertyById(pId:number){
    return this.httpClient.get<PropertyDetails>(`${this.propertyByIdUrl}/${pId}`).pipe(
      catchError(error =>{
        return of(null);
      })
      )
  }

  public updatePropertyDetails(propertyDetails:PropertyDetails){
    console.log(propertyDetails)
    return this.httpClient.put<PropertyDetails>(`${this.propertyByIdUrl}/${propertyDetails.propertyId}`,propertyDetails)
  }

  public deleteProperty(pId:number){
    return this.httpClient.delete(`${this.propertyByIdUrl}/${pId}`, {observe:'response'});
  }
}
