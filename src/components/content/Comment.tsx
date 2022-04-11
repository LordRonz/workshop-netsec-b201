import Giscus from '@giscus/react';

const Comment = (): JSX.Element => (
  <Giscus
    repo='LordRonz/workshop-netsec-b201'
    repoId='R_kgDOGrOWXA'
    category='Announcements'
    categoryId='DIC_kwDOGrOWXM4CA1T6'
    mapping='pathname'
    reactionsEnabled='0'
    emitMetadata='0'
    theme='dark'
  />
);

export default Comment;
