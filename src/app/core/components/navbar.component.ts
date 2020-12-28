import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a
          class="navbar-brand title"
          routerLink="home"
          routerLinkActive="active"
        >
          <img
            src="https://cdn.smassets.net/assets/cms/cc/uploads/sites/7/taller-header-coronavirus-resources-768x604.png"
            width="61"
            height="45"
            class="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
          Project work Covid-19 Console
        </a>

        <ul class="navbar-nav pull-right">
          <li class="nav-item active">
            <a
              class="nav-link"
              routerLink="managepositive"
              routerLinkActive="active"
              >Gestisci positivi</a
            >
          </li>
          <li class="nav-item active">
            <a
              class="nav-link"
              routerLink="managedeaths"
              routerLinkActive="active"
              >Gestisci deceduti</a
            >
          </li>
          <li class="nav-item active">
            <a
              class="nav-link"
              routerLink="manageasymptomatic"
              routerLinkActive="active"
              >Gestisci asintomatici</a
            >
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `
      .title {
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 600;
      }
      li {
        font-size: 18px;
      }
      li:hover {
        font-weight: bold;
      }
    `,
  ],
})
export class NavbarComponent {}
