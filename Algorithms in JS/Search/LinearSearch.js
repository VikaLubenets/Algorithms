// Yandex algorithms training 1.0

//Task 1: find the most left position of number or return -1
function search1(arr, item){
    for(let i = 0; i < arr.length; i++){
        if(el === item){
            return i
        } else {
            return -1
        }
    }
}

// Task 2: find the most right position of the el or return -1

function search2(arr, item){
    let pos = -1
    for(let i = 0; i < arr.length; i++){
        if(el === item){
            pos = i;
        }
    }

    return pos
}


// Task 3: find max el

function findMax(arr){
    if(arr.length === 0){
        return null
    }
    let max = arr[0];

    for(let el of arr){
        if(el > max){
            max = el
        }
    }

    return max
}

//Task 4
// В офисе, где работает программист Петр, установили кондиционер нового типа. Этот кондиционер отличается особой простотой в управлении. 
// У кондиционера есть всего лишь два управляемых параметра: желаемая температура и режим работы.
// Кондиционер может работать в следующих четырех режимах:
// «freeze» — охлаждение. В этом режиме кондиционер может только уменьшать температуру. Если температура в комнате и так не больше желаемой, то он выключается.
// «heat» — нагрев. В этом режиме кондиционер может только увеличивать температуру. Если температура в комнате и так не меньше желаемой, то он выключается.
// «auto» — автоматический режим. В этом режиме кондиционер может как увеличивать, так и уменьшать температуру в комнате до желаемой.
// «fan» — вентиляция. В этом режиме кондиционер осуществляет только вентиляцию воздуха и не изменяет температуру в комнате.

// Кондиционер достаточно мощный, поэтому при настройке на правильный режим работы он за час доводит температуру в комнате до желаемой.
// Требуется написать программу, которая по заданной температуре в комнате troom, установленным на кондиционере желаемой температуре tcond и режиму работы определяет температуру, которая установится в комнате через час.

// Формат ввода
// Первая строка входного файла содержит два целых числа troom, и tcond, разделенных ровно одним пробелом (–50 ≤ troom ≤ 50, –50 ≤ tcond ≤ 50).
// Вторая строка содержит одно слово, записанное строчными буквами латинского алфавита — режим работы кондиционера.

// Формат вывода
// Выходной файл должен содержать одно целое число — температуру, которая установится в комнате через час

const { createInterface } = require('readline');
const lines = [];

createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    lines.push(line.toString().trim().split(' '))
}).on('close', () => {

    const temp = lines[0].map(Number);
    const type = lines[1][0];

    function getTemp(temp, type){
        if(type === 'heat'){
            return Math.max(...temp);
        } else if(type === 'freeze'){
            return Math.min(...temp);
        } else if(type === 'auto') {
            return temp[1];
        } else if(type === 'fan') {
            return temp[0];
        }
    }

    console.log(getTemp(temp, type))
})