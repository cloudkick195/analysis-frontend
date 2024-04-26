import React from 'react';

const TableAtoms = (props: any) => {
    const { children } = props
    return (
        <table className="datatable-table">{children}</table>
    )
}

export default TableAtoms