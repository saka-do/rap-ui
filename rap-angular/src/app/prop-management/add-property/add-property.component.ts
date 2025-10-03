import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {

  previewUrl:string | null;
  private objectUrl:string | null;

  propertyForm: FormGroup = new FormGroup({
    propertyName : new FormControl('', Validators.required),
    description : new FormControl(''),
    price: new FormControl('', Validators.required),
    location: new FormControl(''),
    image: new FormControl(null, Validators.required)
  });

  constructor(private activeModel:NgbActiveModal){

  }

  onImageSelected(imgEvent:Event){
    console.log(imgEvent);
    const input = imgEvent.target as HTMLInputElement;
    const file = input.files && input.files[0];
    console.log(input);
    console.log(file)
    if(!file) return;

    //Guard only images;
    if(!file.type.startsWith("image/")){
      this.clearImage();
      return;
    }

    //revoke previos previewUrl if any
    const url = URL.createObjectURL(file);
    console.log(url);
    this.objectUrl = url;
    this.previewUrl = url;

    //Reset the input 
  }

  clearImage(){
    this.objectUrl = null;
    this.previewUrl = null;

  }
  close(){
    this.activeModel.close();
  }

  save(){

  }



  //Ensure clean up on component teardown or when the modal closes
  ngOnDestroy(){
    if(this.objectUrl){
      URL.revokeObjectURL(this.objectUrl);
    }
  }
}
