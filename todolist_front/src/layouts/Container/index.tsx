import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { MAIN_PATH } from '../../constants';
import Header from '../Header';
import { Box } from '@mui/material';

export default function Container() {
  
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <Box
        sx={{
          flex: 1,
          minHeight: '80vh',
          backgroundColor:"#f9f3ee",
          color:'black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 2
        }}
      >
        <Outlet /> 
      </Box>
    </>
  )
}