import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';

@Component({
  selector: 'app-managedeathsthresholds',
  templateUrl: './managedeathsthresholds.component.html',
  styleUrls: ['./managedeathsthresholds.component.css'],
})
export class ManagedeathsthresholdsComponent {
  response;

  constructor(private http: HttpClient,private _router: Router) {
    this.http
      .get('http://localhost:3000/soglie/2')
      .subscribe((res) => (this.response = res));
  }

  onSubmit(value: any) {
    if (
      value.minDeathsThresholds < value.maxDeathsThresholds &&
      value.minColorDeathsThresholds !==
        value.maxColorDeathsThresholds &&
      value.minColorDeathsThresholds !==
        value.mediumColorDeathsThresholds &&
      value.mediumColorDeathsThresholds !==
        value.maxColorDeathsThresholds
    ) {
      this.http
        .patch('http://localhost:3000/soglie/2', value)
        .subscribe((res: any) => {
          res.minDeathsThresholds = value.minDeathsThresholds;
          res.maxDeathsThresholds = value.maxDeathsThresholds;
          res.minColorDeathsThresholds =
            value.minColorDeathsThresholds;
          res.mediumColorDeathsThresholds =
            value.mediumColorDeathsThresholds;
          res.maxColorDeathsThresholds =
            value.maxColorDeathsThresholds;
        });
      swal(
        {
          title: 'Salvataggio avvenuto con successo',
          text: 'I tuoi dati sono stati cambiati!',
          type: 'success',
          confirmButtonText: 'Vai alla pagina principale',
        }, () => {
          this._router.navigate(['/mapDeaths']);
        }
      );
    } else if (
      value.minDeathsThresholds > value.maxDeathsThresholds &&
      value.minColorDeathsThresholds !==
        value.maxColorDeathsThresholds &&
      value.minColorDeathsThresholds !==
        value.mediumColorDeathsThresholds &&
      value.mediumColorDeathsThresholds !==
        value.maxColorDeathsThresholds
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inferiore non può essere maggiore della soglia superiore!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minDeathsThresholds < value.maxDeathsThresholds &&
        value.minColorDeathsThresholds ===
          value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds < value.maxDeathsThresholds &&
        value.minColorDeathsThresholds ===
          value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds < value.maxDeathsThresholds &&
        value.mediumColorDeathsThresholds ===
          value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Alcuni colori inseriti sono uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minDeathsThresholds > value.maxDeathsThresholds &&
        value.minColorDeathsThresholds ===
          value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds > value.maxDeathsThresholds &&
        value.minColorDeathsThresholds ===
          value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds > value.maxDeathsThresholds &&
        value.mediumColorDeathsThresholds ===
          value.maxColorDeathsThresholds)
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
