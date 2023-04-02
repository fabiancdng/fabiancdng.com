/**
 * Light Regex-based CSS sanitizer.
 * Sanitizes dangerous CSS properties and functions to prevent XSS and CSS injections.
 * However, the text field is from a trusted source and not user-supplied.
 */
const sanitizeCss = (cssString: string) => {
  // Remove any comments
  cssString = cssString.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove any import statements
  cssString = cssString.replace(/@import[\s\S]*?;/g, '');

  // Remove any potentially dangerous functions, such as url()
  cssString = cssString.replace(/url\([\s\S]*?\)/g, '');

  // Remove any potentially dangerous properties, such as behavior and expression
  cssString = cssString.replace(
    /behavior\s*:|expression\s*:|javascript\s*:|vbscript\s*:/gi,
    ''
  );

  // Remove any !important keywords
  cssString = cssString.replace(/!important/gi, '');

  return cssString;
};

/**
 * Takes in a string of inline CSS from Storyblok CMS and converts it to an object
 * that can be passed to the `style` prop of a React component.
 */
const ParseAdditionalCSS = (additionalCSS: string) => {
  // Sanitize the string before processing it.
  additionalCSS = sanitizeCss(additionalCSS);

  const styles: any = {};

  additionalCSS.split(';').forEach((style) => {
    const [property, value] = style.split(':');
    if (property && value) {
      styles[property.trim()] = value.trim();
    }
  });

  return styles;
};

export default ParseAdditionalCSS;
