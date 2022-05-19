


function calculate(a, b, op) {
    return op(a, b);
}

const operator = {
    '*': mul,
    '-': sub,
    '+': add,
    '/': divide
};

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

