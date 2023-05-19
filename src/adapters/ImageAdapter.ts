import sizeOf from 'image-size';

export function getImageDimensions(path: string) {
  const absPath = process.cwd();
  const dimensions = sizeOf(`${absPath}${path}`);
  return dimensions;
}
