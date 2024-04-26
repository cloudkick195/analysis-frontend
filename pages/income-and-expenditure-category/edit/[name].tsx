/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Grid} from '@mui/material';
import {FormLabel} from 'components/atoms';
import {ErrorMessage, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {StatusEnum} from 'utils/enum';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {useIncomeAndExpenditureSlice} from 'slices/income-expenditure';
import {selectIncomeExpenditure} from 'slices/income-expenditure/selectors';
import {selectUi} from 'slices/ui/selectors';
import ButtonAtoms from 'components/atoms/form/Button';

const IncomeAndExpenditureCategoryEditPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {detailIncomeAndExpenditureCategory, editIncomeAndExpenditureCategory} =
    useIncomeAndExpenditureSlice();
  const {data} = useSelector(selectIncomeExpenditure);
  const {processing} = useSelector(selectUi);

  useEffect(() => {
    if (router && router.query && router.query.name) {
      dispatch(detailIncomeAndExpenditureCategory(router.query.name));
    }
  }, [router]);

  return (
    <>
      {data && data.category && data.category.detail && (
        <Formik
          initialValues={{
            title: data.category.detail?.Name ?? '',
            slug: data.category.detail?.Slug ?? '',
            status: data.category.detail.Status ?? StatusEnum.ACTIVE,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required('Bắt buộc'),
            slug: Yup.string().required('Bắt buộc'),
          })}
          onSubmit={values => {
            const payload = {
              id: data.category.detail?.ID,
              name: values.title,
              slug: values.slug,
              status: values.status,
            };
            dispatch(editIncomeAndExpenditureCategory(payload));
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
                          placeholder="Nhập tiêu đề thu chi"
                          name="title"
                          className={`form-control ${
                            Boolean(touched.title)
                              ? errors.title
                                ? 'is-invalid'
                                : 'is-valid'
                              : ''
                          }`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <FormLabel label="Đường dẫn" required />
                        <input
                          name="slug"
                          className={`form-control ${
                            Boolean(touched.slug)
                              ? errors.slug
                                ? 'is-invalid'
                                : 'is-valid'
                              : ''
                          }`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.slug}
                        />

                        <ErrorMessage
                          name="slug"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <div className="card card-custom gutter-b">
                    <div className="card-body">
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
                                    setFieldValue('status', StatusEnum.ACTIVE);
                                    break;
                                  default:
                                    setFieldValue('status', StatusEnum.ACTIVE);
                                    break;
                                }
                              }}
                            />
                            <span></span>
                          </label>
                        </span>
                      </div>
                    </div>
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

export default IncomeAndExpenditureCategoryEditPage;
