import classNames from 'classnames';
import Link from 'next/link';
import { useMemo } from 'react';
interface IOwnerImageProps {
  owner: { platformId: string; login: string; type?: string };
  className?: string;
  width?: number;
  height?: number;
  withoutLink?: boolean;
}

const OwnerImage = ({
  owner,
  width,
  height,
  className,
  withoutLink = false,
}: IOwnerImageProps) => {
  const ImageComponent = useMemo(
    () => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        width={width || 100}
        height={height || 100}
        src={`https://avatars.githubusercontent.com/u/${owner.platformId}?v=4`}
        alt={`عکس ${owner.login}`}
        className={classNames(
          owner?.type === 'User' ? 'rounded-full' : 'rounded-lg',
          className
        )}
      />
    ),
    [owner, width, height, className]
  );
  return withoutLink ? (
    ImageComponent
  ) : (
    <Link href={`/github/${owner.login}`}>
      <a>{ImageComponent}</a>
    </Link>
  );
};

export default OwnerImage;
