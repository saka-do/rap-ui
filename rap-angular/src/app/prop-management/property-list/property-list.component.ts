import { Component, OnInit } from '@angular/core';
import { PropertyDetails } from '../../model/property-details';
import { PropertyService } from '../../shared/property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit{


  public properties:Array<PropertyDetails> = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    
    this.propertyService.getAllProperties().subscribe(data => this.properties = data);
  }

  performSearch(){
    
  }

  addProperty(){
    
  }
}
