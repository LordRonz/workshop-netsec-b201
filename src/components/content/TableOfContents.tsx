import { useEffect, useRef } from 'react';

import TOCLink from '@/components/links/TOCLink';

export type HeadingScrollSpy = {
  id: string;
  level: number;
  text: string;
}[];

type TableOfContentsProps = {
  toc?: HeadingScrollSpy;
  activeSection: string | null;
  minLevel: number;
};

const TableOfContents = ({
  toc,
  activeSection,
  minLevel,
}: TableOfContentsProps) => {
  //#region  //*=========== Scroll into view ===========
  const lastPosition = useRef<number>(0);

  useEffect(() => {
    const container = document.getElementById('toc-container');
    const activeLink = document.getElementById(`link-${activeSection}`);

    if (container && activeLink) {
      // Get container properties
      const cTop = container.scrollTop;
      const cBottom = cTop + container.clientHeight;

      // Get activeLink properties
      const lTop = activeLink.offsetTop - container.offsetTop;
      const lBottom = lTop + activeLink.clientHeight;

      // Check if in view
      const isTotal = lTop >= cTop && lBottom <= cBottom;

      const isScrollingUp = lastPosition.current > window.scrollY;
      lastPosition.current = window.scrollY;

      if (!isTotal) {
        // Scroll by the whole clientHeight
        const offset = 25;
        const top = isScrollingUp
          ? lTop - container.clientHeight + offset
          : lTop - offset;

        container.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [activeSection]);
  //#endregion  //*======== Scroll into view ===========

  return (
    <div
      id='toc-container'
      className='max-h-[calc(100vh-9rem-113px)] hidden overflow-auto pb-4 lg:block'
    >
      <h3 className='text-gray-900 md:text-xl dark:text-gray-100'>
        Table of Contents
      </h3>
      <div className='flex flex-col mt-4 space-y-2 text-sm'>
        {toc &&
          toc.map(({ id, level, text }) => (
            <TOCLink
              id={id}
              key={id}
              activeSection={activeSection}
              level={level}
              minLevel={minLevel}
              text={text}
            />
          ))}
      </div>
    </div>
  );
};

export default TableOfContents;
