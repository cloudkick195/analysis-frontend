import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
interface IProps {
  className: string;
  text: string;
  query: object;
}
const LinkQueryAtoms = ({text, query, className, ...props}: IProps) => {
  const router = useRouter();

  return (
    <Link
      {...props}
      className={className}
      href={{
        query: {
          ...router.query,
          ...query,
        },
      }}>
      <a className={className}>{text}</a>
    </Link>
  );
};

export default LinkQueryAtoms;
