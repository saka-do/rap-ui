import { Component, OnInit } from '@angular/core';
import { AppService } from './shared/app-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private appService: AppService){
    // this.appService.getTestMessage().subscribe(res =>{
    //   console.log(res);
    // })
  }

  ngOnInit() {
    
  }
  title = 'rap-angular';


}
