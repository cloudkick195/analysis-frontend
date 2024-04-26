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
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoleSlice} from 'slices/role';
import {selectRole} from 'slices/role/selectors';
import {formatDate} from 'utils/general';

const RolePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {listRole, setListPaging, deleteRole} = useRoleSlice();
  const {data} = useSelector(selectRole);
  const list = data.list;

  const [filter, setSearchValue] = useState({
    query: list.query.query,
    status: list.query.status,
  });
  const [selectedRow, setSelectedRow] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(listRole({
      ...list.query,
      ...router.query
    }));
  }, [router.query]);

  return (
    <>
      <CardMolecules permission="role" title="Role" page="/role/create">
        <TableSearchMolecules filter={filter} setSearchValue={setSearchValue}>
          <></>
        </TableSearchMolecules>
        <TableMolecules
          cols={[
            [{},'Tên Role', 'name'],
            [{},'Quyền', 'guard_name'],
            [{},'Ngày tạo', 'CreatedAt', 'formatDate'],
            [{},'Cập nhật lần cuối', 'UpdatedAt', 'formatDate'],
          ]}
          query={list.query}
          data={list?.data}
          permission="role"
          page="role"
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

          <DeleteModal
            text={selectedRow.join('-')}
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            onDeleteConfirm={async () => {
              await dispatch(deleteRole({id: selectedRow[0]}));
              dispatch(listRole(list.query));
              setShowDeleteModal(false);
            }}
          />
        </div>
      </CardMolecules>
    </>
  );
};

export default RolePage;
