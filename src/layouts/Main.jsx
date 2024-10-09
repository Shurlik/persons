import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Sidebar from '../components/sidebar/Sidebar';
import { colors } from '../assets/styles/colors';
import useSidebar from '../hooks/sidebar';

const MainLayout = () => {
  const {
    isSidebarOpen,
    isSidebarPinned,
    toggleSidebar,
    toggleSidebarPin,
  } = useSidebar(); 

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
            width: isSidebarOpen ? (isSidebarPinned ? '300px' : '60px') : '0px',
            minWidth: isSidebarOpen ? (isSidebarPinned ? '300px' : '60px') : '0px',
            transition: 'width 0.9s',
            overflowY: 'auto',
            height: 'calc(100vh - 86px)',
            position: isSidebarPinned ? 'relative' : 'absolute',
            zIndex: isSidebarPinned ? '1' : '10',
          }}
        >
          <Sidebar 
            isOpen={isSidebarOpen} 
            toggleSidebar={toggleSidebar} 
            toggleSidebarPin={toggleSidebarPin} 
            isPinned={isSidebarPinned} 
          />
        </Box>

        {/* Main content area */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            backgroundColor: colors.backgroundMain,
            paddingLeft: isSidebarOpen ? (isSidebarPinned ? '24px' : '60px') : '60px',
            transition: 'padding-left 0.3s',
            paddingBottom: '120px',
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
