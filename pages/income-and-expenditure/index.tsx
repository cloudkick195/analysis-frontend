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
import {useIncomeAndExpenditureSlice} from 'slices/income-expenditure';
import {selectIncomeExpenditure} from 'slices/income-expenditure/selectors';
import {formatDate, renderStatus} from 'utils/general';

const IncomeAndExpenditurePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    actions,
    setListPaging
  } = useIncomeAndExpenditureSlice();
  const {data} = useSelector(selectIncomeExpenditure);
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
        title="Thu chi"
        permission="income_expense"
        page="/income-and-expenditure/create">
        <TableSearchMolecules
              filter={filter}
              setSearchValue={setSearchValue}>
                <></>
            </TableSearchMolecules>
            <TableMolecules
              cols={[
                [{},'Tiêu đề', 'Name'],
                [{},'Đường dẫn', 'Slug'],
                [{},'Ngày tạo', 'CreatedAt', 'formatDate'],
                [{},'Cập nhật lần cuối', 'UpdatedAt', 'formatDate'],
                [{},'Danh mục', 'IncomeExpenseCategories.Name', 'child'],
                [{ width: '120px' },'Trạng Thái', 'Status', 'renderStatus'],
              ]}
              key="id"
              data={data?.list?.data}
              query={list.query}
              permission="income_expense"
              page="income-and-expenditure"
              deleteAction={
                {
                  setSelectedRow, 
                  setShowDeleteModal,
                  arrField: ['ID', 'Name']
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

export default IncomeAndExpenditurePage;
