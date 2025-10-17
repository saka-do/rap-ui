import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../shared/property.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { PropertyData } from '../../model/property-data';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageServiceService } from '../../shared/image-service.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit{


  public properties:Array<PropertyData> = [];

  constructor(private propertyService: PropertyService, 
              private imageService: ImageServiceService,
              private model: NgbModal) { }

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties(){
    this.propertyService.getAllProperties().subscribe(data => {
      this.properties = data

      this.properties.forEach((property:PropertyData) => {
        if(property.imageIds.length !=0 ){
          this.imageService.getPropertyImageUrlByImgId(property.imageIds.at(0)).subscribe(imgUrl => property.thumbnailImage = imgUrl)
        }
      })
    });
  }

  performSearch(){
    
  }

  addProperty(){
    const modalRef: NgbModalRef = this.model.open(AddPropertyComponent, { backdrop: 'static' });
    modalRef.result.then(() =>{
      this.loadProperties();
    }).catch(msg => console.error(msg))
    .finally(()=> this.loadProperties)
  }
 
}
