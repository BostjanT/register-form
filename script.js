const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show input error message
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
}

// show success outline
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Email is not valid');
	}
}

// Check required fileds
function checkRequired(inputArr) {
	inputArr.forEach(function(input) {
		/* console.log(input.value); */
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
}

// Check input length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		);
	} else {
		showSuccess(input);
	}
}

// Check password match
function checkPasswordMatch(input1, input2) {
	if (input1.value === input2.value) {
		showSuccess(input2);
	} else if (input1.value === '' && input2.value === '') {
		showError(input2, 'Password is required');
	} else {
		showError(input2, 'Passwords do not match');
	}
}

// Get fieldname make first letter uppercase
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Set fileds empty after submit
function setFieldsEmpty(input) {
	username.value = '';
	email.value = '';
	password.value = '';
	password2.value = '';
	showBlank(input);
}

// clear input fields border after submit
function showBlank(inputArr) {
	inputArr.forEach((input) => {
		const formControl = input.parentElement;
		formControl.className = 'form-control';
	});
}

// show registration successfull
function submited() {
	const text = document.querySelector('.message');
	text.className = 'message success';
	const successful = document.querySelector('h2');
	successful.innerText = 'REGISTRATION SUCCESSFUL';
}

// EVENT LISTENERS
form.addEventListener('submit', function(e) {
	e.preventDefault();

	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordMatch(password, password2);
	form.reset();

	//setFieldsEmpty([username, email, password, password2]);
	//submited();

	// WORKING IF STATEMENT
	/* if (username.value === '') {
		showError(username, 'Username is required');
	} else {
		showSuccess(username);
	}

	if (email.value === '') {
		showError(email, 'Email is required');
	} else if (!isValidEmail(email.value)) {
		showError(email, 'Email is not valid');
	} else {
		showSuccess(email);
	}

	if (password.value === '') {
		showError(password, 'Password is required');
	} else {
		showSuccess(password);
	}

	if (password2.value === '') {
		showError(password2, 'Password is required');
	} else {
		showSuccess(password2);
	} */
});
