import slug from 'slug';

/** Slugify Helper Class */
export default class Slugify {
  /**
   * Represents a slugify function.
   * @param {string} string - The string to be slugified .
   * @param {boolean} isTitle - The type of string to be slugified.
   * @returns {string} slug
   */
  static slugify(string, isTitle = false) {
    const uuid = Math.random().toString(36).substring(7);
    if (isTitle) {
      string += `-${uuid}`;
    }
    return slug(string, { lower: true });
  }
}
