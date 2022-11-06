import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
    
export function ConfirmedValidator(controlName: string, matchingControlName: string):ValidatorFn{
    return (controls: AbstractControl) => {
        const control = controls.get(controlName);
        const matchingControl = controls.get(matchingControlName);
        if (matchingControl!.errors && !matchingControl!.errors['confirmedValidator']) {
            return null;
        }
        if (control!.value !== matchingControl!.value) {
            matchingControl!.setErrors({ confirmedValidator: true });
            return { ConfirmedValidator:true}
        } else {
            return null;
        }
    }
}