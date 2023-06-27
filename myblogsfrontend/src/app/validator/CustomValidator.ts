import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {

    // whitespace validation.
    // if (control only contain all white spaces) then control is invalid.
    // else control is valid.
    static allWhitespace(control: FormControl): ValidationErrors | null {

        // check if string only contains all white spaces
        if ((control.value != null) && (control.value.length > 0) && (control.value.trim().length === 0)) {

            // invalid, return error object
            return { allWhitespace: true };
        }
        else {
            // valid, return null
            return null;
        }

    } // end of allWhitespace()

} // end of class CustomValidator