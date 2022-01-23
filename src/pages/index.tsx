import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react';
import { NextPage } from 'next';

import CustomCode, { Pre } from '@/components/content/CustomCode';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';
import IndexMd from '@/contents/index.mdx';

const components: MDXProviderComponentsProp = {
  a: CustomLink,
  code: CustomCode,
  pre: Pre,
};

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <div className='py-8 bg-black space-y-4 flex justify-center'>
        <article className='mdx prose transition-colors dark:prose-invert'>
          <MDXProvider components={components}>
            <IndexMd />
          </MDXProvider>
        </article>
      </div>
    </>
  );
};

export default Home;
