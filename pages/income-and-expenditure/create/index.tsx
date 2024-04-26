/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import {FormLabel} from 'components/atoms';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {generateSlugFromTitle} from 'utils/general';
import {PaymentTypeEnum, StatusEnum} from 'utils/enum';
import {useDispatch, useSelector} from 'react-redux';
import {useIncomeAndExpenditureSlice} from 'slices/income-expenditure';
import {selectUi} from 'slices/ui/selectors';
import GroupCheckbox from 'components/molecules/GroupCheckbox';
import {selectIncomeExpenditure} from 'slices/income-expenditure/selectors';
import {useRouter} from 'next/router';
import LabelSelectDropdown from 'components/molecules/LabelSelectDropdown';
import {SelectDropdown} from 'components/molecules';
import ButtonAtoms from 'components/atoms/form/Button';

const IncomeAndExpenditureCategoryCreatePage = () => {
  const dispatch = useDispatch();
  const {actions, listIncomeAndExpenditureCategory} =
    useIncomeAndExpenditureSlice();
  const {processing} = useSelector(selectUi);

  const datatIncomeExpenditure = useSelector(selectIncomeExpenditure);

  const arrFilterRole = [
    {val: '', name: '--Chọn danh mục'},
    ...datatIncomeExpenditure?.data?.category?.list.data.map((item: any) => {
      return {
        val: item.ID,
        name: item.Name,
      };
    }),
  ];

  useEffect(() => {
    dispatch(listIncomeAndExpenditureCategory({limit: -1}));
  }, []);

  return (
    <Formik
      initialValues={{
        name: '',
        slug: '',
        status: StatusEnum.ACTIVE,
        description: '',
        IncomeExpenseCategoryId: '',
        price: '',
        type: PaymentTypeEnum.INCOME,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Bắt buộc'),
        slug: Yup.string().required('Bắt buộc'),
        type: Yup.number().oneOf([
          PaymentTypeEnum.INCOME,
          PaymentTypeEnum.EXPENSE,
        ]),
        IncomeExpenseCategoryId: Yup.number(),
        price: Yup.number().required('Bắt buộc'),
        description: Yup.string(),
      })}
      onSubmit={values => {
        const payload = {
          name: values.name,
          slug: values.slug,
          status: values.status,
          type: Number(values.type),
          income_expense_category_id:
            values.IncomeExpenseCategoryId || undefined,
          price: values.price,
          description: values.description,
        };
        dispatch(actions.create(payload));
      }}>
      {({errors, handleSubmit, setFieldValue, touched, values}) => (
        <Form onSubmit={handleSubmit} className="form">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={8} lg={9}>
              <div className="card card-custom gutter-b">
                <div className="card-header flex-wrap border-0 pt-6 pb-0">
                  <div className="card-title">
                    <h3 className="card-label">Tạo mới thu chi</h3>
                  </div>
                  <div className="card-toolbar">
                    {/* Add your toolbar content here */}
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <FormLabel label="Tiêu đề" required />
                    <Field
                      type="text"
                      name="name"
                      className={`form-control ${
                        touched.name && errors.name ? 'is-invalid' : ''
                      }`}
                      onChange={(e: any) => {
                        setFieldValue('name', e.target.value);
                        setFieldValue(
                          'slug',
                          generateSlugFromTitle(e.target.value),
                        );
                      }}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <FormLabel label="Đường dẫn" required />
                    <Field
                      type="text"
                      name="slug"
                      className={`form-control ${
                        touched.slug && errors.slug ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="slug"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Add other form fields here */}
                  <div className="form-group">
                    <FormLabel label="Loại thu chi" required />
                    <Field as="select" name="type" className="form-control">
                      <option value={1}>Thu</option>
                      <option value={2}>Chi</option>
                    </Field>
                  </div>

                  <div className="form-group">
                    <FormLabel label="Giá" required />
                    <Field
                      type="number"
                      name="price"
                      className={`form-control ${
                        touched.price && errors.price ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <FormLabel label="Mô tả" />
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control"
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
                            values.status === StatusEnum.ACTIVE ? true : false
                          }
                          value={values.status}
                          onChange={(e: any) => {
                            switch (Number(e.target.value)) {
                              case StatusEnum.ACTIVE:
                                setFieldValue('status', StatusEnum.INACTIVE);
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
              <div className="card card-custom gutter-b">
                <div className="card-body">
                  {/* ... */}
                  <div className="form-group">
                    <FormLabel label="Danh mục" />
                    <SelectDropdown
                      name="IncomeExpenseCategoryId"
                      value={values.IncomeExpenseCategoryId}
                      handleChange={(val: any) => {
                        setFieldValue('IncomeExpenseCategoryId', val);
                      }}
                      options={arrFilterRole}
                    />
                    <ErrorMessage
                      name="IncomeExpenseCategoryId"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default IncomeAndExpenditureCategoryCreatePage;
