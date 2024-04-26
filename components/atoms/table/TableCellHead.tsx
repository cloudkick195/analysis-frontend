import React from 'react';

const TableCellHeadAtoms = (props: any, key:any) => {
    const { children } = props;
    
    return (
        <th className="datatable-cell">{children}</th>
    )
}

export default TableCellHeadAtoms