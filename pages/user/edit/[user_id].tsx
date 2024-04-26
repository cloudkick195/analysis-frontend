/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Header} from 'layouts';
import {Grid} from '@mui/material';
import {DatePicker, FormLabel, Preloader} from 'components/atoms';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useUserSlice} from 'slices/user';
import {selectUser} from 'slices/user/selectors';
import AlertError from 'components/atoms/alerts/error';
import AlertErrorOrSucess from 'components/atoms/alerts/alertErrorOrSucess';
import {useRouter} from 'next/router';
import DatePickerAtoms from 'components/atoms/form/DatePicker';
import GroupCheckbox from 'components/molecules/GroupCheckbox';
import {useRoleSlice} from 'slices/role';
import {selectRole} from 'slices/role/selectors';
import PasswordAtoms from 'components/atoms/form/Password';
import ButtonAtoms from 'components/atoms/form/Button';
import {selectUi} from 'slices/ui/selectors';

const UserEditPage = () => {
  const dispatch = useDispatch();
  const {
    detailUser,
    editUser,
    setRole,
    setSelectedUsersRole,
    addUsersRoles,
    removeUsersRoles,
  } = useUserSlice();
  const {loading, data, error} = useSelector(selectUser);

  const router = useRouter();
  const {processing} = useSelector(selectUi);
  const {listRole} = useRoleSlice();
  const stateRole = useSelector(selectRole);

  processing;

  const roleUsers = data?.detail?.roles;

  useEffect(() => {
    const {user_id} = router.query;

    if (user_id) {
      dispatch(detailUser(user_id));
      dispatch(
        listRole({
          litmit: 0,
        }),
      );
    }
  }, [router]);

  return (
    <>
      {data?.detail && (
        <div
          className="content d-flex flex-column flex-column-fluid"
          id="kt_content"
          style={{minHeight: 'calc(100vh - 110.5px)'}}>
          <div className="d-flex flex-column-fluid">
            <div className="container">
              <Formik
                initialValues={{
                  user_name: data.detail?.user_name ?? '',
                  new_password: '',
                  limit: data.detail?.limit ?? 0,
                  session_time_out: data.detail?.session_time_out ?? 0,
                  date_of_birth: data.detail?.date_of_birth ?? '',
                  first_name: data.detail?.first_name ?? '',
                  last_name: data.detail?.last_name ?? '',
                }}
                validationSchema={Yup.object().shape({
                  user_name: Yup.string().required('Bắt buộc'),
                  new_password: Yup.string(),
                  limit: Yup.number(),
                  session_time_out: Yup.number(),
                  date_of_birth: Yup.date(),
                  first_name: Yup.string(),
                  last_name: Yup.string(),
                })}
                onSubmit={values => {
                  const payload = {
                    user_name: values.user_name,
                    new_password: values.new_password,
                    limit: parseInt(values.limit),
                    session_time_out: parseInt(values.session_time_out),
                    date_of_birth: values.date_of_birth,
                    first_name: values.first_name,
                    last_name: values.last_name,
                  };
                  dispatch(editUser(payload));

                  const deletedRoles = Object.values(data.detail.deletedRoles);
                  const newRoles = Object.values(data.detail.addRoles);
                  if (newRoles.length > 0) {
                    dispatch(
                      addUsersRoles({
                        user_ids: [data.detail.id],
                        role_ids: newRoles,
                      }),
                    );
                  }

                  if (deletedRoles.length > 0) {
                    dispatch(
                      removeUsersRoles({
                        user_ids: [data.detail.id],
                        role_ids: deletedRoles,
                      }),
                    );
                  }
                }}>
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  values,
                }) => (
                  <Form onSubmit={handleSubmit} className="form">
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={8} lg={9}>
                        <div className="card card-custom gutter-b">
                          <div className="card-body">
                            <div className="form-group">
                              <FormLabel label="Username" />
                              <input
                                type="text"
                                name="user_name"
                                className="form-control"
                                disabled
                                value={values.user_name}
                              />
                            </div>
                            <div className="form-group">
                              <FormLabel label="Password" />
                              <PasswordAtoms
                                placeholder="Nhập Password nếu muốn thay đổi"
                                name="new_password"
                                className={`form-control ${
                                  Boolean(touched.new_password)
                                    ? errors.new_password
                                      ? 'is-invalid'
                                      : 'is-valid'
                                    : ''
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.new_password}
                              />
                         
                              <ErrorMessage
                                name="new_password"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <FormLabel label="Limit" />
                              <input
                                placeholder="Nhập Limit"
                                name="limit"
                                className={`form-control ${
                                  Boolean(touched.limit)
                                    ? errors.limit
                                      ? 'is-invalid'
                                      : 'is-valid'
                                    : ''
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.limit}
                              />
                      
                              <ErrorMessage
                                name="limit"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <FormLabel label="Session Timeout" />
                              <input
                                placeholder="Nhập Session Timeout"
                                name="session_time_out"
                                className={`form-control ${
                                  Boolean(touched.session_time_out)
                                    ? errors.session_time_out
                                      ? 'is-invalid'
                                      : 'is-valid'
                                    : ''
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.session_time_out}
                              />
                              
                              <ErrorMessage
                                name="session_time_out"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <FormLabel label="Họ" />
                              <input
                                placeholder="Nhập họ"
                                name="first_name"
                                className={`form-control ${
                                  Boolean(touched.first_name)
                                    ? errors.first_name
                                      ? 'is-invalid'
                                      : 'is-valid'
                                    : ''
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.first_name}
                              />
                        
                              <ErrorMessage
                                name="first_name"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <FormLabel label="Tên" />
                              <input
                                placeholder="Nhập tên"
                                name="last_name"
                                className={`form-control ${
                                  Boolean(touched.last_name)
                                    ? errors.last_name
                                      ? 'is-invalid'
                                      : 'is-valid'
                                    : ''
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.last_name}
                              />

                              <ErrorMessage
                                name="last_name"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <FormLabel label="Ngày sinh" />
                              <DatePickerAtoms name="date_of_birth" />
                            </div>

                            {/* {error.changePassword && error.changePassword === "success" && <Alert severity="success">Cập nhật thành công</Alert>} */}
                            {/* {error.changePassword && error.changePassword !== "success" && <Alert severity="error">{error.changePassword}</Alert>} */}
                          </div>
                        </div>
                        <Grid item xs={12} sm={6} md={8} lg={9}>
                          <div className="card card-custom gutter-b">
                            <div className="card-body">
                              {/* ... */}
                              <div className="form-group">
                                <FormLabel
                                  label="Quyền"
                                  className="font-weight-bolder"
                                />
                                <GroupCheckbox
                                  options={stateRole.data.list.data}
                                  name="role"
                                  optionsCheckeds={roleUsers || {}}
                                  onChecked={(event: any) => {
                                    dispatch(setRole(event.target.value));
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <div className="card card-custom gutter-b">
                          {/* <div className="card-body">
                                                    <div className="form-group d-flex align-items-center">
                                                        <FormLabel label="Trạng thái" inline />
                                                        <span className="switch switch-outline switch-success switch-sm">
                                                            <label>
                                                                <input
                                                                    name="status"
                                                                    type="checkbox"
                                                                    checked={
                                                                        values.status === StatusEnum.ACTIVE
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    value={values.status}
                                                                    onChange={(e: any) => {
                                                                        switch (Number(e.target.value)) {
                                                                            case StatusEnum.ACTIVE:
                                                                                setFieldValue(
                                                                                    'status',
                                                                                    StatusEnum.INACTIVE,
                                                                                );
                                                                                break;
                                                                            case StatusEnum.INACTIVE:
                                                                                setFieldValue(
                                                                                    'status',
                                                                                    StatusEnum.ACTIVE,
                                                                                );
                                                                                break;
                                                                            default:
                                                                                setFieldValue(
                                                                                    'status',
                                                                                    StatusEnum.ACTIVE,
                                                                                );
                                                                                break;
                                                                        }
                                                                    }}
                                                                />
                                                                <span></span>
                                                            </label>
                                                        </span>
                                                    </div>
                                                </div> */}
                          <div className="card-footer text-right">
                            <ButtonAtoms
                              type="submit"
                              className={`btn btn-success font-weight-bold`}
                              processing={processing}>
                              Submit
                            </ButtonAtoms>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserEditPage;
