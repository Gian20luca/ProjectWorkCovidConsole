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
  response: any;

  constructor(private http: HttpClient, private _router: Router) {
    this.http
      .get('http://localhost:3000/soglie/2')
      .subscribe((res) => (this.response = res));
  }

  onSubmit(value: any) {
    if (
      value.minDeathsThresholds < value.maxDeathsThresholds &&
      value.minDeathsThresholds > 0 &&
      value.maxDeathsThresholds > 0 &&
      value.minDeathsThresholds < 99 &&
      value.maxDeathsThresholds < 100 &&
      value.minColorDeathsThresholds !== value.maxColorDeathsThresholds &&
      value.minColorDeathsThresholds !== value.mediumColorDeathsThresholds &&
      value.mediumColorDeathsThresholds !== value.maxColorDeathsThresholds &&
      (value.minDeathsThresholds !== this.response.minDeathsThresholds ||
        value.maxDeathsThresholds !== this.response.maxDeathsThresholds ||
        value.minColorDeathsThresholds !==
          this.response.minColorDeathsThresholds ||
        value.mediumColorDeathsThresholds !==
          this.response.mediumColorDeathsThresholds ||
        value.maxColorDeathsThresholds !==
          this.response.maxColorDeathsThresholds)
    ) {
      this.http
        .patch('http://localhost:3000/soglie/2', value)
        .subscribe(() => {});
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
    } else if (
      value.minDeathsThresholds > value.maxDeathsThresholds &&
      value.minDeathsThresholds > 0 &&
      value.maxDeathsThresholds > 0 &&
      value.minDeathsThresholds < 99 &&
      value.maxDeathsThresholds < 100 &&
      value.minColorDeathsThresholds !== value.maxColorDeathsThresholds &&
      value.minColorDeathsThresholds !== value.mediumColorDeathsThresholds &&
      value.mediumColorDeathsThresholds !== value.maxColorDeathsThresholds
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
        value.minDeathsThresholds > 0 &&
        value.maxDeathsThresholds > 0 &&
        value.minDeathsThresholds < 99 &&
        value.maxDeathsThresholds < 100 &&
        value.minColorDeathsThresholds === value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds < value.maxDeathsThresholds &&
        value.minDeathsThresholds < 99 &&
        value.maxDeathsThresholds < 100 &&
        value.minDeathsThresholds > 0 &&
        value.maxDeathsThresholds > 0 &&
        value.minColorDeathsThresholds === value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds < value.maxDeathsThresholds &&
        value.minDeathsThresholds < 99 &&
        value.maxDeathsThresholds < 100 &&
        value.minDeathsThresholds > 0 &&
        value.maxDeathsThresholds > 0 &&
        value.mediumColorDeathsThresholds === value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Alcuni colori inseriti sono uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      value.minDeathsThresholds === value.maxDeathsThresholds &&
      value.minDeathsThresholds >= 0 &&
      value.maxDeathsThresholds >= 0 &&
      value.minColorDeathsThresholds !== value.maxColorDeathsThresholds &&
      value.minColorDeathsThresholds !== value.mediumColorDeathsThresholds &&
      value.mediumColorDeathsThresholds !== value.maxColorDeathsThresholds
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inferiore non può essere uguale alla soglia superiore!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minDeathsThresholds === value.maxDeathsThresholds &&
        value.minDeathsThresholds >= 0 &&
        value.maxDeathsThresholds >= 0 &&
        value.minColorDeathsThresholds === value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds === value.maxDeathsThresholds &&
        value.minDeathsThresholds >= 0 &&
        value.maxDeathsThresholds >= 0 &&
        value.minColorDeathsThresholds === value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds === value.maxDeathsThresholds &&
        value.minDeathsThresholds >= 0 &&
        value.maxDeathsThresholds >= 0 &&
        value.mediumColorDeathsThresholds === value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Le soglie e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minDeathsThresholds > value.maxDeathsThresholds &&
        value.minDeathsThresholds > 0 &&
        value.maxDeathsThresholds > 0 &&
        value.minDeathsThresholds < 99 &&
        value.maxDeathsThresholds < 100 &&
        value.minColorDeathsThresholds === value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds > value.maxDeathsThresholds &&
        value.minDeathsThresholds > 0 &&
        value.maxDeathsThresholds > 0 &&
        value.minDeathsThresholds < 99 &&
        value.maxDeathsThresholds < 100 &&
        value.minColorDeathsThresholds === value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds > value.maxDeathsThresholds &&
        value.minDeathsThresholds > 0 &&
        value.maxDeathsThresholds > 0 &&
        value.minDeathsThresholds < 99 &&
        value.maxDeathsThresholds < 100 &&
        value.mediumColorDeathsThresholds === value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inferiore non può essere maggiore della soglia superiore e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minDeathsThresholds < 0 &&
        value.maxDeathsThresholds < 0 &&
        value.minColorDeathsThresholds === value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds < 0 &&
        value.maxDeathsThresholds < 0 &&
        value.minColorDeathsThresholds === value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds < 0 &&
        value.maxDeathsThresholds < 0 &&
        value.mediumColorDeathsThresholds === value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'Le soglie inserite non possono essere minori di 0 e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minDeathsThresholds <= 0 || value.maxDeathsThresholds <= 0) &&
        value.minColorDeathsThresholds === value.maxColorDeathsThresholds) ||
      ((value.minDeathsThresholds <= 0 || value.maxDeathsThresholds <= 0) &&
        value.minColorDeathsThresholds === value.mediumColorDeathsThresholds) ||
      ((value.minDeathsThresholds <= 0 || value.maxDeathsThresholds <= 0) &&
        value.mediumColorDeathsThresholds === value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inserita non può essere minore o uguale a 0 e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minDeathsThresholds < 0 &&
        value.maxDeathsThresholds < 0 &&
        value.minColorDeathsThresholds !== value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds < 0 &&
        value.maxDeathsThresholds < 0 &&
        value.minColorDeathsThresholds !== value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds < 0 &&
        value.maxDeathsThresholds < 0 &&
        value.mediumColorDeathsThresholds !== value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Le soglie inserite non possono essere minori di 0!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minDeathsThresholds <= 0 || value.maxDeathsThresholds <= 0) &&
        value.minColorDeathsThresholds !== value.maxColorDeathsThresholds) ||
      ((value.minDeathsThresholds <= 0 || value.maxDeathsThresholds <= 0) &&
        value.minColorDeathsThresholds !== value.mediumColorDeathsThresholds) ||
      ((value.minDeathsThresholds <= 0 || value.maxDeathsThresholds <= 0) &&
        value.mediumColorDeathsThresholds !== value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'La soglia inserita non può essere minore o uguale a 0!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minDeathsThresholds > 98 &&
        value.maxDeathsThresholds > 99 &&
        value.minColorDeathsThresholds === value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds > 98 &&
        value.maxDeathsThresholds > 99 &&
        value.minColorDeathsThresholds === value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds > 98 &&
        value.maxDeathsThresholds > 99 &&
        value.mediumColorDeathsThresholds === value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'Le soglie inserite non possono essere maggiori o uguali a 99/100 e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minDeathsThresholds > 98 &&
        value.maxDeathsThresholds > 99 &&
        value.minColorDeathsThresholds !== value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds > 98 &&
        value.maxDeathsThresholds > 99 &&
        value.minColorDeathsThresholds !== value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds > 98 &&
        value.maxDeathsThresholds > 99 &&
        value.mediumColorDeathsThresholds !== value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'Le soglie inserite non possono essere maggiori o uguali a 99/100!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minDeathsThresholds > 98 || value.maxDeathsThresholds > 99) &&
        value.minColorDeathsThresholds === value.maxColorDeathsThresholds) ||
      ((value.minDeathsThresholds > 99 || value.maxDeathsThresholds > 99) &&
        value.minColorDeathsThresholds === value.mediumColorDeathsThresholds) ||
      ((value.minDeathsThresholds > 98 || value.maxDeathsThresholds > 99) &&
        value.mediumColorDeathsThresholds === value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inserita non può essere maggiore o uguale a 99/100 e i colori inseriti non possono essere uguali',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minDeathsThresholds > 98 || value.maxDeathsThresholds > 99) &&
        value.minColorDeathsThresholds !== value.maxColorDeathsThresholds) ||
      ((value.minDeathsThresholds > 98 || value.maxDeathsThresholds > 99) &&
        value.minColorDeathsThresholds !== value.mediumColorDeathsThresholds) ||
      ((value.minDeathsThresholds > 98 || value.maxDeathsThresholds > 99) &&
        value.mediumColorDeathsThresholds !== value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'La soglia inserita non può essere maggiore o uguale a 99/100!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      value.minDeathsThresholds === this.response.minDeathsThresholds &&
      value.maxDeathsThresholds === this.response.maxDeathsThresholds &&
      value.minColorDeathsThresholds ===
        this.response.minColorDeathsThresholds &&
      value.mediumColorDeathsThresholds ===
        this.response.mediumColorDeathsThresholds &&
      value.maxColorDeathsThresholds === this.response.maxColorDeathsThresholds
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Questi dati sono già inseriti',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    }
  }
}
