/* eslint-disable max-classes-per-file */
class CustomValidators {
  validate(value) {
    throw new Error('You must implement this method!');
  }
}

export class ValidatePhoneNumber extends CustomValidators {
  validate(phoneNumber) {
    // Egypt Phone Number Validator
    const egyptPhoneNumberRegex = /^(?:\+20|0)(1[0-2]|15)[0-9]{8}$/;

    return egyptPhoneNumberRegex.test(phoneNumber);
  }
}

export class ValidatePassword extends CustomValidators {
  validate(password) {
    const passwordRegex = /^[a-zA-z0-9.*.!._]{8,}/;

    return passwordRegex.test(password);
  }
}
