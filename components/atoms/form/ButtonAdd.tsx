/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import Link from 'next/link';

const ButtonAddAtoms = (props: any) => {
  const {page} = props;

  return (
    <Link href={page}>
      <a className="btn btn-success font-weight-bolder">
        <span className="svg-icon svg-icon-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <rect x="0" y="0" width="24" height="24" />
              <circle fill="#000000" cx="9" cy="15" r="6" />
              <path
                d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z"
                fill="#000000"
                opacity="0.3"
              />
            </g>
          </svg>
        </span>
        Thêm mới
      </a>
    </Link>
  );
};

export default ButtonAddAtoms;
