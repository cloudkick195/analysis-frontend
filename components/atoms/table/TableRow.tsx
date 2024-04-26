import React from 'react';

interface IProps{
    children:any;
}
const TableRowAtoms = (props: IProps) => {
    const { children} = props;
    
    return (
        <tr className="datatable-row">{children}</tr>
    )
}

export default TableRowAtoms