import {Stack} from '@mui/material';
import {
  ButtonDelete,
  ButtonEdit,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
} from 'components/atoms';
import PermissionCheck from 'layouts/components/PermissionCheck';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {formatDate, renderStatus} from 'utils/general';

interface IValMethod {
  [key: string]: (item: any, key: string) => any;
}
const valMethod: IValMethod = {
  join: (item: any, key: string) => {
    return key
      .split(',')
      .map(e => item[e])
      .join(' ');
  },
  child: (item: any, key: string) => {
    const [parent, child] = key.split('.');
    const val = item[parent][child];

    return val;
  },
  mapjoin: (item: any, key: string) => {
    const val = item[key];
    return (
      (val?.length > 0 && val.map((role: any) => role.name).join(', ')) || ''
    );
  },
  formatDate: (item: any, key: string) => {
    const val = item[key];
    const date = moment(val);
    return date.isValid() ? formatDate(val) : '';
  },
  renderStatus: (item: any, key: string) => {
    const val = item[key];
    console.log(33, val, key, item);

    return renderStatus(val);
  },
};
interface IProps {
  page: string;
  data: any;
  cols: any;
  keyAction?: string;
  query: {
    query: any;
  };

  selectBox: {
    showCheckbox: boolean;
    selecteds: string;
    setSelectedBox: any;
    key: string;
  } | null;
  deleteAction: {
    setSelectedRow: any;
    setShowDeleteModal: any;
    arrField: Array<string>;
  };
  detail?: boolean;
  permission: string;
}
const TableMolecules = ({
  page,
  selectBox,
  cols,
  data,
  deleteAction,
  detail,
  query,
  keyAction,
  permission,
}: any) => {
  const dispatch = useDispatch();
  const handleDeleteClick = (row: any) => {
    deleteAction.setSelectedRow(row);
    deleteAction.setShowDeleteModal(true);
  };
  let numCol = 0;
  return (
    <div className="datatable datatable-default datatable-head-bg datatable-odd-even">
      <Table>
        <TableHead>
          <TableRow>
            {selectBox?.showCheckbox && <TableCellHead></TableCellHead>}
            <TableCellHead key={1}>
              <span>STT</span>
            </TableCellHead>
            {cols.map((item: any, idx: number) => {
              return (
                <TableCellHead key={idx + 1}>
                  <span style={item[0]}>{item[1]}</span>
                </TableCellHead>
              );
            })}
            <TableCellHead></TableCellHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 &&
            data.map((item: any, idx: number) => {
              const numId = idx + 2;

              return (
                <TableRow key={numId}>
                  {selectBox?.showCheckbox && (
                    <TableCell>
                      <input
                        type="checkbox"
                        name="selectBox"
                        checked={!!selectBox.selecteds[item.id]}
                        onChange={() => {
                          var obj: any = {};
                          obj[selectBox.key] = [item.id];
                          dispatch(selectBox.setSelectedBox(obj));
                          // dispatch(
                          //   selectBox.setSelectedBox({
                          //     user_ids: [item.id],
                          //   }),
                          // )
                        }}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <span>{(query.page - 1) * query.limit + idx + 1}</span>
                  </TableCell>
                  {cols.map((e: any, idxCol: any) => {
                    numCol++;
                    const func = e[3];
                    if (func) {
                      if (!valMethod[func]) return;
                      return (
                        <TableCell key={idxCol}>
                          <span>{valMethod[func](item, e[2])}</span>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={numCol}>
                        <span>{item[e[2]]}</span>
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {detail && (
                        <Link
                          href={`${page}/${
                            keyAction ? item[keyAction] : item?.ID
                          }`}>
                          <a className="btn btn-icon btn-light-dark btn-circle btn-sm">
                            <i className="flaticon-search"></i>
                          </a>
                        </Link>
                      )}
                      <PermissionCheck permission={`${permission}-PUT`}>
                        <ButtonEdit
                          page={page}
                          slug={keyAction ? item[keyAction] : item?.ID}
                        />
                      </PermissionCheck>
                      <PermissionCheck permission={`${permission}-DELETE`}>
                        <ButtonDelete
                          idx={keyAction ? item[keyAction] : item?.ID}
                          handleClick={() =>
                            handleDeleteClick(
                              deleteAction.arrField.map(
                                (key: string) => item[key],
                              ),
                            )
                          }
                        />
                      </PermissionCheck>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableMolecules;
