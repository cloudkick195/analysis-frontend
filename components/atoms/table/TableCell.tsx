import React from 'react';
interface IProps{
    children:any
}
const TableCellAtoms = (props: IProps) => {
    const { children } = props;
    
    return (
        <td className="datatable-cell">{children}</td>
    )
}

export default TableCellAtoms