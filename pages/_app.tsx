/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { configureAppStore } from 'store/configureStore';
import { Provider, useDispatch, useSelector } from 'react-redux';
import color from 'utils/color'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from 'layouts/default'
import Head from 'next/head';
import LoginPage from 'pages/login'

import { selectAuth } from 'slices/auth/selectors';
import { useAuthSlice } from 'slices/auth';
import { Favicon } from 'assets/images';
const store = configureAppStore();

const theme = createTheme({
  palette: {
    common: {
      black: color.dark
    },
    primary: {
      main: color.primary,
      light: color.primaryLight,
      contrastText: color.primaryGradient

    },
    secondary: {
      main: color.secondary,
      light: color.secondaryLight,
      contrastText: color.secondaryGradient
    },
    grey: {
      100: color.grey100,
      200: color.grey200
    }
  }
});


const AppMiddleware = ({ Component, pageProps, router }: any) => {
  const dispatch = useDispatch();
  const isLoginPage = router.pathname === '/login';
  const { checkAuth } = useAuthSlice()
  
  useEffect(() => {
    dispatch(checkAuth(isLoginPage));
  }, []);


  return (
      <ThemeProvider theme={theme}>
        <Head>
          {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" /> */}
          <link rel="icon" type="image/x-icon" href={Favicon.src} />
        </Head>
        {
          isLoginPage && <LoginPage /> || 
          (<Layout>
            <Component {...pageProps} />
          </Layout>)
        }
      </ThemeProvider>
  )
}

const AppRoot = ({ Component, pageProps, router }: AppProps) => {
  return (
    <Provider store={store}>
      <AppMiddleware Component={Component} pageProps={pageProps} router={router} />
    </Provider>
  )
}


export default AppRoot