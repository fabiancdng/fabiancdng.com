/**
 * Utility function to create an object for a given image.
 * Also extracts the image's dimensions from the URL and sets them as properties.
 */
const GetImageObject = (source: string, alt?: string, title?: string) => {
  // Create array of URL segments and filter out the dimensions.
  const dimensions = source.split('/').filter((item) => item.includes('x'))[0];

  // Default values for width and height in case dimensions can't be extracted from the URL.
  let width = 871;
  let height = 489;

  // If the URL contains dimensions, extract them from the URL string.
  if (dimensions && dimensions.length <= 0) {
    width = parseInt(dimensions.split('x')[0]);
    height = parseInt(dimensions.split('x')[1]);
  }

  return {
    source,
    title: title ? title : '',
    alt: alt ? alt : '',
    width,
    height,
  };
};

export default GetImageObject;
