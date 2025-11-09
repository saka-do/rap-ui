import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../../shared/property.service';
import { ActivatedRoute } from '@angular/router';
import { PropertyDetails } from '../../model/property-details';
import { ImageServiceService } from '../../shared/image-service.service';
import { ImageDto } from '../../model/image-dto';
import { ToastrService } from 'ngx-toastr';
import { AmenityService } from '../../shared/amenity.service';
import { AmenityDTO } from '../../model/amenity-dto';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrl: './update-property.component.css'
})
export class UpdatePropertyComponent implements OnInit{

  

  propertyId:number;
  propertyDetails:PropertyDetails;

  amenities: AmenityDTO[];

  imageIds:Array<number>;
  imageUrl:string | null;
  objectUrl:string | null;
  imgData: File | null;
  imgId:number;
  imgIndex:number = 0;
  isFirstImage:boolean;
  isLastImage:boolean;
  saveImageBtn:boolean = true;


  updatePropForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    amenityIds: new FormControl([]),
    address: new FormGroup({
      addressLine: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl('', Validators.required)
    })
  });
  constructor(private route:ActivatedRoute,
              private toasterService: ToastrService,
              private propertyService: PropertyService,
              private imageService: ImageServiceService,
              private amenityService: AmenityService){
  }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.params['id'];
    console.log(this.propertyId)
    this.loadPropertyDetails();

    this.amenityService.loadAllAmenities().subscribe(data =>{
      this.amenities = data;
    })
  }

  


  loadPropertyDetails(){
    this.propertyService.getPropertyById(this.propertyId).subscribe(data =>{
      this.propertyDetails = data;

      this.imageIds = data.imageIds;
      this.imgId = this.imageIds[0];
      if(this.imageIds.length != 0){
        this.imageService.getPropertyImageUrlByImgId(this.propertyId,this.imageIds.at(0)).subscribe( imgSrc => {
          this.imageUrl = imgSrc;
          this.imgIndex = 0;
          this.isFirstImage = true;
          if(this.imgIndex+1 == this.imageIds.length) this.isLastImage = true;
          this.saveImageBtn = false;
        });
      }

      //patch formcontrol values from data
      this.updatePropForm.patchValue({
        name: data.name,
        description: data.description,
        price: data.price,
        amenityIds: data.amenityIds,
        address: {
          addressLine: data.address.addressLine,
          city: data.address.city,
          state: data.address.state,
          country: data.address.country,
          pincode: data.address.pincode
        }
      });
    });




  }

  onSubmit(){
    console.log("FormData : ", this.updatePropForm)
    const propertyRequest:PropertyDetails = this.updatePropForm.value;

    propertyRequest.propertyId = this.propertyDetails.propertyId;
    propertyRequest.owner = this.propertyDetails.owner;

    this.propertyService.updatePropertyDetails(propertyRequest).subscribe(data =>{
      this.imageIds = data.imageIds;
      this.imgId = this.imageIds[0];
      if(this.imageIds.length != 0){
        this.imageService.getPropertyImageUrlByImgId(this.propertyId,this.imageIds.at(0)).subscribe( imgSrc => {
          this.imageUrl = imgSrc;
          this.imgIndex = 0;
          this.isFirstImage = true;
          if(this.imgIndex+1 == this.imageIds.length) this.isLastImage = true;
          this.saveImageBtn = false;
        });
      }

      //patch formcontrol values from data
      this.updatePropForm.patchValue({
        name: data.name,
        description: data.description,
        price: data.price,
        amenityIds: data.amenityIds,
        address: {
          addressLine: data.address.addressLine,
          city: data.address.city,
          state: data.address.state,
          country: data.address.country,
          pincode: data.address.pincode
        }
      });

      this.toasterService.success("Details Updated Successfully",'',{closeButton:true})
    });

  }

  onAmenityChange(amenityId:number, event:Event){
    const input = event.target as HTMLInputElement;
    let ids = this.updatePropForm.value.amenityIds;
    if(input.checked){
      if(!ids.includes(amenityId)) ids.push(amenityId);
    }else{
      ids = ids.filter(id => id!=amenityId);
    }
    console.log(ids);
    this.updatePropForm.get('amenityIds').setValue(ids);
  }

  addImage(){
    if(this.imageIds.length >= 10) this.toasterService.error("cannot add more than 10 images to property",'',{closeButton:true});
    else{
      this.imgIndex = this.imageIds.length;
      this.imageUrl = null;
      this.objectUrl = null;
      this.saveImageBtn = true;
    }
  }
  
  onImageSelected(imageEvent:Event){
    const input = imageEvent.target as HTMLInputElement;
    this.imgData = input.files && input.files[0];

    //Gaurd (only images)
    if(!this.imgData.type.startsWith('image/')) {
      this.removeImage();
      return;
    }

    const url = URL.createObjectURL(this.imgData);
    this.imageUrl = url;
    this.objectUrl = url;
  }

  saveImage(){
    const imgFormData = new FormData();
    imgFormData.append('image', this.imgData);

    this.imageService.addImageByPropertyId( this.propertyId, imgFormData).subscribe(imgResponse => {
      this.imageUrl = imgResponse.imgUrl;
      this.imageIds.push(imgResponse.imageId);
      this.imgId = imgResponse.imageId;
      this.saveImageBtn = false;
      this.isLastImage = true;
      this.isFirstImage = false;
      this.toasterService.success("Image addded to property", '', {closeButton:true});

    }) ;
  }

  removeImage(){
     console.log("ImgId",this.imgId);
    console.log("imgIndex", this.imgIndex);
    this.imageService.removeImage(this.propertyId, this.imgId).subscribe({
      next: ()=>{
        this.imgData = null;
        this.imageUrl = null;
        this.objectUrl = null;
        this.imageIds = this.imageIds.filter(id => id!=this.imgId);
        //show success toast
        this.toasterService.warning("Deleted Image Sucessfully",'',{closeButton:true});
        this.scrollLeft();
        setTimeout(()=> {
          if(this.imgIndex+1 == this.imageIds.length) this.isLastImage = true
        },500)
      },
      error:() => {
        //show error toast
        this.toasterService.error("Error Occured while deleteing image",'',{closeButton:true} )
      }
    });
    
  }

  scrollLeft(){
    this.imgIndex--;
    this.imgId = this.imageIds.at(this.imgIndex)
    console.log("ImgsIds Size",this.imageIds.length);
    console.log("imgIndex", this.imgIndex);
    this.imageService.getPropertyImageUrlByImgId(this.propertyId, this.imgId).subscribe( imgSrc => {
          this.imageUrl = imgSrc;
          if(this.imgIndex -1 < 0) this.isFirstImage = true;
          this.isLastImage = false;

    });
  }

  scrollRight(){
    this.imgIndex++;
    this.imgId = this.imageIds.at(this.imgIndex)
    console.log("ImgsIds Size",this.imageIds.length);
    console.log("imgIndex", this.imgIndex);
    this.imageService.getPropertyImageUrlByImgId(this.propertyId,  this.imgId).subscribe( imgSrc => {
          this.imageUrl = imgSrc;
          if(this.imgIndex+1 == this.imageIds.length) this.isLastImage = true;
          this.isFirstImage = false;
    });
  }


}
