import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';
import { Router } from '@angular/router';
import { MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-managepositivethresholds',
  templateUrl: './managepositivethresholds.component.html',
  styleUrls: ['./managepositivethresholds.component.css'],
})
export class ManagepositivethresholdsComponent {
  response: any;
  constructor(private http: HttpClient, private _router: Router) {
    this.http
      .get('http://localhost:3000/soglie/1')
      .subscribe((res) => (this.response = res));
  }
  onSubmit(value: any) {
    if (
      value.minPositiveThresholds < value.maxPositiveThresholds &&
      value.minPositiveThresholds > 0 &&
      value.maxPositiveThresholds > 0 &&
      value.minPositiveThresholds < 99 &&
      value.maxPositiveThresholds < 100 &&
      value.minColorPositiveThresholds !== value.maxColorPositiveThresholds &&
      value.minColorPositiveThresholds !==
        value.mediumColorPositiveThresholds &&
      value.mediumColorPositiveThresholds !==
        value.maxColorPositiveThresholds &&
      (value.minPositiveThresholds !== this.response.minPositiveThresholds ||
        value.maxPositiveThresholds !== this.response.maxPositiveThresholds ||
        value.minColorPositiveThresholds !==
          this.response.minColorPositiveThresholds ||
        value.mediumColorPositiveThresholds !==
          this.response.mediumColorPositiveThresholds ||
        value.maxColorPositiveThresholds !==
          this.response.maxColorPositiveThresholds)
    ) {
      this.http
        .patch('http://localhost:3000/soglie/1', value)
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
    } else if (
      value.minPositiveThresholds > value.maxPositiveThresholds &&
      value.minPositiveThresholds > 0 &&
      value.maxPositiveThresholds > 0 &&
      value.minPositiveThresholds < 99 &&
      value.maxPositiveThresholds < 100 &&
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
        value.minPositiveThresholds > 0 &&
        value.maxPositiveThresholds > 0 &&
        value.minPositiveThresholds < 99 &&
        value.maxPositiveThresholds < 100 &&
        value.minColorPositiveThresholds ===
          value.maxColorPositiveThresholds) ||
      (value.minPositiveThresholds < value.maxPositiveThresholds &&
        value.minPositiveThresholds < 99 &&
        value.maxPositiveThresholds < 100 &&
        value.minPositiveThresholds > 0 &&
        value.maxPositiveThresholds > 0 &&
        value.minColorPositiveThresholds ===
          value.mediumColorPositiveThresholds) ||
      (value.minPositiveThresholds < value.maxPositiveThresholds &&
        value.minPositiveThresholds < 99 &&
        value.maxPositiveThresholds < 100 &&
        value.minPositiveThresholds > 0 &&
        value.maxPositiveThresholds > 0 &&
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
      value.minPositiveThresholds === value.maxPositiveThresholds &&
      value.minPositiveThresholds >= 0 &&
      value.maxPositiveThresholds >= 0 &&
      value.minColorPositiveThresholds !== value.maxColorPositiveThresholds &&
      value.minColorPositiveThresholds !==
        value.mediumColorPositiveThresholds &&
      value.mediumColorPositiveThresholds !== value.maxColorPositiveThresholds
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inferiore non può essere uguale alla soglia superiore!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minPositiveThresholds === value.maxPositiveThresholds &&
        value.minPositiveThresholds >= 0 &&
        value.maxPositiveThresholds >= 0 &&
        value.minColorPositiveThresholds ===
          value.maxColorPositiveThresholds) ||
      (value.minPositiveThresholds === value.maxPositiveThresholds &&
        value.minPositiveThresholds >= 0 &&
        value.maxPositiveThresholds >= 0 &&
        value.minColorPositiveThresholds ===
          value.mediumColorPositiveThresholds) ||
      (value.minPositiveThresholds === value.maxPositiveThresholds &&
        value.minPositiveThresholds >= 0 &&
        value.maxPositiveThresholds >= 0 &&
        value.mediumColorPositiveThresholds ===
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Le soglie e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minPositiveThresholds > value.maxPositiveThresholds &&
        value.minPositiveThresholds > 0 &&
        value.maxPositiveThresholds > 0 &&
        value.minPositiveThresholds < 99 &&
        value.maxPositiveThresholds < 100 &&
        value.minColorPositiveThresholds ===
          value.maxColorPositiveThresholds) ||
      (value.minPositiveThresholds > value.maxPositiveThresholds &&
        value.minPositiveThresholds > 0 &&
        value.maxPositiveThresholds > 0 &&
        value.minPositiveThresholds < 99 &&
        value.maxPositiveThresholds < 100 &&
        value.minColorPositiveThresholds ===
          value.mediumColorPositiveThresholds) ||
      (value.minPositiveThresholds > value.maxPositiveThresholds &&
        value.minPositiveThresholds > 0 &&
        value.maxPositiveThresholds > 0 &&
        value.minPositiveThresholds < 99 &&
        value.maxPositiveThresholds < 100 &&
        value.mediumColorPositiveThresholds ===
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inferiore non può essere maggiore della soglia superiore e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minPositiveThresholds < 0 &&
        value.maxPositiveThresholds < 0 &&
        value.minColorPositiveThresholds ===
          value.maxColorPositiveThresholds) ||
      (value.minPositiveThresholds < 0 &&
        value.maxPositiveThresholds < 0 &&
        value.minColorPositiveThresholds ===
          value.mediumColorPositiveThresholds) ||
      (value.minPositiveThresholds < 0 &&
        value.maxPositiveThresholds < 0 &&
        value.mediumColorPositiveThresholds ===
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'Le soglie inserite non possono essere minori di 0 e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minPositiveThresholds <= 0 || value.maxPositiveThresholds <= 0) &&
        value.minColorPositiveThresholds ===
          value.maxColorPositiveThresholds) ||
      ((value.minPositiveThresholds <= 0 || value.maxPositiveThresholds <= 0) &&
        value.minColorPositiveThresholds ===
          value.mediumColorPositiveThresholds) ||
      ((value.minPositiveThresholds <= 0 || value.maxPositiveThresholds <= 0) &&
        value.mediumColorPositiveThresholds ===
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inserita non può essere minore o uguale a 0 e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minPositiveThresholds < 0 &&
        value.maxPositiveThresholds < 0 &&
        value.minColorPositiveThresholds !==
          value.maxColorPositiveThresholds) ||
      (value.minPositiveThresholds < 0 &&
        value.maxPositiveThresholds < 0 &&
        value.minColorPositiveThresholds !==
          value.mediumColorPositiveThresholds) ||
      (value.minPositiveThresholds < 0 &&
        value.maxPositiveThresholds < 0 &&
        value.mediumColorPositiveThresholds !==
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Le soglie inserite non possono essere minori di 0!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minPositiveThresholds <= 0 || value.maxPositiveThresholds <= 0) &&
        value.minColorPositiveThresholds !==
          value.maxColorPositiveThresholds) ||
      ((value.minPositiveThresholds <= 0 || value.maxPositiveThresholds <= 0) &&
        value.minColorPositiveThresholds !==
          value.mediumColorPositiveThresholds) ||
      ((value.minPositiveThresholds <= 0 || value.maxPositiveThresholds <= 0) &&
        value.mediumColorPositiveThresholds !==
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'La soglia inserita non può essere minore o uguale a 0!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minPositiveThresholds > 98 &&
        value.maxPositiveThresholds > 99 &&
        value.minColorPositiveThresholds ===
          value.maxColorPositiveThresholds) ||
      (value.minPositiveThresholds > 98 &&
        value.maxPositiveThresholds > 99 &&
        value.minColorPositiveThresholds ===
          value.mediumColorPositiveThresholds) ||
      (value.minPositiveThresholds > 98 &&
        value.maxPositiveThresholds > 99 &&
        value.mediumColorPositiveThresholds ===
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'Le soglie inserite non possono essere maggiori o uguali a 99/100 e i colori inseriti non possono essere uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minPositiveThresholds > 98 &&
        value.maxPositiveThresholds > 99 &&
        value.minColorPositiveThresholds !==
          value.maxColorPositiveThresholds) ||
      (value.minPositiveThresholds > 98 &&
        value.maxPositiveThresholds > 99 &&
        value.minColorPositiveThresholds !==
          value.mediumColorPositiveThresholds) ||
      (value.minPositiveThresholds > 98 &&
        value.maxPositiveThresholds > 99 &&
        value.mediumColorPositiveThresholds !==
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'Le soglie inserite non possono essere maggiori o uguali a 99/100!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minPositiveThresholds > 98 || value.maxPositiveThresholds > 99) &&
        value.minColorPositiveThresholds ===
          value.maxColorPositiveThresholds) ||
      ((value.minPositiveThresholds > 99 || value.maxPositiveThresholds > 99) &&
        value.minColorPositiveThresholds ===
          value.mediumColorPositiveThresholds) ||
      ((value.minPositiveThresholds > 98 || value.maxPositiveThresholds > 99) &&
        value.mediumColorPositiveThresholds ===
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inserita non può essere maggiore o uguale a 99/100 e i colori inseriti non possono essere uguali',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      ((value.minPositiveThresholds > 98 || value.maxPositiveThresholds > 99) &&
        value.minColorPositiveThresholds !==
          value.maxColorPositiveThresholds) ||
      ((value.minPositiveThresholds > 98 || value.maxPositiveThresholds > 99) &&
        value.minColorPositiveThresholds !==
          value.mediumColorPositiveThresholds) ||
      ((value.minPositiveThresholds > 98 || value.maxPositiveThresholds > 99) &&
        value.mediumColorPositiveThresholds !==
          value.maxColorPositiveThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'La soglia inserita non può essere maggiore o uguale a 99/100!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      value.minPositiveThresholds === this.response.minPositiveThresholds &&
      value.maxPositiveThresholds === this.response.maxPositiveThresholds &&
      value.minColorPositiveThresholds ===
        this.response.minColorPositiveThresholds &&
      value.mediumColorPositiveThresholds ===
        this.response.mediumColorPositiveThresholds &&
      value.maxColorPositiveThresholds ===
        this.response.maxColorPositiveThresholds
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
