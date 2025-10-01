import { Component, OnInit } from '@angular/core';
import { Property } from '../../model/property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit{


  public properties:Array<any> = [];

  ngOnInit() {
    // this.properties.push({name: 'Murugan Nelayam', description: 'FUlly furnished 2BHK FLat', price:2000, address:'Chennai', type: 'Flat'} as Property)
    // this.properties.push({name: 'Murugan Nelayam', description: 'FUlly furnished 2BHK FLat', price:2000, address:'Chennai', type: 'Flat'} as Property)
    // this.properties.push({name: 'Murugan Nelayam', description: 'FUlly furnished 2BHK FLat', price:2000, address:'Chennai', type: 'Flat'} as Property)
    // this.properties.push({name: 'Murugan Nelayam', description: 'FUlly furnished 2BHK FLat', price:2000, address:'Chennai', type: 'Flat'} as Property)
    // this.properties.push({name: 'Murugan Nelayam', description: 'FUlly furnished 2BHK FLat', price:2000, address:'Chennai', type: 'Flat'} as Property)

  }

  performSearch(){
    
  }
}
