import { useRef } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

const variants = {
  primary: 'btn btn--primary',
  glass: 'btn btn--glass glass',
  ghost: 'btn btn--ghost',
};

/**
 * Renders an <a> when `href` is given, otherwise a <button>.
 * `magnetic` adds a subtle pull toward the pointer on fine-pointer devices.
 */
export function Button({ variant = 'primary', size, magnetic = false, href, className = '', children, ...rest }) {
  const ref = useRef(null);
  useMagnetic(ref, magnetic);

  const cls = [variants[variant], size === 'sm' && 'btn--sm', className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a ref={ref} href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
