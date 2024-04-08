import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customNumberValidator(digitsAfterDecimal: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const isValid = new RegExp(`^\\d+(\\.\\d{0,${digitsAfterDecimal}})?$`).test(value);
    return isValid ? null : { 'invalidNumber': { value: control.value } };
  };
}
