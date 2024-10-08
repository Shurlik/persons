import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Sidebar from '../components/sidebar/Sidebar';
import { colors } from '../assets/styles/colors';

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

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
            width: isSidebarOpen ? '300px' : '60px',
            minWidth: isSidebarOpen ? '300px': '60px',
            transition: 'width 0.3s',
            overflowY: 'auto',
            height: 'calc(100vh - 86px)',
          }}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </Box>

        {/* Main content area */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            backgroundColor: colors.backgroundMain,
            paddingLeft: isSidebarOpen ? '24px' : '8px',
            transition: 'padding-left 0.3s',
            paddingBottom: '120px',
            width:'100%'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
