/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Grid} from '@mui/material';
import {FormLabel} from 'components/atoms';
import {ErrorMessage, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {StatusEnum} from 'utils/enum';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {usePermissionSlice} from 'slices/permission';
import {selectPermission} from 'slices/permission/selectors';
import {selectUi} from 'slices/ui/selectors';
import ButtonAtoms from 'components/atoms/form/Button';

const PermissionEditPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {detailPermission, editPermission} = usePermissionSlice();
  const {data} = useSelector(selectPermission);
  const {processing} = useSelector(selectUi);

  useEffect(() => {
    const {id} = router.query;

    if (id) {
      dispatch(detailPermission(id));
    }
  }, [router]);

  return (
    <>
      {data?.detail && (
        <Formik
          initialValues={{
            name: data.detail?.name ?? '',
            guard_name: data.detail?.guard_name ?? '',
            description: data.detail.description ?? '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Bắt buộc'),
            guard_name: Yup.string().required('Bắt buộc'),
            description: Yup.string(),
          })}
          onSubmit={values => {
            const payload = {
              id: data.detail?.ID,
              name: values.name,
              guard_name: values.guard_name,
              description: values.description,
            };
            dispatch(editPermission(payload));
          }}>
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            touched,
            values,
          }) => (
            <Form onSubmit={handleSubmit} className="form">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={8} lg={9}>
                  <div className="card card-custom gutter-b">
                    <div className="card-body">
                      <div className="form-group">
                        <FormLabel label="Tiêu đề" required />
                        <input
                          placeholder="Nhập tên"
                          name="name"
                          className={`form-control ${
                            Boolean(touched.name)
                              ? errors.name
                                ? 'is-invalid'
                                : 'is-valid'
                              : ''
                          }`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />

                        <ErrorMessage
                          name="name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <FormLabel label="Tên bảo vệ" required />
                        <input
                          name="guard_name"
                          className={`form-control ${
                            Boolean(touched.guard_name)
                              ? errors.guard_name
                                ? 'is-invalid'
                                : 'is-valid'
                              : ''
                          }`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.guard_name}
                        />

                        <ErrorMessage
                          name="guard_name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <FormLabel label="Mô tả" />
                        <input
                          name="description"
                          className={`form-control ${
                            Boolean(touched.description)
                              ? errors.description
                                ? 'is-invalid'
                                : 'is-valid'
                              : ''
                          }`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                        />

                        <ErrorMessage
                          name="description"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <div className="card card-custom gutter-b">
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
      )}
    </>
  );
};

export default PermissionEditPage;
