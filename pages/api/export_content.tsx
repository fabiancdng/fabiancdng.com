import {
  ISbRichtext,
  ISbStory,
  getStoryblokApi,
  renderRichText,
} from '@storyblok/react';
import { NextApiRequest, NextApiResponse } from 'next';
import TurndownService from 'turndown';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get GET parameter 'slug' from URL of the blog post to export.
  const slug = req.query.slug;

  if (req.query.token !== process.env.EXPORT_CONTENT_API_KEY) {
    return res.status(401).json({
      message: 'Unauthorized.',
    });
  }

  // Get the story from the Storyblok API.
  const storyblokApi = getStoryblokApi();

  try {
    const { data: story }: ISbStory = await storyblokApi.get(
      `cdn/stories/${slug}`
    );

    // Get the content field in the story (if it has one).
    if (!story.story.content) {
      return res.status(404).json({
        message: 'Story has no content field to export.',
      });
    }

    // Extract content field from story.
    const richTextField: ISbRichtext = story.story.content as ISbRichtext;
    const content: any = richTextField.content ? richTextField.content : null;

    // Render content field as HTML.
    const contentHTML = content ? renderRichText(content) : '';

    // Return markdown version of the content using Turndown.
    const turndown = new TurndownService({
      headingStyle: 'atx',
    });

    // Add rule to convert code blocks.
    turndown.addRule('codeBlock', {
      filter: function (node: any) {
        return (
          node.nodeName === 'PRE' &&
          node.firstChild &&
          node.firstChild.nodeName === 'CODE' &&
          /language-/.test(node.firstChild.className)
        );
      },
      replacement: function (content, node: any) {
        const escapeHtml = (unsafe: string) => {
          return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        };
        var language = node.firstChild.className.match(/language-(\w+)/)[1];
        return (
          '```' +
          language +
          '\n' +
          escapeHtml(node.firstChild.textContent) +
          '\n```'
        );
      },
    });

    const contentMarkdown = turndown.turndown(contentHTML);

    if (req.query.format === 'markdown') {
      res.setHeader('Content-Type', 'text/html');

      return res.send(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${story.story.name}</title>
          </head>
          <body>
            <pre>${contentMarkdown}</pre>
          </body>
        </html>
        `
      );
    } else if (req.query.format === 'html') {
      res.setHeader('Content-Type', 'text/html');

      return res.status(200).send(`
          <DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>${story.story.name}</title>
            </head>
            <body>
              ${contentHTML}
            </body>
          </html>
      `);
    } else {
      return res.status(200).json({
        html: contentHTML,
        markdown: turndown.turndown(contentHTML),
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: 'Story not found.',
    });
  }
};

export default handler;
