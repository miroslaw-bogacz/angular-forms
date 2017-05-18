import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chapter-02',
  templateUrl: './chapter-02.component.html',
  styleUrls: ['./chapter-02.component.css']
})
export class Chapter02Component implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.getForm();
  }

  public getForm(): FormGroup {
    return this.fb.group({
      name: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required ] ],
      issue: [ '', [ Validators.required ] ],
      agreements: this.fb.group({
        newsletter: [ false, [ Validators.requiredTrue ] ],
        rules: [ false, [ Validators.requiredTrue ] ]
      }),
      steps: this.fb.array([
        [ '', [ Validators.required ] ],
        [ '', [ Validators.required ] ],
        [ '', [ Validators.required ] ],
        [ '', [ Validators.required ] ]
      ]),
      description: [ '', [ Validators.required ] ],
    });
  }

  public submit(values: any): void {
    // console.log(values);
  }

}
