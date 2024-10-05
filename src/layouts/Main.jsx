import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import { colors } from '../assets/styles/colors';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Header (Navigation) */}
      <Box
        sx={{
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.grey4}`,
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 100,
          height: '86px',
        }}
      >
        <Navigation />
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, height: '100%', pt: '86px' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: '300px',
            backgroundColor: colors.sidebarBackground,
            overflowY: 'auto',
            height: 'calc(100vh - 86px)',
          }}
        >
          <Sidebar />
        </Box>

        {/* Main content area */}
        <Box sx={{flexGrow: 1, overflow: 'auto', backgroundColor: colors.backgroundMain,paddingBottom:'120px'}}><Outlet/></Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
