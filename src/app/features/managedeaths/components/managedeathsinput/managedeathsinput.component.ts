import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';

@Component({
  selector: 'app-managedeathsinput',
  templateUrl: './managedeathsinput.component.html',
  styleUrls: ['./managedeathsinput.component.css'],
})
export class ManagedeathsinputComponent {
  onSubmit(value: any) {
    this.http
      .patch('http://localhost:3000/regione/' + value.id, value)
      .subscribe((res:any) => {
        res.deaths = value.deaths;
      });
  }

  constructor(private http: HttpClient,private _router: Router) {}

  goToMap() {
    swal(
      {
        title: 'Salvataggio avvenuto con successo',
        text: 'I tuoi dati sono stati cambiati!',
        type: 'success',
        confirmButtonText: 'Vai alla pagina principale',
      },
      () => {
        this._router.navigate(['/mapDeaths']);
      }
    );
  }
}
