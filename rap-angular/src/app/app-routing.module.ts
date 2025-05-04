import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './prop-management/property-list/property-list.component';

const routes: Routes = [
  {path: '', component: PropertyListComponent},
  {path: 'properties', component: PropertyListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
