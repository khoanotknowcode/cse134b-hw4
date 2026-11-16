/* Error Messages */
const NAME_ERROR_MESSAGE = 'Name: 1 - 100 characters.';
const EMAIL_ERROR_MESSAGE = 'Email: Follow \"name@example.com\".';
const MESSAGE_ERROR_MESSAGE = 'Message: At least 10 characters.';

/* Display validation area */
const area = document.querySelector('.validation-area');
area.hidden = false;

/* Name Validation */
const nameInput = document.getElementById('name');
let nameEdited = false; // flag prevents errors popup before user interacts
nameInput.addEventListener('input', () => {
    nameEdited = true;
    if (nameInput.validity.valueMissing || nameInput.validity.tooShort) {
        nameInput.setCustomValidity(NAME_ERROR_MESSAGE);
    } else {
        nameInput.setCustomValidity('');
    }
});

const nameErrorMessage = document.getElementById('name-error-message');
nameInput.addEventListener('blur', () => {
    if (nameEdited) {
        nameErrorMessage.textContent = nameInput.validationMessage;
    }
});

/* Email Validation */
const emailInput = document.getElementById('email');
let emailEdited = false;
emailInput.addEventListener('input', () => {
    emailEdited = true;
    if (emailInput.validity.typeMismatch) {
        emailInput.setCustomValidity(EMAIL_ERROR_MESSAGE);
    } else {
        emailInput.setCustomValidity('');
    }
});

const emailErrorMessage = document.getElementById('email-error-message');
emailInput.addEventListener('blur', () => {
    if (emailEdited) {
        emailErrorMessage.textContent = emailInput.validationMessage;
    }
});

/* Message Validation */
const messageInput = document.getElementById('message');
let messageEdited = false; // flag used for blur event
messageInput.addEventListener('input', () => {
    messageEdited = true;
    if (messageInput.validity.valueMissing || messageInput.validity.tooShort) {
        messageInput.setCustomValidity(MESSAGE_ERROR_MESSAGE);
    } else {
        messageInput.setCustomValidity('');
    }
});

const messageErrorMessage = document.getElementById('message-error-message');
messageInput.addEventListener('blur', () => {
    if (messageEdited) {
        messageErrorMessage.textContent = messageInput.validationMessage;
    }
});

/* Info Message Count Characters */
const messageInfoMessage = document.getElementById('message-info-message');
/* Threshold = last the 20% of maxlength limit */
const MESSAGE_WARNING_THRESHOLD = messageInput.maxLength * 0.2;
messageInput.addEventListener('input', () => {
    const messageRemainingLength =  messageInput.maxLength - messageInput.value.length;
    if (messageRemainingLength === 0) {
        messageInfoMessage.textContent = 'Warning: Character limit reached.';
        messageInfoMessage.style.color = '#b91c1c';
    } else if (messageRemainingLength <= MESSAGE_WARNING_THRESHOLD) {
        messageInfoMessage.textContent = 'Warning: ' + messageRemainingLength + ' characters left.';
        messageInfoMessage.style.color = '#b45309';
    } else {
        messageInfoMessage.textContent = 'Message: ' + messageRemainingLength + ' characters remain.';
    }
});

/* Form Errors Record */
/* form_errors[i] = {name error, email error, message error} */
let form_errors = [];
const form = document.getElementById('contact-form');
form.novalidate = true;
form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
        const badAttempt = {nameError: '', emailError: '', messageError: ''};
        
        // Special case: Submit without any fields input
        if (nameInput.validity.valueMissing && emailInput.validity.valueMissing && messageInput.validity.valueMissing) {
            badAttempt.nameError = NAME_ERROR_MESSAGE;
            badAttempt.emailError = EMAIL_ERROR_MESSAGE;
            badAttempt.messageError = MESSAGE_ERROR_MESSAGE;
            nameErrorMessage.textContent = NAME_ERROR_MESSAGE;
            emailErrorMessage.textContent = EMAIL_ERROR_MESSAGE;
            messageErrorMessage.textContent = MESSAGE_ERROR_MESSAGE;
        } else {
            // Use custom message even though the user leaves the fields empty and submit
            badAttempt.nameError = nameInput.validity.valueMissing ? NAME_ERROR_MESSAGE: nameInput.validationMessage;
            badAttempt.emailError = emailInput.validity.valueMissing ? EMAIL_ERROR_MESSAGE : emailInput.validationMessage;
            badAttempt.messageError = messageInput.validity.valueMissing ? MESSAGE_ERROR_MESSAGE : messageInput.validationMessage;
        }

        form_errors.push(badAttempt);

        event.preventDefault();
    } else {
        const json = JSON.stringify(form_errors);
        const formErrors = document.getElementById('form-errors');
        formErrors.value = json;
    }
});