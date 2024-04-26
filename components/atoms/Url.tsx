import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
interface IProps {
  className: string;
  text: string;
  query: object;
}
const UrlAtoms = ({text, query, className, ...props}: IProps) => {
  const router = useRouter();

  return (
    <Link
      {...props}
      href={{
        query: {
          ...router.query,
          ...query,
        },
      }}
      className={className}>
      <a className={className}>{text}</a>
    </Link>
  );
};

export default UrlAtoms;
