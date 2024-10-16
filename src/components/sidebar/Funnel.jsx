import { Link, useLocation } from 'react-router-dom';
import { Box, Collapse, List, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { colors } from "../../assets/styles/colors";
import { ExpandLess, ExpandMore, ZoomOutMap } from '@mui/icons-material';
import { funnelItems } from '../../services/routesList';

export const FunnelSection = ({ toggleSidebar, isPinned }) => {
  const [openItems, setOpenItems] = useState({ Funnel: true });
  const location = useLocation();

  const handleToggle = (itemName) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [itemName]: !prevOpenItems[itemName],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <List sx={{ padding: 0, width: '100%', mt: '10px' }}>
      <Box
        onClick={() => handleToggle('Funnel')}
        sx={{
          borderRadius: '4px',
          padding: '8px 12px',
          width: 'calc(100% - 24px)',
          cursor: 'pointer',
          backgroundColor: colors.mainGreen,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ZoomOutMap sx={{fontSize:'15px', color:colors.black}}/>
          <Typography sx={{ fontWeight: '700', marginLeft: '8px', fontSize: '14px', color: colors.black }}>
            Funnel
          </Typography>
        </Box>
        {openItems['Funnel'] ? <ExpandLess sx={{ color: colors.black }} /> : <ExpandMore sx={{ color: colors.black }} />}
      </Box>

      <Collapse in={openItems['Funnel']} timeout="auto" unmountOnExit>
        <List component="div" sx={{ paddingX: '16px', backgroundColor: colors.greybg, borderRadius: '4px' }}>
          {funnelItems.map((item, index) =>
            item.subItems ? (
              <React.Fragment key={item.name}>
                <Box
                  onClick={() => handleToggle(item.name)}
                  sx={{
                    borderRadius: '4px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', color: colors.white }}>
                    {item.icon}
                    <Typography sx={{ fontWeight: '700', marginLeft: '8px', fontSize: '14px', color: colors.white }}>
                      {item.name}
                    </Typography>
                  </Box>
                  {openItems[item.name] ? <ExpandLess sx={{ color: colors.white }} /> : <ExpandMore sx={{ color: colors.white }} />}
                </Box>
                <Collapse in={openItems[item.name]} timeout="auto" unmountOnExit>
                  <List component="div" sx={{ paddingLeft: '16px', backgroundColor: colors.greybg, borderRadius: '4px' }}>
                    {item.subItems.map((subItem) => {
                      const isDisabled = subItem.disabled;
                      const isLinkActive = isActive(subItem.link);

                      return (
                        <Link
                          onClick={!isPinned && toggleSidebar}
                          key={subItem.name}
                          to={subItem.link}
                          style={{
                            textDecoration: 'none',
                            pointerEvents: isDisabled ? 'none' : 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'inherit',
                            width: '100%',
                          }}
                        >
                          <ListItem
                            sx={{
                              borderRadius: '4px',
                              backgroundColor: isLinkActive ? colors.greyhover : 'transparent',
                              color: isLinkActive ? colors.orange : isDisabled ? colors.grey : 'inherit',
                              '&:hover': {
                                backgroundColor: isDisabled ? 'transparent' : colors.greyhover,
                                color: isDisabled ? colors.grey : colors.orange,
                              },
                              opacity: isDisabled ? 0.5 : 1,
                              padding: '8px 24px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Box component="span" sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                              {subItem.icon}
                            </Box>
                            <Typography sx={{ fontSize: '12px', color: 'inherit' }}>
                              {subItem.name}
                            </Typography>
                          </ListItem>
                        </Link>
                      );
                    })}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <Link
                onClick={toggleSidebar}
                key={`${index}-${item.name}`}
                to={item.link}
                style={{
                  textDecoration: 'none',
                  pointerEvents: item.disabled ? 'none' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit',
                  width: '100%',
                }}
              >
                <ListItem
                  sx={{
                    borderRadius: '4px',
                    backgroundColor: isActive(item.link) ? colors.greyhover : 'transparent',
                    color: isActive(item.link) ? colors.orange : item.disabled ? colors.grey : 'inherit',
                    '&:hover': {
                      backgroundColor: item.disabled ? 'transparent' : colors.greyhover,
                      color: item.disabled ? colors.grey : colors.orange,
                    },
                    opacity: item.disabled ? 0.5 : 1,
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  {item.icon}
                  <Typography sx={{ color: 'inherit', fontSize: '14px', ml: '8px' }}>{item.name}</Typography>
                </ListItem>
              </Link>
            )
          )}
        </List>
      </Collapse>
    </List>
  );
};
