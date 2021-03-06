import clsx from 'clsx';

export type AccentType = React.ComponentPropsWithoutRef<'span'>;

const Accent = ({ children, className }: AccentType) => {
  return (
    <span
      className={clsx(
        'transition-colors',
        // 'from-primary-300/40 to-primary-400/40 via-primary-300/40',
        'text-transparent bg-clip-text bg-gradient-to-tr from-primary-300 to-primary-100 dark:print:text-white print:text-black',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Accent;
