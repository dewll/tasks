import { transformObjectToUrlUtils  } from '../transform-object-to-url';

const baseUrl = 'https://www.google.com/';
const queryObj = { a: 'b' };

describe('transformObjectToUrlUtils ', () => {
it('testing if  object is transform to url with query string', () => {
    const transformObjectToUrl =transformObjectToUrlUtils.transformObjectToUrl(baseUrl,queryObj)
    expect(transformObjectToUrl).toBeTruthy;
});
})