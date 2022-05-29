export class RegexUtils {
  /**
   * @param path - should follow structure `projects_content/$projectId/stories|scheduled_posts/$gridItemId/$mediaId/original.jpg`
   * @returns - result of match
   */
  static isGridItemMediaStoragePath(path: string) {
    return path.match(/projects_content\/[^/]+\/(?:stories|scheduled_posts)\/[^/]+\/[^.]+\..+$/);
  }

  static parseGridItemMediaStoragePath(path: string) {
    const projectId = path.replace(/projects_content\/([^/]+).+$/, '$1');
    const gridItemId = path.replace(/projects_content\/[^/]+\/(?:stories|scheduled_posts)\/([^/]+).+$/, '$1');
    const mediaId = path.replace(/projects_content\/[^/]+\/(?:stories|scheduled_posts)\/[^/]+\/([^/]+).+$/, '$1');
    const isStory = path.includes('/stories/');

    return { projectId, gridItemId, mediaId, isStory };
  }

  static findHashtags(text: string): string[] {
    return text.match(/#[a-z|_]+/gi) ?? [];
  }

  static findMentions(text: string): string[] {
    return text.match(/@[a-z|_]+/gi) ?? [];
  }
}
