/**
 * Validation Helper
 */
class Validation {
  /**
   * checkEmptyField
   * @param {string} field
   * @returns {boolean} true|false
   */
  static checkEmptyField(field) {
    if (field === '' || field === null || field === undefined) {
      return false;
    }
    return true;
  }

  /**
   * checkEmptyFields
   * @param {array} fields
   * @returns {boolean} true|false
   */
  static checkEmptyFields(fields) {
    let errors;
    let status = true;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field.value === ''
        || field.value === null
        || field.value === undefined) {
        status = false;
        errors = { field: field.name };
      }
    }
    if (status !== true) return errors; return status;
  }

  /**
   * compareValues
   * @param {string} field1
   * @param {string} field2
   * @returns {boolean} true|false
   */
  static compareValues(field1, field2) {
    if (field1 !== field2) {
      return false;
    }
    return true;
  }
}

export default Validation;
