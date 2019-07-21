import { INode, ITree, NIL, minimum } from './';
import { leftRotate, rightRotate } from './rotate';

const transplant = (tree: ITree, u: INode, v: INode) => {
  if (u.parent === NIL) {
    tree.root = v;
  } else if (u === u.parent.left) {
    u.parent.left = v;
  } else {
    u.parent.right = v;
  }
  v.parent = u.parent;
};
export const deleteNode = (tree: ITree, z: INode) => {
  if (z === NIL || tree.root === NIL) {
    return;
  }
  console.error(z);
  let y = z;
  let yOriginalColor = y.color;
  let x;
  if (z.left === NIL) {
    x = z.right;
    console.error(z.right);
    transplant(tree, z, z.right);
  } else if (z.right === NIL) {
    x = z.left;
    console.error(z.left);
    transplant(tree, z, z.left);
  } else {
    y = minimum(z.right);
    console.error(y);
    yOriginalColor = y.color;
    x = y.right;
    if (y.parent === z) {
      x.parent = y;
    } else {
      console.error(y.right);
      transplant(tree, y, y.right);
      y.right = z.right;
      y.right.parent = y;
    }
    transplant(tree, z, y);
    y.left = z.left;
    y.left.parent = y;
    y.color = z.color;
  }
  console.error(x);
  if (yOriginalColor === 'BLACK') {
    deleteFixUp(tree, x);
  }
};

const deleteFixUp = (tree: ITree, x: INode) => {
  while (x !== tree.root && x.color === 'BLACK') {
    if (x === x.parent.left) {
      let w = x.parent.right;
      // Case 1
      if (w.color === 'RED') {
        w.color = 'BLACK';
        x.parent.color = 'RED';
        leftRotate(tree, x.parent);
        w = w.parent.right;
      }
      // Case 2
      if (w.left.color === 'BLACK' && w.right.color === 'BLACK') {
        w.color = 'RED';
        x = x.parent;
      } else {
        // Case 3
        if (w.right.color === 'BLACK') {
          w.left.color = 'BLACK';
          w.color = 'RED';
          rightRotate(tree, w);
          w = x.parent.right;
        }
        // Case 4
        w.color = x.parent.color;
        x.parent.color = 'BLACK';
        w.right.color = 'BLACK';
        leftRotate(tree, x.parent);
        x = tree.root;
      }
    } else {
      let w = x.parent.left;
      if (w.color === 'RED') {
        w.color = 'BLACK';
        x.parent.color = 'RED';
        rightRotate(tree, x.parent);
        w = w.parent.left;
      }
      if (w.left.color === 'BLACK' && w.right.color === 'BLACK') {
        w.color = 'RED';
        x = x.parent;
      } else {
        if (w.left.color === 'BLACK') {
          w.right.color = 'BLACK';
          w.color = 'RED';
          leftRotate(tree, w);
          w = x.parent.left;
        }
        w.color = x.parent.color;
        x.parent.color = 'BLACK';
        w.left.color = 'BLACK';
        rightRotate(tree, x.parent);
        x = tree.root;
      }
    }
  }
  x.color = 'BLACK';
};
