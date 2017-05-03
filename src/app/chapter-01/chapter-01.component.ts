import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chapter-01',
  templateUrl: './chapter-01.component.html',
  styleUrls: ['./chapter-01.component.css']
})
export class Chapter01Component implements OnInit {

  private form: FormGroup;

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
      description: [ '' ]
    });
  }

}
