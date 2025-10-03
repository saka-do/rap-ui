import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { PropertyDetails } from '../model/property-details';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private getAllPropertiesUrl:string = "/ps/properties";
  private addPropertyUrl:string = "/ps/properties/add";
  private getPropertyByIdUrl:string ="/ps/properties/property/:id";

  constructor(private httpClient: HttpClient) { }

  public getAllProperties():Observable<PropertyDetails[]>{
    return this.httpClient.get<PropertyDetails[]>(this.getAllPropertiesUrl).pipe(
      catchError(error => {
        //Log error
        console.error(error)
        return of([]); //Return a fallback value as empty array
      })
    );
  }
}
