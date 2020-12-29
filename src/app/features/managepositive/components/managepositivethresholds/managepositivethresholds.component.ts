import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managepositivethresholds',
  templateUrl: './managepositivethresholds.component.html',
  styleUrls: ['./managepositivethresholds.component.css'],
})
export class ManagepositivethresholdsComponent {
  response;
  constructor(private http: HttpClient, private _router: Router) {
    this.http
      .get('http://localhost:3000/soglie/1')
      .subscribe((res) => (this.response = res));
  }
  onSubmit(value: any) {
    if (
      value.minPositiveThresholds < value.maxPositiveThresholds &&
      value.minColorPositiveThresholds !== value.maxColorPositiveThresholds &&
      value.minColorPositiveThresholds !==
        value.mediumColorPositiveThresholds &&
      value.mediumColorPositiveThresholds !== value.maxColorPositiveThresholds
    ) {
      this.http
        .patch('http://localhost:3000/soglie/1', value)
        .subscribe((res: any) => {
          res.minPositiveThresholds = value.minPositiveThresholds;
          res.maxPositiveThresholds = value.maxPositiveThresholds;
          res.minColorPositiveThresholds = value.minColorPositiveThresholds;
          res.mediumColorPositiveThresholds =
            value.mediumColorPositiveThresholds;
          res.maxColorPositiveThresholds = value.maxColorPositiveThresholds;
        });
      swal(
        {
          title: 'Salvataggio avvenuto con successo',
          text: 'I tuoi dati sono stati cambiati!',
          type: 'success',
          confirmButtonText: 'Vai alla pagina principale',
        }, () => {
          this._router.navigate(['/mapPositive']);
        }
      );
    } else if (
      value.minPositiveThresholds > value.maxPositiveThresholds &&
      value.minColorPositiveThresholds !== value.maxColorPositiveThresholds &&
      value.minColorPositiveThresholds !==
        value.mediumColorPositiveThresholds &&
      value.mediumColorPositiveThresholds !== value.maxColorPositiveThresholds
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inferiore non può essere maggiore della soglia superiore!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minPositiveThresholds < value.maxPositiveThresholds &&
        value.minColorPositiveThresholds ===
          value.maxColorPositiveThresholds) ||
      (value.minPositiveThresholds < value.maxPositiveThresholds &&
        value.minColorPositiveThresholds ===
          value.mediumColorPositiveThresholds) ||
      (value.minPositiveThresholds < value.maxPositiveThresholds &&
        value.mediumColorPositiveThresholds ===
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Alcuni colori inseriti sono uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minPositiveThresholds > value.maxPositiveThresholds &&
        value.minColorPositiveThresholds ===
          value.maxColorPositiveThresholds) ||
      (value.minPositiveThresholds > value.maxPositiveThresholds &&
        value.minColorPositiveThresholds ===
          value.mediumColorPositiveThresholds) ||
      (value.minPositiveThresholds > value.maxPositiveThresholds &&
        value.mediumColorPositiveThresholds ===
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Alcuni dati inseriti sono errati!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    }
  }
}
