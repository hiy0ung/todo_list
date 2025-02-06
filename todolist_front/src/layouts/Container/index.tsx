import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { MAIN_PATH } from '../../constants';
import Footer from '../Footer';
import Header from '../Header';
import useThemeStore from '../../stores/theme.store';
import { Box } from '@mui/material';

export default function Container() {
  
  const { pathname } = useLocation();

  const { theme } = useThemeStore();

  return (
    <>
      <Header />
      <hr />
      <Box
        sx={{
          flex: 1,
          minHeight: '80vh',
          backgroundColor: theme === 'light' ? 'white' : 'grey.900',
          color: theme === 'light' ? 'black' : 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 2
        }}
      >
        <Outlet /> 
      </Box>
      <hr />
      { pathname !== MAIN_PATH && <Footer /> }
    </>
  )
}