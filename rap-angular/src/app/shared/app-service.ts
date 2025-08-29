import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppService{

    private testUrl:string = "/ps/test/testdb"

    constructor(private httpClient: HttpClient){

    }

    getTestMessage(){
        return this.httpClient.get(this.testUrl,{responseType: 'json'});
    }

}