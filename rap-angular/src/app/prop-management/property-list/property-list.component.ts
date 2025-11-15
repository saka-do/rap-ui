import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../shared/property.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { PropertyData } from '../../model/property-data';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageServiceService } from '../../shared/image-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit{


  public properties:Array<PropertyData> = [];

  constructor(private propertyService: PropertyService, 
              private imageService: ImageServiceService,
              private router:Router,
              private model: NgbModal,
              private toasterService: ToastrService) { }

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties(){
    this.propertyService.getAllProperties().subscribe(data => {
      this.properties = data

      this.properties.forEach((property:PropertyData) => {
        if(property.imageIds.length !=0 ){
          this.imageService.getPropertyImageUrlByImgId(property.propertyId,property.imageIds.at(0)).subscribe(imgUrl => {
            property.thumbnailImage = imgUrl
          console.log("Reveied,",imgUrl)}
          )
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

  viewProperty(propertyId){
    this.router.navigate(['properties/view-property/',propertyId]);
  }


  deleteProperty(propertyId){
    this.propertyService.deleteProperty(propertyId).subscribe({
      next : response =>{
        if(response.status == 200){
          this.toasterService.warning("Property Deleted Sucessfullly",'',{closeButton:true});
          this.loadProperties();
        }
        else{
          this.toasterService.error("Error ocurred while performing operation",'',{closeButton:true})
        }
      },
      error: error => {
        console.error(error);
      }
      
    });
  }


  editProperty(propertyId){
    this.router.navigate(['properties/update-property/',propertyId]);
  }
 
}
