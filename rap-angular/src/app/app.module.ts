import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './shared/app-service';
import { PropertyListComponent } from './prop-management/property-list/property-list.component';
import { AddPropertyComponent } from './prop-management/add-property/add-property.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UpdatePropertyComponent } from './prop-management/update-property/update-property.component';
import { ViewPropertyComponent } from './prop-management/view-property/view-property.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent,
    AddPropertyComponent,
    UpdatePropertyComponent,
    ViewPropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), NgbModule, // ToastrModule added
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
