function getRandomLowercase(){
    // ASCII value of 'a' is 97, 'z' is 122
    // Math.random() generates a float between 0 (inclusive) and 1 (exclusive)
    // Math.floor() rounds down to the nearest integer
    // Multiplying by 26 gives a range of 0-25
    // Adding 97 shifts the range to 97-122
    // String.fromCharCode() converts the ASCII value to a character
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUppercase(){
    // ASCII value of 'A' is 65, 'Z' is 90
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    // ASCII value of '0' is 48, '9' is 57
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?"; // pool of symbols to choose from
    return symbols[Math.floor(Math.random() * symbols.length)]; //use the integer as an index to access a character from the symbols string
}

const randomFunc = {
    hasLower: getRandomLowercase,
    hasUpper: getRandomUppercase,
    hasNumber: getRandomNumber,
    hasSymbol: getRandomSymbol
};

function generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length){
    let generatePassword = "";
    const typesCount = hasLower + hasUpper + hasNumber + hasSymbol; // count the total number of selected character types
    // For example, if hasLower is true, hasUpper is false, hasNumber is true, and hasSymbol is false,
    // typesCount would be 2 and typesArr would be [{hasLower}, {hasNumber}].
    const typesArr = [{hasLower}, {hasUpper}, {hasNumber}, {hasSymbol}].filter(item => Object.values(item)[0]);
    // [{hasLower}, {hasUpper}, {hasNumber}, {hasSymbol}] creates an array of objects representing each character type and whether it is selected (true) or not (false).
    // Like [{hasLower: true}, {hasUpper: false}, {hasNumber: true}, {hasSymbol: false}]
    // .filter() function iterates through each element in the array and executes a callback function
    // if callback returns true, the element is included in the new array; if callback returns false, it is excluded.
    // .filter() operates on each item (i.e., each object in the array)
    // Object.values(item) returns a new array containing all the values of the item object. For {hasLower: true}, it would return [true].
    // Next, the code accesses the first element of the new array (i.e., [true][0]) to get the boolean value.

    if(typesCount === 0) {
        return ""; // if no character types are selected, return an empty string
    }

    for(let i = 0; i < length; i += typesCount){ // Each time increase by typesCount, ensuring all selected types are represented
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]; // Extract the (key)function name (e.g., hasLower) from the current type object
            generatePassword += randomFunc[funcName](); // Use the function name to call the corresponding function from randomFunc and append the result to generatePassword
        });
    }

    const finalPassword = generatePassword.slice(0, length); // Ensure the final password is of the desired length
    return finalPassword;
}

const resultEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generatePasswordBtn = document.getElementById("generate");
const clipboardBtn = document.getElementById("clipboard");

generatePasswordBtn.addEventListener("click", () => { // Add event listener for generate password button
    const length = +lengthEl.value; // The '+' operator converts the string value from the input field to a number
    const hasLower = lowercaseEl.checked; // .checked property returns true if the checkbox is checked, otherwise false
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length); // Call the generatePassword function with the selected options
});

clipboardBtn.addEventListener("click", () => { // Add event listener for clipboard button
    const password = resultEl.innerText; // Get the generated password from the result element
    if(!password) return; // If no password is generated, do nothing
    navigator.clipboard.writeText(password); // Use the Clipboard API to copy the password to the clipboard
    alert("Password copied to clipboard!"); // Alert the user that the password has been copied
});