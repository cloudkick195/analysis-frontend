/* eslint-disable react-hooks/exhaustive-deps */
import {Stack} from '@mui/material';
import {ButtonDelete, ButtonEdit, Preloader} from 'components/atoms';
import LinkQueryAtoms from 'components/atoms/LinkQuery';
import {SelectDropdown} from 'components/molecules';
import AddRole from 'components/molecules/AddRole';
import CardMolecules from 'components/molecules/Card';
import CardHeaderMolecules from 'components/molecules/CardHeader';
import CardHeader from 'components/molecules/CardHeader';
import DeleteModal from 'components/molecules/DeleteModal';
import LabelSelectDropdown from 'components/molecules/LabelSelectDropdown';
import PaginationMolecules from 'components/molecules/Pagination';
import TableMolecules from 'components/molecules/Table';
import TableSearchMolecules from 'components/molecules/TableSearch';
import {Header} from 'layouts';
import PermissionCheck from 'layouts/components/PermissionCheck';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState, Component } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoleSlice} from 'slices/role';
import {selectRole} from 'slices/role/selectors';
import {useUserSlice} from 'slices/user';
import {selectUser} from 'slices/user/selectors';
import {formatDate, renderStatus} from 'utils/general';


const UserPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    listUser,
    setListPaging,
    deleteUser,
    setSelectedUsersRole,
    addUsersRoles,
    clearUsersOfRole,
  } = useUserSlice();
  const mainState = useSelector(selectUser);
  const {loading, data, error} = mainState;
  const list = data.list;
  const [filter, setSearchValue] = useState({
    query: list.query.query,
    role_ids: list.query.role_ids,
  });
  const [deletedRow, setSelectedRow] = useState([null, null]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {listRole} = useRoleSlice();
  const stateRole = useSelector(selectRole);
  const arrRole = [{val: '0', name: 'None'}];
  
  if (stateRole.data.list.data.length) {
    arrRole.push(
      ...stateRole.data.list.data.map((item: any) => {
        return {
          val: item.ID + '',
          name: item.name,
        };
      }),
    );
  }

  const arrFilterRole = [{val: '', name: 'All'}, ...arrRole];

  useEffect(() => {
    dispatch(listUser({
      ...list.query,
      ...router.query
    }));
    dispatch(
      listRole({
        litmit: 0,
      }),
    );
  }, [router.query]);

  
  const handleDeleteClick = (row: any) => {
    setSelectedRow([row.user_id, row.user_name]);
    setShowDeleteModal(true);
  };

  const [showCheckbox, setShowCheckbox] = useState(false);

  const handleApplyRoles = async () => {
    const arrUsers = Object.values(data.addRole.user_ids);
    if (data.addRole.role_id && arrUsers?.length > 0) {
      if (data.addRole.role_id == '0') {
        await dispatch(
          clearUsersOfRole({
            user_ids: arrUsers,
          }),
        );
      } else {
        await dispatch(
          addUsersRoles({
            role_ids: [parseInt(data.addRole.role_id)],
            user_ids: arrUsers,
          }),
        );
      }
    }
    dispatch(setSelectedUsersRole({role_id: '0', user_ids: []}));
    dispatch(listUser(list.query));
    setShowCheckbox(false);
  };

  

  return (
    <>
      {loading.list ? (
        <Preloader />
      ) : (
          <CardMolecules permission="user" title="Tài khoản người dùng" page="/user/create">
            <TableSearchMolecules
              filter={filter}
              setSearchValue={setSearchValue}>
              <LabelSelectDropdown
                className="col-md-6 my-2 my-md-0"
                label="Vai trò:"
                name="role_ids"
                value={filter.role_ids}
                handleChange={(val: any) => {
                  setSearchValue({
                    ...filter,
                    role_ids: val,
                  });
                }}
                options={arrFilterRole}
              />
            </TableSearchMolecules>
            <PermissionCheck permission="user-role-PUT">
            <AddRole
              value={data.addRole?.role_id}
              options={arrRole}
              handleChange={(val: any) => {
                dispatch(setSelectedUsersRole({role_id: val}));
              }}
              showCheckbox={showCheckbox}
              setShowCheckbox={setShowCheckbox}
              handleApply={handleApplyRoles}
            />
            </PermissionCheck>

            <TableMolecules
              cols={[
                [{},'Tên người dùng', 'user_name'],
                [{},'Họ và tên', 'first_name,last_name', 'join'],
                [{},'Vai trò', 'roles', 'mapjoin'],
                [{},'Ngày tạo', 'date_of_birth'],
                [{},'Giới hạn', 'limit'],
                [{},'Phiên', 'session_time_out'],
              ]}
              permission="user"
              query={list.query}
              data={data?.list?.data}
              keyAction="id"
              page="user"
              selectBox={{
                showCheckbox: showCheckbox,
                selecteds: data.addRole?.user_ids,
                setSelectedBox: setSelectedUsersRole,
                key: 'user_ids',
              }}
              deleteAction={
                {
                  setSelectedRow,
                  setShowDeleteModal,
                  arrField: ['id', 'user_name']
                }
              }
            />
            <div className="datatable datatable-default datatable-head-bg datatable-odd-even">
              <PermissionCheck permission="user-role-PUT">
              <AddRole
                value={data.addRole?.role_id}
                options={arrRole}
                handleChange={(val: any) => {
                  dispatch(setSelectedUsersRole({role_id: val}));
                }}
                showCheckbox={showCheckbox}
                setShowCheckbox={setShowCheckbox}
                handleApply={handleApplyRoles}
              />
              </PermissionCheck>
              <PaginationMolecules
                query={{
                  ...list.query,
                  ...router.query,
                }}
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
                      ...router.query,
                      limit: limit,
                    }),
                  );
                }}
              />
              <DeleteModal
                text={[deletedRow[0], deletedRow[1]].join('-')}
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onDeleteConfirm={async () => {
                  await dispatch(deleteUser({user_id: deletedRow[0]}));
                  dispatch(listUser(list.query));
                  setShowDeleteModal(false);
                }}
              />
            </div>
          </CardMolecules>

      )}
 </>
  );
};

export default UserPage;
