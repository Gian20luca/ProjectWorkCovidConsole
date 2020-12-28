import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './features/home/home.module';
import { ManageasymptomaticModule } from './features/manageasymptomatic/manageasymptomatic.module';
import { ManagedeathsModule } from './features/managedeaths/managedeaths.module';
import { ManagepositiveModule } from './features/managepositive/managepositive.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule,CoreModule,ManageasymptomaticModule,ManagedeathsModule,ManagepositiveModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
