//brackets task

const checkBrackets = (str) => {
  const open_brackets = ['(', '{', '[']
  const dic = {
    ')': '(',
    '}': '{',
    ']': '['
  }

  const stack = [];
  for(let char of str){
    if(open_brackets.includes(char)){
      stack.push(char)
    } else {

      if(stack.length === 0) return false;

      if(dic[char] === stack[stack.length - 1]){
        stack.pop()
      } else {
        return false
      }
    } 
  }

  return stack.length === 0;
}

console.log(checkBrackets('((({[]})))')) // true
console.log(checkBrackets('{{]')) // false
console.log(checkBrackets('((())')) // false



// ## Реализовать стек на основе типизированного массива заданной длины

class Stack {
  constructor(typeArr, size){
    this.stack = new typeArr(size);
    this.size = size;
    this.head = null;
    this.length = 0;
  }

  push(el){
    if(this.length >= this.size){
      return new Error('Stack overflow: the stack is full')
    }
    this.head = el;
    this.stack[this.length] = el;
    this.length++;
  }

  pop(){
    if (this.length <= 0) {
      throw new Error('The stack is empty');
    }
    const el = this.stack[this.length - 1];
    this.stack[this.length - 1] = null;
    this.length--;
    if(this.length === 0){
      this.head = null;
    } else {
      this.head = this.stack[this.length - 1];
    }
    return el;
  }
}

   const stack = new Stack(Int32Array, 10);
   
   stack.push(10);
   stack.push(11);
   stack.push(12);
   
   console.log(stack.head);  // 12
   
   console.log(stack.pop()); // 12
   
   console.log(stack.head);  // 11
   
   console.log(stack.pop()); // 11
   console.log(stack.pop()); // 10
   console.log(stack.pop()); // Exception
//    ```