import { ISbRichtext } from '@storyblok/react';
import { Children } from 'react';
import {
  MARK_LINK,
  NODE_IMAGE,
  NODE_PARAGRAPH,
  render,
} from 'storyblok-rich-text-react-renderer';
import GetImageObject from '../../../utils/image-parser';
import Image from 'next/image';

/**
 * Renders the full content of a blog post.
 */
const PostContent = ({ content }: { content: ISbRichtext }) => {
  return (
    <div
      id="storyblok-post"
      className="page-or-post-css max-w-3xl px-0 sm:px-7 mx-auto">
      {render(content, {
        // Mark resolver to add target to all links.
        markResolvers: {
          [MARK_LINK]: (children, props) => {
            return (
              <a href={props.href} target="_blank">
                {children}
              </a>
            );
          },
        },
        // Custom node resolvers to render images without surrounding <p> tags and as optimized Next.js Image components.
        nodeResolvers: {
          [NODE_PARAGRAPH]: (children) => {
            if (Children.count(children) === 1) {
              // Probably ReactElement.
              const child: any = Children.toArray(children)[0];

              if (
                child.type === 'div' &&
                child.props.className.includes('image-container')
              ) {
                return <div>{children}</div>;
              }
            }
            return <p>{children}</p>;
          },
          [NODE_IMAGE]: (children, props) => {
            if (!props.src) return null;

            const image = GetImageObject(props.src, props.alt, props.title);

            return (
              <div className="image-container">
                {image.source && (
                  <Image
                    src={image.source ? image.source : ''}
                    title={image.title ? image.title : ''}
                    width={image.width}
                    height={image.height}
                    alt={image.alt ? image.alt : 'No alt text for this image.'}
                  />
                )}
              </div>
            );
          },
        },
      })}
    </div>
  );
};

export default PostContent;
