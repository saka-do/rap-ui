import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { PropertyData } from '../model/property-data';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private getAllPropertiesUrl:string = "/ps/api/properties";
  private addPropertyUrl:string = "/ps/api/properties";
  private getPropertyByIdUrl:string ="/ps/api/properties/:id";

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
}
