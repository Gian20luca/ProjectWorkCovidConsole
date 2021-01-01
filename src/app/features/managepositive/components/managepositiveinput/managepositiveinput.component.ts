import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';

@Component({
  selector: 'app-managepositiveinput',
  templateUrl: './managepositiveinput.component.html',
  styleUrls: ['./managepositiveinput.component.css'],
})
export class ManagepositiveinputComponent {
  responseSelect: any;
  constructor(private http: HttpClient, private _router: Router) {
    this.http
      .get('http://localhost:3000/regione/1')
      .subscribe((res: any) => (this.responseSelect = res));
  }

  onSubmit(value: any) {
    if (
      value.positive < this.responseSelect.population &&
      value.positive > 0 &&
      value.positive !== this.responseSelect.positive
    ) {
      this.http
        .patch('http://localhost:3000/regione/' + value.id, value)
        .subscribe(() => {});
      swal(
        {
          title: 'Salvataggio avvenuto con successo',
          text: 'I tuoi dati sono stati cambiati!',
          type: 'success',
          confirmButtonText: 'Vai alla pagina principale',
        },
        () => {
          this._router.navigate(['/mapPositive']);
        }
      );
    } else if (value.positive < 0) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'I positivi non possono essere minori di 0',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (value.positive === this.responseSelect.positive) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Questi dati sono già inseriti',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else {
      swal({
        title: 'Salvataggio non avvenuto',
        text: "I positivi non possono essere maggiori dell' intera popolazione",
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    }
  }

  onChanged(value: any) {
    this.http
      .get('http://localhost:3000/regione/' + value.id)
      .subscribe((res: any) => (this.responseSelect = res));
  }
}
