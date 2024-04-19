// ## Реализовать вектор над типизированным массивом

// Вектор должен поддерживать интерфейс двусторонней очереди, как у нативных массивов JS.

//    ```js

class Vector {
  constructor(typeArr, options) {
      this.typeArr = typeArr;
      this.capacity = options.capacity;
      this.buffer = new typeArr(this.capacity);
      this.length = 0;
  }

  push(...elements) {
    for (const el of elements) {
        if (this.length >= this.capacity) {
            this.#resize();
        }
        this.buffer[this.length] = el;
        this.length++;
    }
}

  pop() {
      if (this.length === 0) {
          return undefined;
      }
      const value = this.buffer[this.length - 1];
      this.buffer[this.length - 1] = undefined;
      this.length--;
      return value;
  }

  shift() {
      if (this.length === 0) {
          return undefined;
      }
      const value = this.buffer[0];
      this.length--;
      for (let i = 0; i < this.length; i++) {
          this.buffer[i] = this.buffer[i + 1];
      }
      this.buffer[this.length] = undefined;
      return value;
  }

  unshift(el) {
      if (this.length >= this.capacity) {
          this.#resize();
      }
      for (let i = this.length; i > 0; i--) {
          this.buffer[i] = this.buffer[i - 1];
      }
      this.buffer[0] = el;
      this.length++;
  }

  #resize() {
      const newCapacity = this.capacity * 2;
      const newBuffer = new this.typeArr(newCapacity);
      newBuffer.set(this.buffer);
      this.buffer = newBuffer;
      this.capacity = newCapacity;
  }
}

   const uint8Vector = new Vector(Uint8Array, {capacity: 100});

   uint8Vector.push(100);  // 1
   uint8Vector.push(20, 10); // 3

   uint8Vector.pop();       // 10
   uint8Vector.shift();  
   console.log(uint8Vector)     // 100

    uint8Vector.unshift(1);
    console.log(uint8Vector)            // 2
   console.log(uint8Vector.length); // 2
//    ```