import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter01Component } from './chapter-01.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

function changeTextValue(input: DebugElement, value: string): void {
  input.nativeElement.value = value;
  input.triggerEventHandler('input', { target: { value } });
}

function changeRadioButtonValue(inputs: Array<DebugElement>, value: string): void {
  const input: DebugElement = inputs
    .filter((field: DebugElement) => field.nativeElement.value === value)
    .reduce((acc: DebugElement, field: DebugElement) => field, null);

  if (input) {
    input.nativeElement.click();
  }
}

function changeCheckboxStatus(input: DebugElement, checked: boolean): void {
  input.nativeElement.checked = checked;
  input.nativeElement.dispatchEvent(new Event('change'));
}

function changeSelectValue(input: DebugElement, value: string): void {
  input.nativeElement.selectedIndex = input.nativeElement.selectedIndex = input.queryAll(By.css('option'))
    .findIndex((option: DebugElement) => option.nativeElement.value === value);

  input.nativeElement.dispatchEvent(new Event('change'));
}

function submitFormByClick(button: DebugElement): void {
  button.nativeElement.click();
}

describe('Chapter01Component', () => {
  let component: Chapter01Component;
  let fixture: ComponentFixture<Chapter01Component>;

  const mockedData: any = {
    name: 'John Smith',
    email: 'john.smith@mail.com',
    issue: '0',
    agreements: {
      newsletter: true,
      rules: true
    },
    steps: [
      'step 1', 'step 2', 'step 3', 'step 4'
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ Chapter01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when user complete form and click send button', () => {
    let submitMethod;

    beforeEach(() => {
      submitMethod = spyOn(component, 'submit');

      changeTextValue(fixture.debugElement.query(By.css('input[formControlName="name"]')), mockedData.name);

      changeTextValue(fixture.debugElement.query(By.css('input[formControlName="email"]')), mockedData.email);

      changeSelectValue(fixture.debugElement.query(By.css('select[formControlName="issue"]')), mockedData.issue);

      changeCheckboxStatus(
        fixture.debugElement.query(By.css('input[formControlName="newsletter"]')),
        mockedData.agreements.newsletter
      );

      changeCheckboxStatus(
        fixture.debugElement.query(By.css('input[formControlName="rules"]')),
        mockedData.agreements.rules
      );

      mockedData.steps.forEach((value: string, key: number) => {
        changeTextValue(
          fixture.debugElement.queryAll(By.css('div[formArrayName="steps"] .step'))[key],
          mockedData.steps[key]
        );
      });

      changeTextValue(
        fixture.debugElement.query(By.css('textarea[formControlName="description"]')),
        mockedData.description
      );

      submitFormByClick(fixture.debugElement.query(By.css('.submit')));

      fixture.detectChanges();
    });

    it('should call submit method with data', () => {
      expect(submitMethod).toHaveBeenCalledWith(mockedData);
    });
  });

  describe('when user click "Set form values" button', () => {
    beforeEach(() => {
      fixture.debugElement.query(By.css('.set-values')).nativeElement.click();

      fixture.detectChanges();
    });

    it('should be set the form values', () => {
      expect(component.form.value).toEqual(mockedData);
    });
  });

  describe('when user click "Set name and email values" button', () => {
    beforeEach(() => {
      fixture.debugElement.query(By.css('.set-name-email-values')).nativeElement.click();

      fixture.detectChanges();
    });

    it('should be set name and email values', () => {
      expect(component.form.value).toEqual({
        name: 'John Smith',
        email: 'john.smith@mail.com',
        issue: '',
        agreements: {
          newsletter: false,
          rules: false
        },
        steps: [ '', '', '', '' ],
        description: ''
      });
    });
  });
});
