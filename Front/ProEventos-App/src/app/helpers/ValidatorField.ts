import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidatorField {
  static MustMatch(controlName: string, matchingCN: string): any{
    return(group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingCN];

      if(matchingControl.errors && !matchingControl.errors.mustMatch){
        return null;
      }

      if(control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch : true});
      }
      else{
        matchingControl.setErrors(null);
      }

      return null;
    }
  }
}
