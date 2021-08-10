Array.prototype.cleanArray = function () {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    if (this[i]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

Array.prototype.removeSpace = function () {
  return this.map(function (el) {
    return el.trim();
  });
};

Array.prototype.removeMention = function () {
  for (let i = 0; i < this.length; i++) {
    if (this[i].match(/^<[@[!|&]|#]?(\d+)>$/)) {
      this.splice(i, 1);
    }
  }
  return this;
};
