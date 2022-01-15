import { MDXProvider } from '@mdx-js/react';
import Image, { ImageProps } from 'next/image';

import Seo from '@/components/Seo';
import IndexMd from '@/contents/index.mdx';

const ResponsiveImage = (props: ImageProps) => (
  <Image alt={props.alt} layout='responsive' {...props} />
);

const components = {
  img: ResponsiveImage,
};

export default function Post() {
  return (
    <>
      <Seo />
      <div className='py-8 px-20 bg-black space-y-4'>
        <MDXProvider components={components}>
          <IndexMd />
        </MDXProvider>
      </div>
    </>
  );
}
