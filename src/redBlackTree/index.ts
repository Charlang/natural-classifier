export interface INode {
  key: any;
  color: 'RED' | 'BLACK';
  parent: INode;
  left: INode;
  right: INode;
}

export interface ITree {
  root: INode;
}

export const NIL: INode = {
  key: null,
  color: 'BLACK',
  parent: null,
  left: null,
  right: null,
};

export const minimum = (tree: INode) => {
  let x = tree;
  let depth = 0;
  while (x !== NIL && x.left !== NIL) {
    depth ++;
    x = x.left;
  }
  console.error('minimum depth:' + depth);
  return x;
};

export const maximum = (tree: INode) => {
  let x = tree;
  let depth = 0;
  while (x !== NIL && x.right !== NIL) {
    depth ++;
    x = x.right;
  }
  console.error('maximum depth:' + depth);
  return x;
};

export const search = (tree: ITree, key: any) => {
  let x = tree.root;
  let depth = 0;
  while (x !== NIL && x.key !== key) {
    x = x.key > key ? x.left : x.right;
    depth++;
  }
  console.error('search depth:' + depth);
  return x;
};

import { insert } from './insert';
import { deleteNode } from './delete';

export { insert, deleteNode };
