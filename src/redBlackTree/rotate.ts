import { INode, ITree, NIL } from './';

export const leftRotate = (tree: ITree, x: INode) => {
  if (x === NIL) {
    console.error('Nothing happen if try to left rotate a NIL node');
    return;
  }
  if (x.right === NIL) {
    console.error('Nothing happen if try to left rotate a node whose right child is NIL');
    return;
  }
  const y = x.right;
  x.right = y.left;
  if (y.left !== NIL) {
    y.left.parent = x;
  }
  y.parent = x.parent;
  if (x.parent === NIL) {
    tree.root = y;
  } else if (x === x.parent.left) {
    x.parent.left = y;
  } else {
    x.parent.right = y;
  }
  y.left = x;
  x.parent = y;
};

export const rightRotate = (tree: ITree, y: INode) => {
  if (y === NIL) {
    console.error('Nothing happen if try to left rotate a NIL node');
    return;
  }
  if (y.left === NIL) {
    console.error('Nothing happen if try to left rotate a node whose left child is NIL');
    return;
  }
  const x = y.left;
  y.left = x.right;
  if (x.right !== NIL) {
    x.right.parent = y;
  }
  x.parent = y.parent;
  if (y.parent === NIL) {
    tree.root = x;
  } else if (y === y.parent.left) {
    y.parent.left = x;
  } else {
    y.parent.right = x;
  }
  x.right = y;
  y.parent = x;
};
