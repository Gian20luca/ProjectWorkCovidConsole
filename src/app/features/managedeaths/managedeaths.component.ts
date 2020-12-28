import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managedeaths',
  template: `
    <div class="container-fluid" style="margin-top:15px;">
      <div class="row justify-content-around">
        <div class="col-md-6"></div>
        <ul class="pull-right ">
          <li>
            <a routerLink="managedeathsinput" routerLinkActive="active">
              Gestione decessi</a
            >
          </li>
          <li
            style="
        padding-right: 0px;"
          >
            <a routerLink="managedeathsthreshold" routerLinkActive="active">
              Gestione soglie
            </a>
          </li>
        </ul>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      ul {
        list-style-type: none;
        display: flex;
      }

      li {
        padding-right: 35px;
      }

      a {
        position: relative;
        text-decoration: none;
        color: black;
        font-size: 18px;
        cursor: pointer;
      }
      a:after {
        content: '';
        display: block;
        height: 1.5px;
        position: absolute;
        background: black;
        transition: width 0.3s ease 0s;
        width: 0;
      }
      a:hover {
        font-weight: bold;
      }
      a:hover:after {
        width: 100%;
        left: 0;
      }
    `,
  ],
})
export class ManagedeathsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}