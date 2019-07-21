import { INode, ITree, NIL } from './';
import { leftRotate, rightRotate } from './rotate';

export const insert = (tree: ITree, z: INode) => {
  let y = NIL;
  let x = tree.root;
  while (x !== NIL) {
    y = x;
    // TODO: Implement compare function
    x = (z.key < x.key) ? x.left : x.right;
  }
  z.parent = y;
  if (y === NIL) {
    tree.root = z;
  } else if (z.key < y.key) {
    y.left = z;
  } else {
    y.right = z;
  }
  z.left = z.right = NIL;
  z.color = 'RED';
  insertFixUp(tree, z);
};

const insertFixUp = (tree: ITree, z: INode) => {
  while (z.parent.color === 'RED') {
    if (z.parent === z.parent.parent.left) {
      const y = z.parent.parent.right;
      if (y.color === 'RED') {
        z.parent.color = y.color = 'BLACK';
        z.parent.parent.color = 'RED';
        z = z.parent.parent;
      } else {
        if (z === z.parent.right) {
          z = z.parent;
          leftRotate(tree, z);
        }
        z.parent.color = 'BLACK';
        z.parent.parent.color = 'RED';
        rightRotate(tree, z.parent.parent);
      }
    } else if (z.parent === z.parent.parent.right) {
      const y = z.parent.parent.left;
      if (y.color === 'RED') {
        z.parent.color = y.color = 'BLACK';
        z.parent.parent.color = 'RED';
        z = z.parent.parent;
      } else {
        if (z === z.parent.left) {
          z = z.parent;
          rightRotate(tree, z);
        }
        z.parent.color = 'BLACK';
        z.parent.parent.color = 'RED';
        leftRotate(tree, z.parent.parent);
      }
    }
  }
  tree.root.color = 'BLACK';
};
