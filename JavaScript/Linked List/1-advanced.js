'use strict';

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.last = null;
    this.size = 0;
  }

  getFirst() {
    return this.head;
  }

  getlast() {
    return this.last;
  }

  getSize() {
    return this.size;
  }

  push(data) {
    const node = new Node(data);
    if (this.head === null) {
      this.head = node;
      this.last = node;
      this.size += 1;
      return node;
    }
    node.prev = this.last;
    this.last.next = node;
    this.last = node;
    this.size += 1;
    return node;
  }

  pushAfter(data, prevNode) {
    if (!prevNode) {
      return this.push(data);
    }
    const node = new Node(data);
    let nextNode = prevNode.next;
    node.next = nextNode;
    node.prev = prevNode;
    prevNode.next = node;
    nextNode.prev = node;
    this.size += 1;
    return node;
  }

  pushBefore(data, nextNode) {
    if (!nextNode) {
      return this.push(data);
    }
    const node = new Node(data);
    let prevNode = nextNode.prev;
    node.next = nextNode;
    node.prev = prevNode;
    prevNode.next = node;
    nextNode.prev = node;
    this.size += 1;
    return node;
  }

  pop() {
    if (!this.last) return this;
    if (!this.last.prev) {
      this.head = null;
      this.last = null;
      this.size += -1;
      return this;
    }
    let tempLast = this.last;
    let prev = this.last.prev;
    prev.next = null;
    this.last = prev;
    tempLast = null;
    this.size += -1;
    return this;
  }

  shift() {
    if (!this.head) return this;
    if (!this.head.next) {
      this.head = null;
      this.last = null;
      this.size += -1;
      return this;
    }
    let tempHead = this.head;
    let next = this.head.next;
    next.prev = null;
    this.head = next;
    tempHead = null;
    this.size += -1;
    return this;
  }

  traversal(fn) {
    const type = typeof fn;
    if (!fn || type !== 'function') throw new Error('Function was expected!');
    let tempNode = this.head;
    while (tempNode) {
      fn(tempNode);
      tempNode = tempNode.next;
    }
    return this;
  }

  log() {
    return this.traversal(node => console.log(node.data));
  }

  logAll() {
    return this.traversal(console.log);
  }

  delete() {
    this.head = null;
    this.last = null;
    this.size = 0;
    return this;
  }
}

// usage
const list = new LinkedList();

// adding node
const node1 = list.push(10);
const node2 = list.push(20);
const node4 = list.push(40);
const node5 = list.push(50);

// poping node
// list.pop();

// adding node after existing node
const node3 = list.pushAfter(30, node2);

// shifting node
// list.shift();

// adding node before existing node
const node7 = list.pushBefore(70, null); // === list.pushAfter(70);
const node6 = list.pushBefore(60, node7);

list.log(); // 10 20 30 40 50 60 70
list.delete();

list.log(); // nothing

// console.dir({ list }, { depth: null });
