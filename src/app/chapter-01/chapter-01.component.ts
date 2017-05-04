import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { formData } from './data/form-data';

@Component({
  selector: 'app-chapter-01',
  templateUrl: './chapter-01.component.html',
  styleUrls: ['./chapter-01.component.css']
})
export class Chapter01Component implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.getForm();
  }

  public getForm(): FormGroup {
    return this.fb.group({
      name: [ '' ],
      email: [ '' ],
      issue: [ '' ],
      agreements: this.fb.group({
        newsletter: [ false ],
        rules: [ false ]
      }),
      steps: this.fb.array([
        [ '' ],
        [ '' ],
        [ '' ],
        [ '' ]
      ]),
      description: [ '' ],
    });
  }

  public submit(values: any): void {
    // console.log(values);
  }

  public setValuesForm(): void {
    console.log('test');
    this.form.setValue(formData);
  }

  public patchValue(): void {
    this.form.patchValue({
      name: 'John Smith',
      email: 'john.smith@mail.com'
    });
  }

}
