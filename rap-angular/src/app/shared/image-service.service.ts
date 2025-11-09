import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageDto } from '../model/image-dto';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private propertyBaseUrl:string = "/ps/api/properties";
  private imageBaseUrl:string="images"

  constructor(private httpClient: HttpClient) { }


  public getPropertyImageUrlByImgId(propId:number,imgId:number){
    console.log(`${this.propertyBaseUrl}/${propId}/${this.imageBaseUrl}/${imgId}`)
    return this.httpClient.get(`${this.propertyBaseUrl}/${propId}/${this.imageBaseUrl}/${imgId}`, {responseType: 'text'})
  }

  public addImageByPropertyId(propId:number, imgData:FormData){
    return this.httpClient.post<ImageDto>(`${this.propertyBaseUrl}/${propId}/${this.imageBaseUrl}`, imgData);
  }

  public removeImage(propId:number,imgId:number){
    return this.httpClient.delete(`${this.propertyBaseUrl}/${propId}/${this.imageBaseUrl}/${imgId}`);
  }
}
