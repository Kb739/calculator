const display = document.querySelector('#display');
const allCharacters = ['clr', 'del', '=', '/', 1, 2, 3, '*', 4, 5, 6, '-', 7, 8, 9, '+', 0, '.', '='];
let buffer = ['', '', ''];
let bufferIndex = 0;
let op = '';

const operation = {
    '*': mul,
    '-': sub,
    '+': add,
    '/': divide,
    '=': equalsTo,
    'clr': clear,
    'del': del,
};

function reset() {
    for (let i = 0; i < 3; i++)
        buffer[i] = '';
    bufferIndex = 0;
}

function numberInput(e) {
    if (bufferIndex == 2) {
        reset();
    }
    let num = buffer[bufferIndex];
    if (num.length < 12) {
        num += e.target.textContent;
        buffer[bufferIndex] = num;
        display.textContent = num;
    }
}
function operatorInput(e) {
    if (buffer[bufferIndex]) {
        switch (bufferIndex) {

            case 0:
                bufferIndex++;
                break;

            case 1:
                buffer[0] = calculate(buffer[0], buffer[1], operation[op]);
                buffer[1] = '';
                bufferIndex = 1;
                display.textContent = buffer[0];
                break;

            case 2:
                buffer[0] = buffer[2];
                buffer[1] = '';
                buffer[2] = '';
                bufferIndex = 1;
                break;

        }
        op = e.target.textContent;
    }
}

function equalsTo() {
    if (buffer[0] && buffer[1]) {
        if (!buffer[2]) {
            buffer[2] = calculate(buffer[0], buffer[1], operation[op]);
            bufferIndex = 2;
            display.textContent = buffer[2];
        }
    }
}

function clear() {
    reset();
    display.textContent = '';
}

function del() {

    if (bufferIndex == 2)
        clear();
    else if (buffer[bufferIndex]) {
        const value = buffer[bufferIndex];
        buffer[bufferIndex] = value.slice(0, value.length - 1);
        display.textContent = buffer[bufferIndex];
    }
}

function mul(a, b) {
    return a * b;
}
function sub(a, b) {
    return a - b;
}
function add(a, b) {
    return a + b;
}
function divide(a, b) {
    return a / b;
}

function calculate(a, b, op) {
    return op(+a, +b);
}

function classify(button) {
    const text = button.textContent;

    if (text.match(/\.|[0-9]/)) {
        button.classList.add('number');
        button.onclick = numberInput;
    }
    else if (text.match(/\+|\-|\*|\//)) {
        button.classList.add('operator');
        button.onclick = operatorInput;
    }
    else {
        button.onclick = operation[text];
    }
}

function generateButtonGrid() {
    const grid = document.querySelector('#grid');

    for (const ele of allCharacters) {
        const button = document.createElement('button');
        button.classList.add('block');
        button.textContent = ele;
        classify(button);
        grid.appendChild(button);
    }

}

generateButtonGrid();

