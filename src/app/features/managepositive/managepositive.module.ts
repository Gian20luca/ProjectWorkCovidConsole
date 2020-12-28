import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ManagepositiveComponent } from './managepositive.component';
import { ManagepositiveinputComponent } from './components/managepositiveinput.component';
import { ManagepositivethresholdsComponent } from './components/managepositivethresholds.component';

const routes: Routes = [
  {
    path: '',
    component: ManagepositiveComponent,
    children: [
      { path: 'managepositiveinput', component: ManagepositiveinputComponent },
      {
        path: 'managepositivethreshold',
        component: ManagepositivethresholdsComponent,
      },
      { path: '', redirectTo: 'managepositiveinput', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    ManagepositiveComponent,
    ManagepositiveinputComponent,
    ManagepositivethresholdsComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class ManagepositiveModule {}
