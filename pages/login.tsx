/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {Box} from '@mui/material';
import {Logo} from 'assets/images';
import {FormLabel, Image} from 'components/atoms';
import AlertErrorOrSucess from 'components/atoms/alerts/alertErrorOrSucess';
import AlertError from 'components/atoms/alerts/error';
import TextFieldAtom from 'components/atoms/form/TextField';
import {Form, Formik} from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthSlice } from 'slices/auth';
import { selectAuth } from 'slices/auth/selectors';
import * as Yup from 'yup';

const LoginPage = () => {
  const router = useRouter();

  const dispatch = useDispatch()
  const { login } = useAuthSlice()
  const { loading, error } = useSelector(selectAuth)
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push('/dashboard'); // Chuyển hướng đến trang dashboard nếu đã đăng nhập
  //   }
  // }, [isAuthenticated, router]);
  
  return (
      <div className="d-flex flex-column flex-root">
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login">
          <div
            className="login-aside d-flex flex-column flex-row-auto"
            style={{backgroundColor: '#F2C98A'}}>
            <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
              <Link href="/">
                <a className="brand-logo">
                  <Box
                    sx={{width: '250px'}}
                    style={{marginLeft: 'auto', marginRight: 'auto'}}>
                    <Image src={Logo} alt="Logo" ratio="16-9" />
                  </Box>
                </a>
              </Link>
              <h3
                className="font-weight-bolder text-center font-size-h4 font-size-h1-lg"
                style={{color: '#986923'}}>
                Cat368 Login
              </h3>
            </div>
            <div
              className="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
              style={{minHeight: '550px'}}></div>
          </div>
          <div className="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
            <div className="d-flex flex-column-fluid flex-center">
              <div className="login-form login-signin">
                <Formik
                  initialValues={{
                    username: '',
                    password: '',
                  }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().required(
                      'Bạn phải nhập username',
                    ),
                    password: Yup.string().required('Bạn phải nhập mật khẩu')
                  })}
                  onSubmit={(values) => {               
                    const payload = {
                      user_name: values.username,
                      password: values.password,
                    }
                    dispatch(login(payload))
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
                     
                        <div className="pb-13 pt-lg-0 pt-5">
                          <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                            Welcome to Cat368 Login
                          </h3>
                        </div>
                        <div className="form-group">
                          <FormLabel
                            className={`font-size-h6 font-weight-bolder text-dark`}
                            label="Username"
                            required
                          />
                          <input
                            className={`form-control form-control-solid h-auto py-7 px-6 rounded-lg  ${Boolean(touched.username) ? errors.username ? 'is-invalid' : 'is-valid' : ''}`}
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                            {Boolean(touched.username && errors.username) && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="form-group">
                          <div className="d-flex justify-content-between mt-n5">
                            <FormLabel
                              className="font-size-h6 font-weight-bolder text-dark pt-5"
                              label="Password"
                              required
                            />
                          </div>
                          <input
                            className={`form-control form-control-solid h-auto py-7 px-6 rounded-lg  ${Boolean(touched.password) ? errors.password ? 'is-invalid' : 'is-valid' : ''}`}
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {Boolean(touched.password && errors.password) && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <AlertErrorOrSucess message={error.login}/>
                        <div className="pb-lg-0 pb-5">
                          <button
                            type="submit"
                           
                            className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">
                            Sign In
                          </button>
                        </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default LoginPage;
