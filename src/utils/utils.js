export function checkValidity(value, rules) {
  let validity = true;

  if (rules) {
    if (rules.required) {
      validity = value.trim() !== '' && validity;
    }

    if (rules.minLength) {
      validity = value.length >= rules.minLength && validity;
    }

    if (rules.maxLength) {
      validity = value.length <= rules.maxLength && validity;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      validity = pattern.test(value) && validity
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      validity = pattern.test(value) && validity
    }
  }

  return validity;
}
