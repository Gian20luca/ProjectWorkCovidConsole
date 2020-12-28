import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manageasymptomaticthresholds',
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
            Soglia attuale: {{ response.minAsymptomaticThresholds }}
            <input
              name="minAsymptomaticThresholds"
              [ngModel]
              type="number"
              class="form-control"
              placeholder="Inserisci soglie inferiore"
              id="minAsymptomaticThresholds"
              required
              #minAsymptomaticThresholds="ngModel"
              [ngClass]="{
                'is-invalid': minAsymptomaticThresholds.invalid && f.dirty
              }"
            />
            <br />
            <label>Soglia Superiore:</label>
            Soglia attuale: {{ response.maxAsymptomaticThresholds }}
            <input
              name="maxAsymptomaticThresholds"
              [ngModel]
              type="number"
              class="form-control"
              placeholder="Inserisci soglie superiore"
              id="maxAsymptomaticThresholds"
              required
              #maxAsymptomaticThresholds="ngModel"
              [ngClass]="{
                'is-invalid': maxAsymptomaticThresholds.invalid && f.dirty
              }"
            />
            <br />
            <button
              class="btn"
              [disabled]="f.invalid"
              [ngClass]="{ 'btn-success': f.valid, 'btn-warning': f.invalid }"
              (click)="goToMapAsymptomatic()"
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

  constructor(private http: HttpClient) {
    this.http
      .get('http://localhost:3000/soglie/3')
      .subscribe((res) => (this.response = res));
  }

  onSubmit(value: any) {
    this.http
      .patch('http://localhost:3000/soglie/3', value)
      .subscribe((res) => {
        res[3].minAsymptomaticThresholds = value.minAsymptomaticThresholds;
        res[3].maxAsymptomaticThresholds = value.maxAsymptomaticThresholds;
      });
  }

  goToMapAsymptomatic() {
    window.location.href = 'http://localhost:4200/home/mapAsymptomatic';
  }
}
