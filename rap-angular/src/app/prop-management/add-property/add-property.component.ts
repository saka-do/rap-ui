import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from '../../shared/property.service';
import { PropertyData } from '../../model/property-data';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {

  previewUrl:string | null;
  private objectUrl:string | null;
  private imageData:File | null;

  propertyForm: FormGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    description : new FormControl(''),
    price: new FormControl('', Validators.required),
    location: new FormControl(''),
  });

  constructor(private propertyService: PropertyService,
            private activeModel:NgbActiveModal,
            private toasterService: ToastrService){

  }

  onImageSelected(imgEvent:Event){
    console.log(imgEvent);
    const input = imgEvent.target as HTMLInputElement;
    this.imageData = input.files && input.files[0];
    console.log(input);
    if(!this.imageData) return;

    //Guard only images;
    if(!this.imageData.type.startsWith("image/")){
      this.clearImage();
      return;
    }
    const url = URL.createObjectURL(this.imageData);
    console.log(url);
    this.previewUrl = url;
    this.objectUrl = url;
    console.log("Imge Size, ", this.imageData.size)
  }

  clearImage(){
    this.imageData = null;
    this.previewUrl = null;
    this.objectUrl = null;

  }
  close(){
    this.activeModel.close();
  }

  save(){
    console.log(this.propertyForm.value);
    const propertyData:PropertyData = this.propertyForm.value;
    propertyData.thumbnailImage = '';
    propertyData.owner = "sathish";

    const formData = new FormData();
    formData.append('image', this.imageData);
    formData.append('propertyData', new Blob([JSON.stringify(propertyData)], {type: 'application/json'}));
    
    console.log("Before semd payload: ",formData);

    this.propertyService.addProperty(formData).subscribe(data =>{
      console.log(data);
      if(data != ""){
        this.toasterService.success("Property saved successfully", '', {closeButton:true});
        this.activeModel.close(data);
      }else{
        this.toasterService.error("Unable to Add Property Try again",'', {closeButton:true});
      }
      
    });
  }



  //Ensure clean up on component teardown or when the modal closes
  ngOnDestroy(){
    if(this.objectUrl){
      URL.revokeObjectURL(this.objectUrl);
    }
  }
}
