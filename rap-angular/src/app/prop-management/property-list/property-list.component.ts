import { Component, OnInit } from '@angular/core';
import { PropertyDetails } from '../../model/property-details';
import { PropertyService } from '../../shared/property.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPropertyComponent } from '../add-property/add-property.component';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit{


  public properties:Array<PropertyDetails> = [];

  constructor(private propertyService: PropertyService, private model: NgbModal) { }

  ngOnInit() {
    
    this.propertyService.getAllProperties().subscribe(data => this.properties = data);
  }

  performSearch(){
    
  }

  addProperty(){
    this.model.open(AddPropertyComponent), {backdrop:'static'};
  }
}
