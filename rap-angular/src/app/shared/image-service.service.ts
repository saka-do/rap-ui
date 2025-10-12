import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private getPropertyImageBaseUrl:string = "/ps/api/images/properties/";

  constructor(private httpClient: HttpClient) { }


  public getPropertyImageUrlByImgId(imgId:number){
    console.log(imgId)
    return this.httpClient.get(`${this.getPropertyImageBaseUrl}/${imgId}`, {responseType: 'text'})
  }
}
