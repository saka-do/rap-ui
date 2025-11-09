import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './prop-management/property-list/property-list.component';
import { UpdatePropertyComponent } from './prop-management/update-property/update-property.component';

const routes: Routes = [
  { path: '', component: PropertyListComponent},
  { path: 'properties', 
    children: [ 
      {path:'', component: PropertyListComponent},
      {path:'update-property/:id', component: UpdatePropertyComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
