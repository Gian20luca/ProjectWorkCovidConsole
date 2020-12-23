import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-map></app-map>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
