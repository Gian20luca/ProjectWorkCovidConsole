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

  constructor(private http: HttpClient, private _router: Router) {
    this.http
      .get('http://localhost:3000/soglie/3')
      .subscribe((res) => (this.response = res));
  }

  onSubmit(value: any) {
    if (
      value.minAsymptomaticThresholds < value.maxAsymptomaticThresholds &&
      value.minAsymptomaticThresholds > 0 &&
      value.maxAsymptomaticThresholds > 0 &&
      value.minAsymptomaticThresholds < 99 &&
      value.maxAsymptomaticThresholds < 100 &&
      value.minColorAsymptomaticThresholds !== value.maxColorAsymptomaticThresholds &&
      value.minColorAsymptomaticThresholds !==
        value.mediumColorAsymptomaticThresholds &&
      value.mediumColorAsymptomaticThresholds !== value.maxColorAsymptomaticThresholds
    ) {
      this.http
        .patch('http://localhost:3000/soglie/3', value)
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
    } else if (
      value.minAsymptomaticThresholds > value.maxAsymptomaticThresholds &&
      value.minAsymptomaticThresholds > 0 &&
      value.maxAsymptomaticThresholds > 0 &&
      value.minAsymptomaticThresholds < 99 &&
      value.maxAsymptomaticThresholds < 100 &&
      value.minColorAsymptomaticThresholds !== value.maxColorAsymptomaticThresholds &&
      value.minColorAsymptomaticThresholds !==
        value.mediumColorAsymptomaticThresholds &&
      value.mediumColorAsymptomaticThresholds !== value.maxColorAsymptomaticThresholds
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
        value.minAsymptomaticThresholds > 0 &&
        value.maxAsymptomaticThresholds > 0 &&
        value.minAsymptomaticThresholds < 99 &&
        value.maxAsymptomaticThresholds < 100 &&
        value.minColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds < value.maxAsymptomaticThresholds &&
        value.minAsymptomaticThresholds < 99 &&
        value.maxAsymptomaticThresholds < 100 &&
        value.minAsymptomaticThresholds > 0 &&
        value.maxAsymptomaticThresholds > 0 &&
        value.minColorAsymptomaticThresholds ===
          value.mediumColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds < value.maxAsymptomaticThresholds &&
        value.minAsymptomaticThresholds < 99 &&
        value.maxAsymptomaticThresholds < 100 &&
        value.minAsymptomaticThresholds > 0 &&
        value.maxAsymptomaticThresholds > 0 &&
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
      value.minAsymptomaticThresholds === value.maxAsymptomaticThresholds &&
      value.minAsymptomaticThresholds >= 0 &&
      value.maxAsymptomaticThresholds >= 0 &&
      value.minColorAsymptomaticThresholds !== value.maxColorAsymptomaticThresholds &&
      value.minColorAsymptomaticThresholds !==
        value.mediumColorAsymptomaticThresholds &&
      value.mediumColorAsymptomaticThresholds !== value.maxColorAsymptomaticThresholds
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inferiore non può essere uguale alla soglia superiore!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minAsymptomaticThresholds === value.maxAsymptomaticThresholds &&
        value.minAsymptomaticThresholds >= 0 &&
        value.maxAsymptomaticThresholds >= 0 &&
        value.minColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds === value.maxAsymptomaticThresholds &&
        value.minAsymptomaticThresholds >= 0 &&
        value.maxAsymptomaticThresholds >= 0 &&
        value.minColorAsymptomaticThresholds ===
          value.mediumColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds === value.maxAsymptomaticThresholds &&
        value.minAsymptomaticThresholds >= 0 &&
        value.maxAsymptomaticThresholds >= 0 &&
        value.mediumColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Le soglie e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minAsymptomaticThresholds > value.maxAsymptomaticThresholds &&
        value.minAsymptomaticThresholds > 0 &&
        value.maxAsymptomaticThresholds > 0 &&
        value.minAsymptomaticThresholds < 99 &&
        value.maxAsymptomaticThresholds < 100 &&
        value.minColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds > value.maxAsymptomaticThresholds &&
        value.minAsymptomaticThresholds > 0 &&
        value.maxAsymptomaticThresholds > 0 &&
        value.minAsymptomaticThresholds < 99 &&
        value.maxAsymptomaticThresholds < 100 &&
        value.minColorAsymptomaticThresholds ===
          value.mediumColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds > value.maxAsymptomaticThresholds &&
        value.minAsymptomaticThresholds > 0 &&
        value.maxAsymptomaticThresholds > 0 &&
        value.minAsymptomaticThresholds < 99 &&
        value.maxAsymptomaticThresholds < 100 &&
        value.mediumColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inferiore non può essere maggiore della soglia superiore e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minAsymptomaticThresholds < 0 &&
        value.maxAsymptomaticThresholds < 0 &&
        value.minColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds < 0 &&
        value.maxAsymptomaticThresholds < 0 &&
        value.minColorAsymptomaticThresholds ===
          value.mediumColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds < 0 &&
        value.maxAsymptomaticThresholds < 0 &&
        value.mediumColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'Le soglie inserite non possono essere minori di 0 e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minAsymptomaticThresholds < 0 || value.maxAsymptomaticThresholds < 0) &&
        value.minColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds) ||
      ((value.minAsymptomaticThresholds < 0 || value.maxAsymptomaticThresholds < 0) &&
        value.minColorAsymptomaticThresholds ===
          value.mediumColorAsymptomaticThresholds) ||
      ((value.minAsymptomaticThresholds < 0 || value.maxAsymptomaticThresholds < 0) &&
        value.mediumColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inserita non può essere minore di 0 e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minAsymptomaticThresholds < 0 &&
        value.maxAsymptomaticThresholds < 0 &&
        value.minColorAsymptomaticThresholds !==
          value.maxColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds < 0 &&
        value.maxAsymptomaticThresholds < 0 &&
        value.minColorAsymptomaticThresholds !==
          value.mediumColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds < 0 &&
        value.maxAsymptomaticThresholds < 0 &&
        value.mediumColorAsymptomaticThresholds !==
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Le soglie inserite non possono essere minori di 0!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minAsymptomaticThresholds < 0 || value.maxAsymptomaticThresholds < 0) &&
        value.minColorAsymptomaticThresholds !==
          value.maxColorAsymptomaticThresholds) ||
      ((value.minAsymptomaticThresholds < 0 || value.maxAsymptomaticThresholds < 0) &&
        value.minColorAsymptomaticThresholds !==
          value.mediumColorAsymptomaticThresholds) ||
      ((value.minAsymptomaticThresholds < 0 || value.maxAsymptomaticThresholds < 0) &&
        value.mediumColorAsymptomaticThresholds !==
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'La soglia inserita non può essere minore di 0!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minAsymptomaticThresholds > 98 &&
        value.maxAsymptomaticThresholds > 99 &&
        value.minColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds > 98 &&
        value.maxAsymptomaticThresholds > 99 &&
        value.minColorAsymptomaticThresholds ===
          value.mediumColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds > 98 &&
        value.maxAsymptomaticThresholds > 99 &&
        value.mediumColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'Le soglie inserite non possono essere maggiori o uguali a 99/100 e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minAsymptomaticThresholds > 98 &&
        value.maxAsymptomaticThresholds > 99 &&
        value.minColorAsymptomaticThresholds !==
          value.maxColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds > 98 &&
        value.maxAsymptomaticThresholds > 99 &&
        value.minColorAsymptomaticThresholds !==
          value.mediumColorAsymptomaticThresholds) ||
      (value.minAsymptomaticThresholds > 98 &&
        value.maxAsymptomaticThresholds > 99 &&
        value.mediumColorAsymptomaticThresholds !==
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'Le soglie inserite non possono essere maggiori o uguali a 99/100!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minAsymptomaticThresholds > 98 || value.maxAsymptomaticThresholds > 99) &&
        value.minColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds) ||
      ((value.minAsymptomaticThresholds > 99 || value.maxAsymptomaticThresholds > 99) &&
        value.minColorAsymptomaticThresholds ===
          value.mediumColorAsymptomaticThresholds) ||
      ((value.minAsymptomaticThresholds > 98 || value.maxAsymptomaticThresholds > 99) &&
        value.mediumColorAsymptomaticThresholds ===
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inserita non può essere maggiore o uguale a 99/100 e i colori inseriti non possono essere uguali',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minAsymptomaticThresholds > 98 || value.maxAsymptomaticThresholds > 99) &&
        value.minColorAsymptomaticThresholds !==
          value.maxColorAsymptomaticThresholds) ||
      ((value.minAsymptomaticThresholds > 98 || value.maxAsymptomaticThresholds > 99) &&
        value.minColorAsymptomaticThresholds !==
          value.mediumColorAsymptomaticThresholds) ||
      ((value.minAsymptomaticThresholds > 98 || value.maxAsymptomaticThresholds > 99) &&
        value.mediumColorAsymptomaticThresholds !==
          value.maxColorAsymptomaticThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'La soglia inserita non può essere maggiore o uguale a 99/100!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    }
  }
}
