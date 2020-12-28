import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'managepositive',
    loadChildren: () =>
      import('./features/managepositive/managepositive.module').then(
        (m) => m.ManagepositiveModule
      ),
  },
  {
    path: 'managedeaths',
    loadChildren: () =>
      import('./features/managedeaths/managedeaths.module').then(
        (m) => m.ManagedeathsModule
      ),
  },
  {
    path: 'manageasymptomatic',
    loadChildren: () =>
      import('./features/manageasymptomatic/manageasymptomatic.module').then(
        (m) => m.ManageasymptomaticModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
