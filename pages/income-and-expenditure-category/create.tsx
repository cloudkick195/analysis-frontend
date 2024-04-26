import React from 'react';
import {Grid} from '@mui/material';
import {FormLabel} from 'components/atoms';
import {ErrorMessage, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {generateSlugFromTitle} from 'utils/general';
import {StatusEnum} from 'utils/enum';
import {useDispatch, useSelector} from 'react-redux';
import {useIncomeAndExpenditureSlice} from 'slices/income-expenditure';
import {selectUi} from 'slices/ui/selectors';
import ButtonAtoms from 'components/atoms/form/Button';

const IncomeAndExpenditureCategoryCreatePage = () => {
  const dispatch = useDispatch();
  const {createIncomeAndExpenditureCategory} = useIncomeAndExpenditureSlice();
  const {processing} = useSelector(selectUi);

  return (
    <Formik
      initialValues={{
        title: '',
        slug: '',
        status: StatusEnum.ACTIVE,
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('Bắt buộc'),
        slug: Yup.string().required('Bắt buộc'),
      })}
      onSubmit={values => {
        const payload = {
          name: values.title,
          slug: values.slug,
          status: values.status,
        };
        dispatch(createIncomeAndExpenditureCategory(payload));
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
                <div className="card-header flex-wrap border-0 pt-6 pb-0">
                  <div className="card-title">
                    <h3 className="card-label">Tạo mới danh mục thu chi</h3>
                  </div>
                  <div className="card-toolbar">
                    {/* <Link href="/income-and-expenditure-category/create">
                                                    <a className="btn btn-success font-weight-bolder">
                                                        <span className="svg-icon svg-icon-md">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                    <rect x="0" y="0" width="24" height="24" />
                                                                    <circle fill="#000000" cx="9" cy="15" r="6" />
                                                                    <path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3" />
                                                                </g>
                                                            </svg>
                                                        </span>
                                                        Thêm mới
                                                    </a>
                                                </Link> */}
                  </div>
                </div>
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
                      onChange={(e: any) => {
                        setFieldValue('title', e.target.value);
                        setFieldValue(
                          'slug',
                          generateSlugFromTitle(e.target.value),
                        );
                      }}
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

                  {/* {error.changePassword && error.changePassword === "success" && <Alert severity="success">Cập nhật thành công</Alert>} */}
                  {/* {error.changePassword && error.changePassword !== "success" && <Alert severity="error">{error.changePassword}</Alert>} */}
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
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default IncomeAndExpenditureCategoryCreatePage;
