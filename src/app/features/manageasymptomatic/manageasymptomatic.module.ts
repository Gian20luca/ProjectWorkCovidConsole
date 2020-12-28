import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageasymptomaticComponent } from './manageasymptomatic.component';
import { ManageasymptomaticinputComponent } from './components/manageasymptomaticinput.component';
import { ManageasymptomaticthresholdsComponent } from './components/manageasymptomaticthresholds.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ManageasymptomaticComponent,
    children: [
      {
        path: 'manageasymptomaticinput',
        component: ManageasymptomaticinputComponent,
      },
      {
        path: 'manageasymptomaticthreshold',
        component: ManageasymptomaticthresholdsComponent,
      },
      { path: '', redirectTo: 'manageasymptomaticinput', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    ManageasymptomaticComponent,
    ManageasymptomaticinputComponent,
    ManageasymptomaticthresholdsComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class ManageasymptomaticModule {}
