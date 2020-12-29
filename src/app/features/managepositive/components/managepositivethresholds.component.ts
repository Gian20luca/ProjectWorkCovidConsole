import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managepositivethresholds',
  template: `
    <div class="container">
      <h2>Gestione soglie</h2>
      <div class="row">
        <div class="offset-md-3 col-md-6 offset-md-3">
          <form
          *ngIf="response"
            #f="ngForm"
            class="card card-body mt-3"
            (ngSubmit)="onSubmit(f.value)"
          >
            <label>Soglia inferiore:</label>
            <input
              name="minPositiveThresholds"
              [ngModel]="response.minPositiveThresholds"
              type="number"
              class="form-control"
              placeholder="Inserisci soglia inferiore"
              id="minPositiveThresholds"
            />

            <br />
            <label>Soglia Superiore:</label>
            <input
              name="maxPositiveThresholds"
              [ngModel]="response.maxPositiveThresholds"
              type="number"
              class="form-control"
              placeholder="Inserisci soglia superiore"
              id="maxPositiveThresholds"
            />
            <br />
            <label>Modifica Colore Primo Range</label>

            <input
              type="color"
              name="minColorPositiveThresholds"
              [ngModel]="response.minColorPositiveThresholds"
              class="form-control"
              id="minColorPositiveThresholds"
            />

            <br />

            <label>Modifica Colore Secondo Range</label>
            <input
              type="color"
              name="mediumColorPositiveThresholds"
              [ngModel]="response.mediumColorPositiveThresholds"
              class="form-control"
              id="mediumColorPositiveThresholds"
            />
            <br />

            <label>Modifica Colore Terzo Range</label>
            <input
              type="color"
              name="maxColorPositiveThresholds"
              [ngModel]="response.maxColorPositiveThresholds"
              class="form-control"
              id="maxColorPositiveThresholds"
            />
            <br />
            <button
              class="btn"
              [disabled]="f.invalid"
              [ngClass]="{ 'btn-success': f.valid, 'btn-warning': f.invalid }"
            >
              Salva
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      h2 {
        text-align: center;
        margin: 20px 0 20px 0;
      }
    `,
  ],
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
