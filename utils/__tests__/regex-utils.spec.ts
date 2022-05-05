import * as _ from 'lodash';
import { RegexUtils } from '../regex-utils';

describe('RegexUtils', () => {
  it('find text and mentions correclty', async () => {
    const caption = `Lorem Ipsum is @vladimir and @alex and @_got_ simply dummy #winter #_spr #_test_ text of the printing and typesetting industry.`;

    const tags = RegexUtils.findHashtags(caption);
    const accounts = RegexUtils.findMentions(caption);

    expect(_.isEqual(tags, ['#winter', '#_spr', '#_test_'])).toBe(true);
    expect(_.isEqual(accounts, ['@vladimir', '@alex', '@_got_'])).toBe(true);
  });

  it('generate params for image story', async () => {
    const filePath = 'projects_content/projectID/stories/storyID/mediaID/original.jpg';

    const params = RegexUtils.parseGridItemMediaStoragePath(filePath);

    expect(params.projectId).toEqual('projectID');
    expect(params.gridItemId).toEqual('storyID');
    expect(params.mediaId).toEqual('mediaID');
    expect(params.isStory).toEqual(true);
  });

  it('generate params for video post', async () => {
    const filePath = 'projects_content/projectID/scheduled_posts/postID/mediaID/original.mp4';

    const params = RegexUtils.parseGridItemMediaStoragePath(filePath);

    expect(params.projectId).toEqual('projectID');
    expect(params.gridItemId).toEqual('postID');
    expect(params.mediaId).toEqual('mediaID');
    expect(params.isStory).toEqual(false);
  });

  it('testing if the path follow this syntax (/projects_content\/[^/]+\/(?:stories|scheduled_posts)\/[^/]+\/[^.]+\..+$/) and must include projects_content and stories or scheduled_posts', () => {
    const filePath = 'projects_content/projectID/scheduled_posts/postID/mediaID/original.mp4';
    const params = RegexUtils.isGridItemMediaStoragePath(filePath)
    expect(params).toMatchObject({})
  })
});