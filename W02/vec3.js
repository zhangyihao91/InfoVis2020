class Vec3 {
  // Constructor
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // Add method
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }

  // Sum method
  sum() {
    return this.x + this.y + this.z;
  }

  //Max method
  max() {
    return Math.max(this.x, this.y, this.z);
  }
  
  // Min method
  min() {
    return Math.min(this.x, this.y, this.z);
  }

  // Mid method
  mid() {
    return this.x + this.y + this.z - Math.min(this.x, this.y, this.z) - Math.max(this.x, this.y, this.z);
  }
}
