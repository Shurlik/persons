import React, { useState } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import { colors } from '../../assets/styles/colors';
import { SalesSection } from './SalesSection';
import { ContentMarketingSection } from './ContentMarketingSection';
import { BrandSection } from './BrandSection';
import { StrategySection } from './Strategy';
import { FunnelSection } from './Funnel';
import MenuIcon from '@mui/icons-material/Menu';
import { ArrowBack } from '@mui/icons-material';

const drawerWidth = 300;
const collapsedWidth = 60;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openItems, setOpenItems] = useState({});
  const [activeItem, setActiveItem] = useState('');

  const handleClick = (title) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  const handleActiveItem = (itemName) => {
    setActiveItem(itemName);
  };

  return (
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
        <Button
          onClick={toggleSidebar}
          sx={{
            backgroundColor: isOpen ? colors.greyhover : 'transparent',
            color: colors.white,
            padding: '8px',
            borderRadius: '8px',
            width: '100%',
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


        {isOpen && (
          <>
            <StrategySection activeItem={activeItem} setActiveItem={handleActiveItem} />
            <FunnelSection openItems={openItems} handleClick={handleClick} activeItem={activeItem} setActiveItem={handleActiveItem} />
            <SalesSection activeItem={activeItem} setActiveItem={handleActiveItem} />
            <ContentMarketingSection activeItem={activeItem} setActiveItem={handleActiveItem} />
            <BrandSection openItems={openItems} handleClick={handleClick} activeItem={activeItem} setActiveItem={handleActiveItem} />
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
