import functions from './functions.js';
import calculator from './calculator.js';
import taxFunc from './tax.js';
import array from './array.js';
import dict from './dict.js';

// var num1; var num2;
// var answerDisplay = document.getElementById("answer").innerHTML;

/* CALCULATOR */

document.getElementById('calculateButton').onclick = (function () {
    let num1 = parseInt(document.getElementById("firstNum").value);
    let num2 = parseInt(document.getElementById("secondNum").value);
    
    if (add.checked) {
        calculator.addFunc(num1, num2);
        calculator.addWrite(num1, num2);
    }
    if (subtract.checked) {
        calculator.subtractFunc(num1, num2);
        calculator.subtractWrite(num1, num2);
    }
    if (multiply.checked) {
        calculator.multiplyFunc(num1, num2);
        calculator.multiplyWrite(num1, num2);
    }
    if (divide.checked) {
        calculator.divideFunc(num1, num2);
        calculator.divideWrite(num1, num2);
    }
});

/* TAX CALCULATOR */

taxButton.addEventListener("click", function () {
    tax.innerHTML = "$" + taxFunc.taxCal(gross_income.value);
});

/* ARRAYS */

addElement.addEventListener("click", function () {
    arrayDisplay.innerHTML = array.addElement(parseInt(element.value));
});

displayArr.addEventListener("click", function () {
    arrayDisplay.innerHTML = array.displayArray(element.value);
});

sumArr.addEventListener("click", function () {
    arrayDisplay.innerHTML = array.sumArray(element.value);
});

clearArr.addEventListener("click", function () {
    arrayDisplay.innerHTML = array.clearArray(element.value);
});

provFull.addEventListener("click", function () {
    dictDisplay.innerHTML = dict.findProvinceFromAbb(provAbb.value);
});