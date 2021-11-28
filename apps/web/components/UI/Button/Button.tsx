import { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import PrimaryButton from './PrimaryButton';
import classNames from 'classnames';
import RedButton from './RedButton';
import OutlineButton from './OutlineButton';
import GhostButton from './GhostButton';
enum RadiusesEnum {
  'sm' = 'rounded-sm',
  'md' = 'rounded-md',
  'lg' = 'rounded-lg',
  'xl' = 'rounded-xl',
  '2xl' = 'rounded-2xl',
  'full' = 'rounded-full',
}
enum SizeEnum {
  'xs' = 'text-xs border font-medium py-1 px-1.5',
  'sm' = 'text-sm border font-medium py-1 px-2.5',
  'md' = 'text-base border font-medium py-1.5 px-3.5',
  'lg' = 'text-lg border-2 font-medium py-2 px-5',
  'xl' = 'text-xl border-2 font-bold py-3 px-8',
}

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children: React.ReactNode;
  href?: string;
  rounded?: keyof typeof RadiusesEnum;
  size?: keyof typeof SizeEnum;
  className?: string;
}

const Button = ({
  children,
  href = null,
  rounded = 'md',
  size = 'md',
  className,
  ...props
}: IButtonProps) => {
  const Component = href ? 'a' : `button`;
  const output = (
    <Component
      {...props}
      className={classNames(
        className,
        RadiusesEnum[rounded],
        SizeEnum[size],
        'text-center cursor-pointer inline-flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50'
      )}
    >
      {children}
    </Component>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        {output}
      </Link>
    );
  }

  return output;
};

Button.Primary = PrimaryButton;
Button.Red = RedButton;
Button.Outline = OutlineButton;
Button.Ghost = GhostButton;

export default Button;
