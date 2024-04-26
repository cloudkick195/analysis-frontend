import React from 'react';
import {Header} from 'layouts';
import {Grid} from '@mui/material';
import {FormLabel} from 'components/atoms';
import {ErrorMessage, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useUserSlice} from 'slices/user';
import {selectUser} from 'slices/user/selectors';
import AlertError from 'components/atoms/alerts/error';
import AlertErrorOrSucess from 'components/atoms/alerts/alertErrorOrSucess';
import DatePickerAtoms from 'components/atoms/form/DatePicker';
import PasswordAtoms from 'components/atoms/form/Password';
import ButtonAtoms from 'components/atoms/form/Button';
import {selectUi} from 'slices/ui/selectors';

const UserCreatePage = () => {
  const dispatch = useDispatch();
  const {createUser} = useUserSlice();
  const {loading, data, error} = useSelector(selectUser);
  const {processing} = useSelector(selectUi);

  return (
    <>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
        style={{minHeight: 'calc(100vh - 110.5px)'}}>
        <div className="d-flex flex-column-fluid">
          <div className="container">
            <Formik
              initialValues={{
                user_name: '',
                password: '',
                limit: 0,
                session_time_out: 0,
                date_of_birth: '',
                first_name: '',
                last_name: '',
              }}
              validationSchema={Yup.object().shape({
                user_name: Yup.string().required('Bắt buộc'),
                password: Yup.string().required('Bắt buộc'),
                limit: Yup.number(),
                session_time_out: Yup.number(),
                date_of_birth: Yup.string(),
                first_name: Yup.string(),
                last_name: Yup.string(),
              })}
              onSubmit={values => {
                const payload = {
                  user_name: values.user_name,
                  password: values.password,
                  limit: values.limit,
                  session_time_out: values.session_time_out,
                  date_of_birth: values.date_of_birth,
                  first_name: values.first_name,
                  last_name: values.last_name,
                };
                dispatch(createUser(payload));
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
                            <FormLabel label="Username" required />
                            <input
                              placeholder="Nhập user_name"
                              name="user_name"
                              className={`form-control ${
                                Boolean(touched.user_name)
                                  ? errors.user_name
                                    ? 'is-invalid'
                                    : 'is-valid'
                                  : ''
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.user_name}
                            />

                            <ErrorMessage
                              name="user_name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <FormLabel label="Password" required />
                            <PasswordAtoms
                              placeholder="Nhập Password"
                              name="password"
                              className={`form-control ${
                                Boolean(touched.password)
                                  ? errors.password
                                    ? 'is-invalid'
                                    : 'is-valid'
                                  : ''
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />

                            <ErrorMessage
                              name="password"
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
                              name="new_password"
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
    </>
  );
};

export default UserCreatePage;
