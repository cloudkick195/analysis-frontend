import React from 'react';

const TableBodyAtoms = (props: any) => {
    const { children } = props
    return (
        <tbody className="datatable-body">{children}</tbody>
    )
}

export default TableBodyAtoms