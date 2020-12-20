import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidator {

    static   asyncForbiddenProjecName (control: FormControl): Promise<any> | Observable<any> {
        const prom = new Promise<any>((resolve, rejects) => {
            setTimeout(() => {
                if (control.value === 'test') {
                    resolve({'projectNameIsForbidden': true});
                } else {
                    resolve(null);
                }
            }, 1500);
        });
        return prom;
      }
}
