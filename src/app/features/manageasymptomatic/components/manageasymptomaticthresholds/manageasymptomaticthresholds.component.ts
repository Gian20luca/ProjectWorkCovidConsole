import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';

@Component({
  selector: 'app-manageasymptomaticthresholds',
  templateUrl: './manageasymptomaticthresholds.component.html',
  styleUrls: ['./manageasymptomaticthresholds.component.css'],
})
export class ManageasymptomaticthresholdsComponent {
  response;

  constructor(private http: HttpClient,private _router: Router) {
    this.http
      .get('http://localhost:3000/soglie/3')
      .subscribe((res) => (this.response = res));
  }

  onSubmit(value: any) {
    if (
      value.minAsymptomaticThresholds < value.maxAsymptomaticThresholds &&
      value.minColorAsymptomaticThresholds !==
        value.maxColorAsymptomaticThresholds &&
      value.minColorAsymptomaticThresholds !==
        value.mediumColorAsymptomaticThresholds &&
      value.mediumColorAsymptomaticThresholds !==
        value.maxColorAsymptomaticThresholds
    ) {
      this.http
        .patch('http://localhost:3000/soglie/3', value)
        .subscribe((res: any) => {
          res.minAsymptomaticThresholds = value.minAsymptomaticThresholds;
          res.maxAsymptomaticThresholds = value.maxAsymptomaticThresholds;
          res.minColorAsymptomaticThresholds =
            value.minColorAsymptomaticThresholds;
          res.mediumColorAsymptomaticThresholds =
            value.mediumColorAsymptomaticThresholds;
          res.maxColorAsymptomaticThresholds =
            value.maxColorAsymptomaticThresholds;
        });
      swal(
        {
          title: 'Salvataggio avvenuto con successo',
          text: 'I tuoi dati sono stati cambiati!',
          type: 'success',
          confirmButtonText: 'Vai alla pagina principale',
        },() => {
          this._router.navigate(['/mapAsymptomatic']);
        }
      );
    } else if (
      value.minAsymptomaticThresholds > value.maxAsymptomaticThresholds &&
      value.minColorAsymptomaticThresholds !==
        value.maxColorAsymptomaticThresholds &&
      value.minColorAsymptomaticThresholds !==
        value.mediumColorAsymptomaticThresholds &&
      value.mediumColorAsymptomaticThresholds !==
        value.maxColorAsymptomaticThresholds
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inferiore non può essere maggiore della soglia superiore!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minAsymptomaticThresholds < value.maxAsymptomaticThresholds &&
        value.minColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds < value.maxAsymptomaticThresholds &&
        value.minColorAsymptomaticThresholds ===
          value.mediumColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds < value.maxAsymptomaticThresholds &&
        value.mediumColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Alcuni colori inseriti sono uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minAsymptomaticThresholds > value.maxAsymptomaticThresholds &&
        value.minColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds > value.maxAsymptomaticThresholds &&
        value.minColorAsymptomaticThresholds ===
          value.mediumColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds > value.maxAsymptomaticThresholds &&
        value.mediumColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds)
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
