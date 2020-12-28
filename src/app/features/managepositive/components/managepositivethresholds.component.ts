import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-managepositivethresholds',
  template: `
    <div class="container">
      <h2>Gestione soglie</h2>
      <div class="row">
        <div class="offset-md-3 col-md-6 offset-md-3">
          <form
            #f="ngForm"
            class="card card-body mt-3"
            (ngSubmit)="onSubmit(f.value)"
          >
            <label>Soglia inferiore:</label>
            Soglia attuale: {{ response.minPositiveThresholds }}
            <input
              name="minPositiveThresholds"
              [ngModel]
              type="number"
              class="form-control"
              placeholder="Inserisci soglia inferiore"
              id="minPositiveThresholds"
              required
              #minPositiveThresholds="ngModel"
              [ngClass]="{
                'is-invalid': minPositiveThresholds.invalid && f.dirty
              }"
            />

            <br />
            <label>Soglia Superiore:</label>
            Soglia attuale: {{ response.maxPositiveThresholds }}
            <input
              name="maxPositiveThresholds"
              [ngModel]
              type="number"
              class="form-control"
              placeholder="Inserisci soglia superiore"
              id="maxPositiveThresholds"
              required
              #maxPositiveThresholds="ngModel"
              [ngClass]="{
                'is-invalid': maxPositiveThresholds.invalid && f.dirty
              }"
            />
            <br />
            <button
              class="btn"
              [disabled]="f.invalid"
              [ngClass]="{ 'btn-success': f.valid, 'btn-warning': f.invalid }"
              (click)="goToMapPositive()"
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

  constructor(private http: HttpClient) {
    this.http
      .get('http://localhost:3000/soglie/1')
      .subscribe((res) => (this.response = res));
  }
  onSubmit(value: any) {
    this.http
      .patch('http://localhost:3000/soglie/1', value)
      .subscribe((res) => {
        res[1].minPositiveThresholds = value.minPositiveThresholds;
        res[1].maxPositiveThresholds = value.maxPositiveThresholds;
      });
  }

  goToMapPositive() {
    alert('Salvataggio avvenuto con successo');
    window.location.href = 'http://localhost:4200/home/mapPositive';
  }
}
