const inputs = document.querySelectorAll('input');

export const patterns = {
    Student_ID: /^[a-zA-Z]\d{8}$/,
    Student_FirstName:  /^[a-zA-Z]+$/,
    Student_LastName: /^[a-zA-Z]+$/,
    Student_Email: /^[a-zA-Z]\d{8}@mytudublin\.ie$/,
    Student_Password: /^(?=.*[a-zA-Z])(?=.*[a-z])(?=.*\d{3,})(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,20}$/
}

function validate(field, regex){
    if(regex.test(field.value)) {
        field.className = 'valid';
        console.log(true);
    } else {
        field.className = 'invalid';
        console.log(false);
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        // console.log(e.target.attributes.name.value);
        validate(e.target, patterns[e.target.attributes.name.value]);
    });
});