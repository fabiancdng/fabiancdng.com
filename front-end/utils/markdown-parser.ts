/**
 * Parses and converts markdown to HTML.
 */
export default class MarkdownParser {
    /**
     * Options to pass to the markdown-it parser.
     * https://github.com/markdown-it/markdown-it
     */
    public options = {
        html:         false,        // Enable HTML tags in source
        xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                    // This is only for full CommonMark compatibility.
        breaks:       false,         // Convert '\n' in paragraphs into <br>
        langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                    // useful for external highlighters.
        linkify:      true,         // Autoconvert URL-like text to links
      
        // Enable some language-neutral replacement + quotes beautification
        // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
        typographer:  false,
      
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: '„“‘’',
    }

    /**
     * Takes in a string containing markdown and returns it rendered as HTML.
     */
    public parseMarkdown(markdownText: string) {
        const markdownParser = require('markdown-it')(this.options);
        return markdownParser.render(markdownText).replaceAll('\n', '<br>');
    }
}