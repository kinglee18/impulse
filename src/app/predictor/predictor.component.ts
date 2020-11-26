import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.scss']
})
export class PredictorComponent {

  results
  form =  new FormGroup({
    text : new FormControl('', Validators.required)
  })
  constructor(private back: BackendService) { }



  submit() {
    this.back.predict(this.form.getRawValue()).subscribe(
      (data: any) => {
        this.results = data;
        this.results.category =  JSON.stringify(data.category)
      },
    );
    
  }
}
