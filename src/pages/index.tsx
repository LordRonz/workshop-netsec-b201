import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react';
import { NextPage } from 'next';

import Seo from '@/components/Seo';
import IndexMd from '@/contents/index.mdx';

const components: MDXProviderComponentsProp = {};

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <div className='py-8 bg-black space-y-4 flex justify-center'>
        <article className='prose dark:prose-invert'>
          <MDXProvider components={components}>
            <IndexMd />
          </MDXProvider>
        </article>
      </div>
    </>
  );
};

export default Home;
