import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';

@Component({
  selector: 'app-manageasymptomaticinput',
  templateUrl: './manageasymptomaticinput.component.html',
  styleUrls: ['./manageasymptomaticinput.component.css'],
})
export class ManageasymptomaticinputComponent {
  responseSelect: any;
  constructor(private http: HttpClient, private _router: Router) {
    this.http
      .get('http://localhost:3000/regione/1')
      .subscribe((res: any) => (this.responseSelect = res));
  }

  onSubmit(value: any) {
    if (
      value.asymptomatic < this.responseSelect.asymptomatic &&
      value.asymptomatic > 0 &&
      value.asymptomatic !== this.responseSelect.asymptomatic
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
          this._router.navigate(['/mapAsymptomatic']);
        }
      );
    } else if (value.asymptomatic < 0) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Gli asintomatici non possono essere minori di 0',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (value.asymptomatic === this.responseSelect.asymptomatic) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Questi dati sono già inseriti',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Gli asintomatici non possono essere maggiori dei positivi',
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
