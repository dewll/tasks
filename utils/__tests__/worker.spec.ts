import {jest} from '@jest/globals';
import workerUtils from '../interfaces/DocRefSelector';


// describe('exportArchiverWorker', () => {
//     jest.setTimeout(60000)
//     it('testing', async () => {
//         const out = await workerUtils.data()
//         console.log(out)
//         expect(out).toMatchObject({})
// }); 
// });

describe('exportArchiverWorker', () => {
    jest.setTimeout(60000)
    it('testing', async () => {
        await test();
        const out = await workerUtils.data()
        console.log(out)
        expect(out).toMatchObject({})
});
afterAll(async () => {
    await app.delete();
  }) 
});