var nameInput = document.querySelector('input#name');
var emailInput = document.querySelector('input#email');
var passwordInput = document.querySelector('input#password');
var nameErrorText = document.querySelector('p#name-error');
var emailErrorText = document.querySelector('p#email-error');
var passwordErrorText = document.querySelector('p#password-error');
var errorText = document.querySelector('p#sign-up-error');

var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.com$/i;

var accounts = [];
if (localStorage.getItem('accounts') != null) {
    accounts = JSON.parse(localStorage.getItem('accounts'));
}

document.querySelector('button.btn').addEventListener('click', function () {
    errorText.classList.add('d-none');
    var isNameValid = validateName();
    var isEmailValid = validateEmail();
    var isPasswrodValid = validatePassword();
    if (isNameValid && isEmailValid && isPasswrodValid) {
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].email == emailInput.value) {
                errorText.innerHTML = "This email exists please try another one";
                errorText.classList.remove('d-none');
                return;
            }
            
        }
        accounts.push({
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        });
        localStorage.setItem('accounts', JSON.stringify(accounts));
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        window.open('../index.html', "_self");
    }
});

function validateName() {
    if (nameInput.value.length > 0) {
        nameErrorText.classList.add('d-none');
        nameInput.classList.remove('has-error');
        return true;
    }
    nameErrorText.innerHTML = "Must enter a name";
    nameErrorText.classList.remove('d-none');
    nameInput.classList.add('has-error');
    return false;
}

function validateEmail() {
    if (emailRegex.test(emailInput.value)) {
        emailErrorText.classList.add('d-none');
        emailInput.classList.remove('has-error');
        return true;
    }
    emailErrorText.innerHTML = "Email is not valid";
    if (emailInput.value.length == 0) {
        emailErrorText.innerHTML = "Must enter an email";
    }
    emailErrorText.classList.remove('d-none');
    emailInput.classList.add('has-error');
    return false;
}

function validatePassword() {
    if (passwordInput.value.length < 6) {
        passwordErrorText.classList.remove('d-none');
        passwordInput.classList.add('has-error');
        if (passwordInput.value.length == 0) {
            passwordErrorText.innerHTML = "Must enter a password";
        } else {
            passwordErrorText.innerHTML = "Password must be at least 6 characters";
        }
        return false;
    }
    passwordErrorText.classList.add('d-none');
    passwordInput.classList.remove('has-error');
    return true;
}