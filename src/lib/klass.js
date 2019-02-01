let klass = {
  hasClass(node, className) {
    const pattern = new RegExp(className);
    return pattern.test(node.className);
  },
  addClass(node, className) {
    if (!this.hasClass(node, className)) {
      node.className += ' ' + className;
    }
    return this;
  },
  delClass(node, className) {
    if (this.hasClass(node, className)) {
      const tmpName = node.className.replace(className, '');
      node.className = tmpName.replace(/[ ]{2,}/g, ' ').trim();
    }
    return this;
  },
  toggleClass(node, className) {
    if (this.hasClass(node, className)) {
      this.delClass(node, className);
    } else {
      this.addClass(node, className);
    }
  }
};
export default klass;