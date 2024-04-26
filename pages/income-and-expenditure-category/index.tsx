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

const IncomeAndExpenditureCategoryPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    listIncomeAndExpenditureCategory,
    setListPagingCategory,
    deleteIncomeAndExpenditureCategory,
  } = useIncomeAndExpenditureSlice();
  const {data} = useSelector(selectIncomeExpenditure);
  const list = data.category.list;

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
    dispatch(listIncomeAndExpenditureCategory({
      ...list.query,
      ...router.query
    }));
  }, [router.query]);

  return (
    <>
      <CardMolecules
        title="Danh mục thu chi"
        permission="income_expense_categories"
        page="/income-and-expenditure-category/create">
        <TableSearchMolecules filter={filter} setSearchValue={setSearchValue}>
          <></>
        </TableSearchMolecules>
        <TableMolecules
          cols={[
            [{}, 'Tiêu đề', 'Name'],
            [{}, 'Đường dẫn', 'Slug'],
            [{}, 'Ngày tạo', 'CreatedAt', 'formatDate'],
            [{}, 'Cập nhật lần cuối', 'UpdatedAt', 'formatDate'],
            [{width: '120px'}, 'Trạng Thái', 'Status', 'renderStatus'],
          ]}
          query={list.query}
          data={data?.category?.list?.data}
          permission="income_expense_categories"
          page="income-and-expenditure-category"
          deleteAction={{
            setSelectedRow,
            setShowDeleteModal,
            arrField: ['ID', 'Name'],
          }}
        />
        <div className="datatable datatable-default datatable-head-bg datatable-odd-even">
          <Pagination
            query={list.query}
            total={list.total}
            onPageChange={(newPage: number) => {
              dispatch(
                setListPagingCategory({
                  ...list.query,
                  page: newPage,
                }),
              );
            }}
            onLimitChange={(limit: number) => {
              dispatch(
                setListPagingCategory({
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
              deleteIncomeAndExpenditureCategory({id: selectedRow[0]}),
            );
            dispatch(listIncomeAndExpenditureCategory(list.query));
            setShowDeleteModal(false);
          }}
        />
      </CardMolecules>
    </>
  );
};

export default IncomeAndExpenditureCategoryPage;
