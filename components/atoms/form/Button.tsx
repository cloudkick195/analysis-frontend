

import React from 'react';
import Link from "next/link"

const ButtonAtoms = (props: any) => {
    const {processing} = props;
  
    return (
      <button
      className={`${props.className} ${processing && 'spinner spinner-white spinner-right'}`}
      disabled={processing}
      >
      {props.children}
    </button>
    )
}

export default ButtonAtoms