import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import CustomCode, { Pre } from '@/components/content/CustomCode';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';
import IndexMd from '@/contents/index.mdx';
import useScrollspy from '@/hooks/useScrollspy';

const components: MDXProviderComponentsProp = {
  a: CustomLink,
  code: CustomCode,
  pre: Pre,
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
        <section className='lg:grid-cols-[auto,250px] lg:grid lg:gap-8'>
          <div className='py-8 bg-black space-y-4 flex justify-center'>
            <article className='mdx prose transition-colors dark:prose-invert'>
              <MDXProvider components={components}>
                <IndexMd />
              </MDXProvider>
            </article>
          </div>
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
      </main>
    </>
  );
};

export default Home;
