import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter02Component } from './chapter-02.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

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

describe('Chapter02Component', () => {
  let component: Chapter02Component;
  let fixture: ComponentFixture<Chapter02Component>;

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
      declarations: [ Chapter02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter02Component);
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

      fixture.detectChanges();

      submitFormByClick(fixture.debugElement.query(By.css('.submit')));
    });

    it('should call submit method with data', () => {
      expect(submitMethod).toHaveBeenCalledWith(mockedData);
    });
  });

  describe('when user don\'t complete form', () => {
    let submitMethod;

    beforeEach(() => {
      submitMethod = spyOn(component, 'submit');

      submitFormByClick(fixture.debugElement.query(By.css('.submit')));

      fixture.detectChanges();
    });

    it('should be disable send button', () => {
      expect(submitMethod).not.toHaveBeenCalled();
    });

    it('should be display errors', () => {
      expect(fixture.debugElement.queryAll(By.css('.alert-danger')).length).toBe(10);
    });
  });
});
