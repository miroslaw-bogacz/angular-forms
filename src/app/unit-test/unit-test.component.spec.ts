import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTestComponent } from './unit-test.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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

describe('UnitTestComponent', () => {
  let component: UnitTestComponent;
  let fixture: ComponentFixture<UnitTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ UnitTestComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when user change input text value', () => {
    let value: string;

    beforeEach(() => {
      value = 'John';

      changeTextValue(
        fixture.debugElement.query(By.css('.name')),
        value
      );
    });

    it('should be change value in formControl', () => {
      expect(component.form.get('name').value).toBe(value);
    });
  });

  describe('when user clicks on radio input', () => {
    let value: string;

    beforeEach(() => {
      value = 'first-value';

      changeRadioButtonValue(
        fixture.debugElement.queryAll(By.css('.newsletter')),
        value
      );
    });

    it('should be change value in formControl', () => {
      expect(component.form.get('newsletter').value).toBe(value);
    });
  });

  describe('when checkbox is unchecked and user clicks on checkbox input', () => {
    let value: boolean;

    beforeEach(() => {
      value = true;

      changeCheckboxStatus(
        fixture.debugElement.query(By.css('.agreements')),
        value
      );
    });

    it('should be change value in formControl', () => {
      expect(component.form.get('agreements').value).toBe(value);
    });
  });

  describe('when user change text in textarea', () => {
    let value: string;

    beforeEach(() => {
      value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

      changeTextValue(
        fixture.debugElement.query(By.css('.description')),
        value
      );
    });

    it('should be change value in formControl', () => {
      expect(component.form.get('description').value).toBe(value);
    });
  });

  describe('when user change selected option in select', () => {
    let value: string;

    beforeEach(() => {
      value = 'EUR';

      changeSelectValue(
        fixture.debugElement.query(By.css('.currency')),
        value
      );
    });

    it('should be change value in formControl', () => {
      expect(component.form.get('currency').value).toBe(value);
    });
  });

  describe('when user submit form', () => {
    let value: any,
        submit;

    beforeEach(() => {
      submit = spyOn(component, 'submit');

      value = {
        name: 'John',
        newsletter: 'second-value',
        agreements: true,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        currency: 'EUR'
      };

      changeTextValue(fixture.debugElement.query(By.css('.name')), value.name);
      changeRadioButtonValue(fixture.debugElement.queryAll(By.css('.newsletter')), value.newsletter);
      changeCheckboxStatus(fixture.debugElement.query(By.css('.agreements')), true);
      changeTextValue(fixture.debugElement.query(By.css('.description')), value.description);
      changeSelectValue(fixture.debugElement.query(By.css('.currency')), value.currency);
      submitFormByClick(fixture.debugElement.query(By.css('button')));
    });

    it('should be call submit method with form value', () => {
      expect(submit).toHaveBeenCalledWith(value);
    });
  });
});
