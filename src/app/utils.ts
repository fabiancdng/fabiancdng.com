import { env } from 'process';
import * as cheerio from 'cheerio';

/**
 * Utility to quickly create a timestamp in the desired format.
 *
 * @returns - Current timestamp in the format of YYYY-MM-DD HH:MM:SS
 */
export const getCurrentTimestamp = (): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');
  const seconds = `${now.getSeconds()}`.padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Returns an array of all page slugs to exclude from search engine indexing and sitemap.
 */
export const getRobots = (): string[] => {
  const robots = env.NEXT_PUBLIC_ROBOTS || '';
  return robots.split(',');
};

/**
 * Strips all HTML tags from a string.
 *
 * @param html The HTML input string.
 * @returns The input string without any HTML tags.
 */
export const stripHtmlFromExcerpt = (html: string): string => {
  const $ = cheerio.load(html, {}, false);
  return $('p').text();
};
