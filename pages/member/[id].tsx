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

const MemberDetailPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {actions, setCategoryListPaging, listMemberActivity} = useMemberSlice();
  const {category, data} = useSelector(selectMember);
  const list = category.list;

  const [filter, setSearchValue] = useState({
    query: list.query.query,
    status: list.query.status,
  });
  const [selectedRow, setSelectedRow] = useState([null, null]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  
  useEffect(() => {
    const {id} = router.query;
    if (id) {
      dispatch(actions.detail(id));
      dispatch(listMemberActivity({
        id: id,
        query: {
          ...list.query,
          ...router.query
        }
      }));
    }
  }, [router.query]);

  return (
    data?.detail && (
      <>
        <CardMolecules
          title={[
            data?.detail?.ID + '',
            data?.detail?.MemberName,
            data?.detail?.MemberRole,
            data?.detail?.Status,
          ]
            .map(item => item?.trim() || "")
            .filter(item => !!item)
            .join(' - ')}
          permission="member"
          page="">
          <TableSearchMolecules filter={filter} setSearchValue={setSearchValue}>
            <></>
          </TableSearchMolecules>
          <TableMolecules
            cols={[
              [{}, 'Hành động', 'ActivityPerformed'],
              [{}, 'Bắt đầu', 'StartTime', 'formatDate'],
              [{}, 'Kết thúc', 'EndTime', 'formatDate'],
              [{}, 'Đồng hồ', 'TotalClockinTime'],
              [{}, 'Nghỉ', 'RestDuration'],
              [{}, 'Số lần', 'RestTime'],
            ]}
            key="id"
            data={list?.data}
            query={list.query}
            permission="member"
            page="member"
            deleteAction={{
              setSelectedRow,
              setShowDeleteModal,
              arrField: ['ID', 'MemberName'],
            }}
          />
          <div className="datatable datatable-default datatable-head-bg datatable-odd-even">
            <Pagination
              query={list.query}
              // limit={list.query.limit}
              // page={list.query.page}
              total={list.total}
              onPageChange={(newPage: number) => {
                dispatch(
                  setCategoryListPaging({
                    ...list.query,
                    page: newPage,
                  }),
                );
              }}
              onLimitChange={(limit: number) => {
                dispatch(
                  setCategoryListPaging({
                    ...list.query,
                    ...router.query,
                    limit: limit,
                  }),
                );
              }}
            />
          </div>
        </CardMolecules>
      </>
    )
  );
};

export default MemberDetailPage;
