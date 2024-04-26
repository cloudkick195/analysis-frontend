import React from 'react';

const TableHeadAtoms = (props: any) => {
    const { children } = props
    return (
        <thead className="datatable-head">{children}</thead>
    )
}

export default TableHeadAtoms