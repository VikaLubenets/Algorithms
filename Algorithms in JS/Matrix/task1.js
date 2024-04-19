// ## Реализовать класс для описания 3-х мерной матрицы

class Matrix3D {
  constructor(obj){
    this.row = obj.x;
    this.col = obj.y;
    this.height = obj.z;
    this.capacity = this.row * this.col * this.height;
    this.buffer = new Array(this.capacity).fill(0);
  }

  set(coords, value) {
    const { x, y, z } = coords;
    if (this.isValidCoords(x, y, z)) {
      const index = z * (this.row * this.col) + y * this.row + x;
      this.buffer[index] = value;
    } else {
      throw new Error('Invalid coordinates');
    }
  }

  get(coords) {
    const { x, y, z } = coords;
    if (this.isValidCoords(x, y, z)) {
      const index = z * (this.row * this.col) + y * this.row + x;
      return this.buffer[index];
    } else {
      throw new Error('Invalid coordinates');
    }
  }

  isValidCoords(x, y, z) {
    return x >= 0 && x < this.row && y >= 0 && y < this.col && z >= 0 && z < this.height;
  }

}
   const matrix = new Matrix3D({x: 10, y: 10, z: 10});

  matrix.set({x: 1, y: 3, z: 2}, 10);
  console.log(matrix.get({x: 1, y: 3, z: 2})); // 10
//    ```
