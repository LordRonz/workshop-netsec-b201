import type { MDXProviderComponentsProp } from '@mdx-js/react';
import { MDXProvider } from '@mdx-js/react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';
import Comment from '@/components/content/Comment';
import CustomCode, { Pre } from '@/components/content/CustomCode';
import type { HeadingScrollSpy } from '@/components/content/TableOfContents';
import TableOfContents from '@/components/content/TableOfContents';
import ArrowLink from '@/components/links/ArrowLink';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';
import IndexMd from '@/contents/index.mdx';
import useScrollspy from '@/hooks/useScrollspy';

const components: MDXProviderComponentsProp = {
  a: CustomLink,
  code: CustomCode,
  pre: Pre,
  Accent,
  Button,
  Comment,
  Image,
  ArrowLink,
  CustomLink,
};

const Home: NextPage = () => {
  const activeSection = useScrollspy();
  const [toc, setToc] = useState<HeadingScrollSpy>();

  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll('.mdx h1, .mdx h2, .mdx h3')
    );

    const headingArr: HeadingScrollSpy = headings.map((heading) => {
      const { id } = heading;
      const level = +heading.tagName.replace('H', '');
      const text = heading.textContent + '';

      return { id, level, text };
    });

    setToc(headingArr);
  }, []);

  return (
    <>
      <Seo />
      <main>
        <div className='bg-black max-w-[68.75rem] mx-auto w-11/12'>
          <section className='lg:grid-cols-[auto,250px] lg:grid lg:gap-8'>
            <article className='mdx prose mx-auto mt-4 w-fulltransition-colors dark:prose-invert'>
              <MDXProvider components={components}>
                <IndexMd />
              </MDXProvider>
            </article>
            <aside className='py-4'>
              <div className='sticky top-36'>
                <TableOfContents
                  toc={toc}
                  minLevel={minLevel}
                  activeSection={activeSection}
                />
              </div>
            </aside>
          </section>
          <figure className='mt-12'>
            <Comment />
          </figure>
        </div>
      </main>
    </>
  );
};

export default Home;
