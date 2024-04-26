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
import {useMemberSlice} from 'slices/member';
import {selectMember} from 'slices/member/selectors';
import {formatDate, renderStatus} from 'utils/general';

const MemberPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    actions,
    setListPaging
  } = useMemberSlice();
  const {data} = useSelector(selectMember);
  const list = data.list;
  
  const [filter, setSearchValue] = useState({
    query: list.query.query,
    status: list.query.status,
  });
  
  const [selectedRow, setSelectedRow] = useState([null, null]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    dispatch(actions.list({
      ...list.query,
      ...router.query
    }));
  }, [router.query]);

  return (
    <>
      <CardMolecules
        title="Thành viên"
        permission="member"
        page="/member/create">
        <TableSearchMolecules
              filter={filter}
              setSearchValue={setSearchValue}>
                <></>
            </TableSearchMolecules>
            <TableMolecules
              cols={[
                [{},'Tài khoản', 'MemberName'],
                [{},'Vai trò', 'MemberRole'],
                [{},'Phòng ban', 'MemberDepartment'],
                [{ width: '120px' },'Trạng Thái', 'Status'],
                [{},'Ngày tạo', 'DateJoin', 'formatDate'],
                [{},'Địa chỉ IP', 'IPAddress'],
               
              ]}
              key="id"
              data={data?.list?.data}
              query={list.query}
              permission="member"
              page="member"
              detail={true}
              deleteAction={
                {
                  setSelectedRow, 
                  setShowDeleteModal,
                  arrField: ['ID', 'MemberName']
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
        <DeleteModal
          text={[selectedRow[0], selectedRow[1]].join('-')}
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onDeleteConfirm={async () => {
            await dispatch(
              actions.delete({id: selectedRow[0]}),
            );
            dispatch(actions.list(list.query));
            setShowDeleteModal(false);
          }}
        />
      </CardMolecules>
    </>
  );
};

export default MemberPage;
