/* eslint-disable react-hooks/exhaustive-deps */
import {Stack} from '@mui/material';
import {
  ButtonDelete,
  ButtonEdit,
  Table,
  TableBody,
  TableCellHead,
  TableCell,
  TableHead,
  TableRow,
} from 'components/atoms';
import LinkQueryAtoms from 'components/atoms/LinkQuery';
import {
  DeleteModal,
  Pagination,
  Search,
  SelectDropdown,
} from 'components/molecules';
import CardMolecules from 'components/molecules/Card';
import TableMolecules from 'components/molecules/Table';
import TableSearchMolecules from 'components/molecules/TableSearch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {usePermissionSlice} from 'slices/permission';
import {selectPermission} from 'slices/permission/selectors';
import {formatDate} from 'utils/general';

const PermissionPage = () => {
  const dispatch = useDispatch();
  const router = useRouter()

  const {
    listPermission,
    setListPaging,
    deletePermission,
  } = usePermissionSlice();
  const {data} = useSelector(selectPermission);
  const list = data.list;

  const [filter, setSearchValue] = useState({
    query: list.query.query,
    status: list.query.status,
  });
  const [selectedRow, setSelectedRow] = useState([null, null]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (row: any) => {
    setSelectedRow([row.id, row.slug]);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    if(!router.query?.sort){
      router.query.sort = "name desc"
    }
    dispatch(listPermission({
      ...list.query,
      ...router.query
    }));
  }, [router.query]);


  return (
    <>
      <CardMolecules permission="permission" title="Permission" page="/permission/create">
        <TableSearchMolecules filter={filter} setSearchValue={setSearchValue}>
          <></>
        </TableSearchMolecules>
        <TableMolecules
          cols={[
            [{},'Tên Permission', 'name'],
            [{},'Quyền', 'guard_name'],
            [{},'Ngày tạo', 'CreatedAt', 'formatDate'],
            [{},'Cập nhật lần cuối', 'UpdatedAt', 'formatDate'],
          ]}
          query={list.query}
          data={list?.data}
          permission="permission"
          page="permission"
          deleteAction={
            {
              setSelectedRow,
              setShowDeleteModal,
              arrField: ['ID', 'name']
            }
          }
        />
            <div className="datatable datatable-default datatable-head-bg datatable-odd-even">
          <Pagination
              query={list.query}
              total={list.total}
              onPageChange={(newPage: number) => {
                dispatch(
                  setListPaging({
                    ...list.query,
                    page: newPage,
                  }),
                );
              }}
              onLimitChange={(limit: number) => {
                dispatch(
                  setListPaging({
                    ...list.query,
                    limit: limit,
                  }),
                );
              }}
            />
            </div>
        </CardMolecules>
        <DeleteModal
            text={[selectedRow[0], selectedRow[1]].join('-')}
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            onDeleteConfirm={async () => {
              await dispatch(
                deletePermission({id: selectedRow[0]}),
              );
              dispatch(listPermission(list.query));
              setShowDeleteModal(false);
            }}
          />
    </>
  );
};

export default PermissionPage;
