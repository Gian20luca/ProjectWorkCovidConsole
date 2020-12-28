import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <div class="space"></div>
    <router-outlet class="font"></router-outlet>

    <app-footer></app-footer>
  `,
  styles: [
    `
      .space {
        margin-bottom: 85px;
      }
    `,
  ],
})
export class AppComponent {}
