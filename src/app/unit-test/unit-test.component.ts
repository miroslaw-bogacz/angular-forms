import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tested-form',
  templateUrl: './unit-test.component.html',
  styleUrls: ['./unit-test.component.css']
})
export class UnitTestComponent implements OnInit {

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
      newsletter: [ '' ],
      agreements: [ '' ],
      description: [ '' ],
      currency: [ '' ]
    });
  }

  public submit(value: any): void {
    console.log(value);
  }

}
