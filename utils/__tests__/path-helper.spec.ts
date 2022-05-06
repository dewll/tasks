import { PathTree } from '../path-helper';

const pathToSplit = 'Hello/World';
const pathToGenerate = ['hello/word']

describe('PathHelper', () => {
  it('path tree', () => {
    const tree = new PathTree(['music/rock', 'art']);

    // absent root
    expect(tree.locatePath('photo')).toEqual(null);

    // absent child
    expect(tree.locatePath('music/punk')).toEqual(null);

    // path is too short
    expect(tree.locatePath('music')).toEqual(null);

    // ok
    expect(tree.locatePath('art')).toEqual({ pathPartsRest: [] });

    // ok, rest of file path in pathPartsRest
    expect(tree.locatePath('music/rock/beatles/1970')).toEqual({ pathPartsRest: ['beatles', '1970'] });

    // test remove repeating slashes in file path
    expect(tree.locatePath('///music///rock///')).toEqual({ pathPartsRest: [] });
  });

  it('test skip repeating slashes in tree', () => {
    const tree = new PathTree(['///music///classic///']);
    expect(tree.locatePath('music/classic')).toEqual({ pathPartsRest: [] });
  });

  it('path with only empty parts', () => {
    expect(() => {
      new PathTree(['// ']);
    }).toThrowError();
  });
  it('testing if path is split with respect to (/)', () => {
    const defaultPathSplitter= PathTree.defaultPathSplitter(pathToSplit);
    expect(defaultPathSplitter).toEqual(['Hello','World']);
  });
  it('testing if pathTree is generated and map to each other', () => {
    const generatePathTree= PathTree.generatePathTree(pathToGenerate);
    expect(generatePathTree).toMatchObject({})
  });
});
