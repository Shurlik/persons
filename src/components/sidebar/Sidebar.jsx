import React, {  useRef } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import { colors } from '../../assets/styles/colors';
import { SalesSection } from './SalesSection';
import { ContentMarketingSection } from './ContentMarketingSection';
import { BrandSection } from './BrandSection';
import { StrategySection } from './Strategy';
import { FunnelSection } from './Funnel';
import MenuIcon from '@mui/icons-material/Menu';
import { ArrowBack } from '@mui/icons-material';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';

const drawerWidth = 300;
const collapsedWidth = 60;

const Sidebar = ({ isOpen, toggleSidebar, toggleSidebarPin, isPinned }) => {
  const sidebarRef = useRef(null);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Overlay */}
      {isOpen && !isPinned && (
        <Box
          onClick={toggleSidebar}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
      )}

      <Drawer
        variant="permanent"
        open={isOpen}
        sx={{
          width: isOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          transition: 'width 0.3s',
          '& .MuiDrawer-paper': {
            width: isOpen ? drawerWidth : collapsedWidth,
            top: '86px',
            backgroundColor: colors.backgroundMain,
            scrollbarWidth: 'none',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            borderRight: `1px solid ${colors.darkGrey42} !important`,
          },
        }}
        ref={sidebarRef}
      >
        <Box
          sx={{
            backgroundColor: colors.backgroundMain,
            color: colors.white,
            minHeight: '100vh',
            height: '100%',
            padding: isOpen ? '8px 24px 24px 24px' : '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isOpen ? 'flex-start' : 'center',
            justifyContent: 'flex-start',
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Button
              onClick={toggleSidebar}
              sx={{
                backgroundColor: isOpen ? colors.greyhover : 'transparent',
                color: colors.white,
                padding: '8px',
                borderRadius: '8px',
                maxHeight: '40px',
                mt: '8px',
                width: isOpen ? '160px' : '60px',
                mr: isOpen ? '10px' : '0px',
                display: 'flex',
                alignItems: 'center',
                transition: 'background-color 0.3s, border-radius 0.3s, padding 0.3s',
                '&:hover': {
                  backgroundColor: isOpen ? colors.orangeDark : colors.greyhover,
                },
              }}
            >
              {isOpen ? (
                <ArrowBack sx={{ marginLeft: 'auto' }} />
              ) : (
                <MenuIcon />
              )}
            </Button>

            <Button
              onClick={toggleSidebarPin}
              sx={{
                backgroundColor: colors.greyhover,
                color: colors.white,
                padding: '8px',
                borderRadius: '8px',
                display: isOpen ? 'flex' : 'none',
                alignItems: 'center',
                marginTop: '8px',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: colors.orangeDark,
                },
              }}
            >
              {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            </Button>
          </Box>

          {isOpen && (
            <>
              <StrategySection toggleSidebar={toggleSidebar} />
              <FunnelSection toggleSidebar={toggleSidebar} />
              <SalesSection toggleSidebar={toggleSidebar} />
              <ContentMarketingSection toggleSidebar={toggleSidebar} />
              <BrandSection toggleSidebar={toggleSidebar} />
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
