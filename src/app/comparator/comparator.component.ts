import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.scss']
})
export class ComparatorComponent {
  form
  constructor(private http: BackendService) {
    this.form = new FormGroup({
      url: new FormControl('', [Validators.required]),
      keyword: new FormControl('', [Validators.required]),
      competitors: new FormArray([
        new FormControl('', Validators.required)
      ])
    });
  }

  onSubmitForm() {
    this.http.compare(this.form.value).subscribe(
      data => console.log(data),
    );
  }

  onAddSpecialRequest() {
    this.form.controls
      .competitors.push(new FormControl('', Validators.required));
  }

  onRemoveSpecialRequest(index) {
    this.form.controls['competitors'].removeAt(index);
  }
}