import * as admin from 'firebase-admin';

const DIR_TREE_TERMINATOR = {};

type PathTreeNodeType = Map<string, PathTreeNodeType | typeof DIR_TREE_TERMINATOR>;

/**
 * Generates direct path without root references, example UserSubscription/$userid/...
 *
 * @param reference - any database reference
 * @returns - path without root preffix
 */
export function databasePath(reference: admin.database.Reference): string {
  return reference.toString().substring(reference.root.toString().length - 1);
}

/**
 * create "path tree" in form:
 *
 * root_folder:
 *   sub_folder_a:
 *     DIR_TREE_TERMINATOR
 *   sub_folder_b:
 *     sub_sub_folder_b1:
 *       DIR_TREE_TERMINATOR
 *     sub_sub_folder_b2:
 *       DIR_TREE_TERMINATOR
 *   ...
 */

export class PathTree {
  readonly root: PathTreeNodeType;
  readonly pathSplitter: (path: string) => string[];

  constructor(paths: string[], customPathSplitter?: (path: string) => string[]) {
    this.pathSplitter = customPathSplitter || PathTree.defaultPathSplitter;
    this.root = PathTree.generatePathTree(paths, this.pathSplitter);
  }

  static defaultPathSplitter(path: string): string[] {
    return path
      .split('/')
      .map((str) => str.trim())
      .filter((str) => str);
  }
  
  static generatePathTree(paths: string[], customPathSplitter?: (path: string) => string[]) {
    const root = new Map();
    for (const path of paths) {
      const pathParts = customPathSplitter
        ? customPathSplitter(path)
        : path
            .split('/')
            .map((str) => str.trim())
            .filter((str) => str);

      if (!pathParts.length) {
        throw new Error(`path seems to be empty: "${path}"`);
      }

      let currentNode = root;
      const maxInd = pathParts.length - 1;
      for (let i = 0; i <= maxInd; i++) {
        const pathPart = pathParts[i];
        let child = currentNode.get(pathPart);

        if (child === DIR_TREE_TERMINATOR) {
          break; // inner directories already excluded
        }

        if (i === maxInd) {
          currentNode.set(pathPart, DIR_TREE_TERMINATOR);
          break; // exclude all inner directories
        }

        if (!child) {
          child = new Map();
          currentNode.set(pathPart, child);
        }

        currentNode = child;
      }
    }
    return root;
  }

  /**
   * checks if a file belongs to a "path tree"
   *
   * example:
   *  path: 'music/rock/beatles/1970'
   *  pathTree:  ( 'music/rock', ... )
   *  result: {pathPartsRest: ['beatles', '1970']}
   *
   *
   * @return null if a file could not be from a "path tree"
   */
  locatePath(path: string): null | { pathPartsRest: string[] } {
    const pathParts: string[] = this.pathSplitter(path);

    if (!pathParts.length) {
      return null;
    }

    let currentNode: PathTreeNodeType = this.root;
    const pathPartsRest = [...pathParts];

    while (pathPartsRest.length) {
      const pathPart = pathPartsRest.shift();
      if (!pathPart) {
        return null;
      }
      const next = (currentNode as PathTreeNodeType).get(pathPart);
      if (!next) {
        return null;
      }
      if (next === DIR_TREE_TERMINATOR) {
        return { pathPartsRest };
      }
      currentNode = next as PathTreeNodeType;
    }

    return null; // path is shorter than corresponding path in pathTree
  }
}