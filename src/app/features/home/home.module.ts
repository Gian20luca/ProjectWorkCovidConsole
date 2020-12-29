import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { MapAsintomaticiComponent } from './components/mapAsintomatici/mapAsintomatici.component';
import { MapDeathsComponent } from './components/mapDeceduti/mapDeceduti.component';
import { MapPositiviComponent } from './components/mapPositivi/mapPositivi.component';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    MapPositiviComponent,
    MapAsintomaticiComponent,
    MapDeathsComponent,
  ],
  imports: [
    CommonModule,
    LeafletModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: 'mapPositive',
            component: MapPositiviComponent,
          },
          {
            path: 'mapDeaths',
            component: MapDeathsComponent,
          },
          {
            path: 'mapAsymptomatic',
            component: MapAsintomaticiComponent,
          },
          {
            path: '',
            redirectTo: 'mapPositive',
            pathMatch: 'full',
          },
        ],
      },
    ]),
  ],
})
export class HomeModule {}
