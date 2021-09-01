import { AbstractControl, ValidationErrors } from '@angular/forms';

export function uniqueTaskName(
  group: AbstractControl
): ValidationErrors | null {
  let taskNames = group['controls'].map((item) => {
    return item.controls.name.value;
  });
  group['controls'].map((item, i) => {
    if (taskNames.indexOf(item.controls.name.value) != i) {
      item.controls.name.setErrors({ isDuplicate: true });
      return { isDuplicate: true };
    }
  });
  return null;
}
