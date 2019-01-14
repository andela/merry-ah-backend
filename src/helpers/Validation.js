class Validation {
	static checkEmptyField(field){
		if (field==='' || field===null || field===undefined){
			return false;
		}
		return true;
	}
	static checkEmptyFields(fields){
		let errors;
		let status = true;
		for (let i = 0; i < fields.length; i++) {
			const field = fields[i];
			if (field.value==='' || field.value===null || field.value===undefined){
				status = false;
				errors = {field:field.name};
			}
		}
		if (status!==true)return errors; else return status;
	}
	static compareValues(field1, field2){
		if (field1!==field2){
			return false;
		}
		return true;
	}
}

export default Validation;
