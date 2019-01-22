import slug from 'slug';

/** Slugify Helper Class */
export default class Slugify {
  /**
   * Represents a slugify function.
   * @param {string} string - The string to be slugified .
   * @returns {string} slug
   */
  static slugify(string) {
    const uuid = Math.random().toString(36).substring(7);
    string += `-${uuid}`;
    return slug(string, { lower: true });
  }
}
