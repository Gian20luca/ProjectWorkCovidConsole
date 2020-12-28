import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagedeathsComponent } from './managedeaths.component';
import { ManagedeathsthresholdsComponent } from './components/managedeathsthresholds.component';
import { ManagedeathsinputComponent } from './components/managedeathsinput.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ManagedeathsComponent,
children:[
  {path: 'managedeathsinput', component: ManagedeathsinputComponent},
  {path: 'managedeathsthreshold', component: ManagedeathsthresholdsComponent},
  {path: '', redirectTo: 'managedeathsinput', pathMatch: 'full'}
]
  }
];


@NgModule({
  declarations: [ManagedeathsComponent, ManagedeathsthresholdsComponent, ManagedeathsinputComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ManagedeathsModule { }
