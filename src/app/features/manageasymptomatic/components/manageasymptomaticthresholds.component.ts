import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';

@Component({
  selector: 'app-manageasymptomaticthresholds',
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
              name="minAsymptomaticThresholds"
              [ngModel]="response.minAsymptomaticThresholds"
              type="number"
              class="form-control"
              placeholder="Inserisci soglie inferiore"
              id="minAsymptomaticThresholds"
            />
            <br />
            <label>Soglia Superiore:</label>
            <input
              name="maxAsymptomaticThresholds"
              [ngModel]="response.maxAsymptomaticThresholds"
              type="number"
              class="form-control"
              placeholder="Inserisci soglie superiore"
              id="maxAsymptomaticThresholds"
            />
            <br />
            <label>Modifica Colore Primo Range</label>

            <input
              type="color"
              name="minColorAsymptomaticThresholds"
              [ngModel]="response.minColorAsymptomaticThresholds"
              class="form-control"
              id="minColorAsymptomaticThresholds"
            />

            <br />

            <label>Modifica Colore Secondo Range</label>
            <input
              type="color"
              name="mediumColorAsymptomaticThresholds"
              [ngModel]="response.mediumColorAsymptomaticThresholds"
              class="form-control"
              id="mediumColorAsymptomaticThresholds"
            />
            <br />

            <label>Modifica Colore Terzo Range</label>
            <input
              type="color"
              name="maxColorAsymptomaticThresholds"
              [ngModel]="response.maxColorAsymptomaticThresholds"
              class="form-control"
              id="maxColorAsymptomaticThresholds"
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
