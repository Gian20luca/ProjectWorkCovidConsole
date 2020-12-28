import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managedeathsthresholds',
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
            Soglia attuale: {{ response.minDeathsThresholds }}
            <input
              name="minDeathsThresholds"
              [ngModel]
              type="number"
              class="form-control"
              placeholder="Inserisci soglia inferiore"
              id="minDeathsThresholds"
              required
              #minDeathsThresholds="ngModel"
              [ngClass]="{
                'is-invalid': minDeathsThresholds.invalid && f.dirty
              }"
            />
            <br />
            <label>Soglia Superiore:</label>
            Soglia attuale: {{ response.maxDeathsThresholds }}
            <input
              name="maxDeathsThresholds"
              [ngModel]
              type="number"
              class="form-control"
              placeholder="Inserisci soglia superiore"
              id="maxDeathsThresholds"
              required
              #maxDeathsThresholds="ngModel"
              [ngClass]="{
                'is-invalid': maxDeathsThresholds.invalid && f.dirty
              }"
            />
            <br />
            <button
              class="btn"
              [disabled]="f.invalid"
              [ngClass]="{ 'btn-success': f.valid, 'btn-warning': f.invalid }"
              (click)="goToMapDeaths()"
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
export class ManagedeathsthresholdsComponent {
  response;

  constructor(private http: HttpClient) {
    this.http
      .get('http://localhost:3000/soglie/2')
      .subscribe((res) => (this.response = res));
  }

  onSubmit(value: any) {
    this.http
      .patch('http://localhost:3000/soglie/2', value)
      .subscribe((res) => {
        res[2].minPositiveThresholds = value.minPositiveThresholds;
        res[2].maxPositiveThresholds = value.maxPositiveThresholds;
      });
  }

  goToMapDeaths() {
    window.location.href = 'http://localhost:4200/home/mapDeaths';
  }
}
