import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../shared/property.service';
import { ActivatedRoute } from '@angular/router';
import { PropertyDetails } from '../../model/property-details';
import { ImageServiceService } from '../../shared/image-service.service';
import { forkJoin } from 'rxjs';
import { AmenityService } from '../../shared/amenity.service';
import { AmenityDTO } from '../../model/amenity-dto';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrl: './view-property.component.css'
})
export class ViewPropertyComponent implements OnInit{

  propertyId:number;
  propertyDetails: PropertyDetails;

  imageData: Array<string>
  amenitiesData: AmenityDTO[];

  addressDetails:string;

  constructor(private propertyService:PropertyService,
              private imageService: ImageServiceService,
              private amenityService: AmenityService,
              private route: ActivatedRoute
  ){

  }


  ngOnInit(): void {
    this.propertyId = this.route.snapshot.params['id'];

    this.propertyService.getPropertyById(this.propertyId).subscribe({
      next : response =>{
        this.propertyDetails = response;
        
        this.loadImageUrls()
        this.loadAmenities()
        this.addressDetails = this.arrangeAddressDetails();
      }
    })
  }


  loadImageUrls(){
    const imgObservables = this.propertyDetails.imageIds.map(imgId => {
      return this.imageService.getPropertyImageUrlByImgId(this.propertyId, imgId)
    });

    forkJoin(imgObservables).subscribe(imgUrls => this.imageData = imgUrls);
  }

  loadAmenities(){
    this.amenityService.loadAllAmenitiesById(this.propertyDetails.amenityIds).subscribe(resp => {
      this.amenitiesData = resp;
    });
  }


  arrangeAddressDetails(){

    const address = this.propertyDetails.address;
    return `${address.addressLine}, ${address.city}, \n ${address.state} - ${address.pincode}, \n ${address.country}`;
  }

}
