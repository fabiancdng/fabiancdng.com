import sizeOf from 'image-size';

export function getImageDimensions(absImagePath: string) {
  const dimensions = sizeOf(absImagePath);
  return dimensions;
}

/**
 * Returns absolute `fs` path of an image from the content directory.
 */
export function getImagePath(slug: string, filename: string) {
  const absPath = process.cwd();
  const path = `${absPath}/content${slug}/img/${filename}`;
  return path;
}

/**
 * Returns the URL for the `src` prop of an image from the content directory.
 */
export function getImageSource(slug: string, filename: string) {
  const source = `/api/content/images${slug}/img/${filename}?token=${process.env.NEXT_PUBLIC_CONTENT_IMAGE_API_KEY}`;
  return source;
}

/**
 * Returns the absolute path, source URL and dimensions of the thumbnail of any image in the content
 * directory.
 */
export function getImage(slug: string, filename: string) {
  const thumbnailPath = getImagePath(slug, filename);
  const thumbnailSource = getImageSource(slug, filename);
  const thumbnailDimensions = getImageDimensions(thumbnailPath);

  return {
    path: thumbnailPath,
    source: thumbnailSource,
    dimensions: thumbnailDimensions,
  };
}
