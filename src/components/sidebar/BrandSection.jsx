import { ExpandLess, ExpandMore, Highlight } from "@mui/icons-material";
import { Box, Collapse, List, ListItem, Typography } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from "react";
import { colors } from "../../assets/styles/colors";
import { brandItems } from "../../services/routesList";

export const BrandSection = ({ toggleSidebar,isPinned }) => {
  const location = useLocation();
  const [openItems, setOpenItems] = useState({ Brand2: true });

  const handleClick = (title) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <List sx={{ pb: '120px', width: '100%', mt: '10px' }}>
      <Box
        onClick={() => handleClick('Brand2')}
        sx={{
          borderRadius: '4px',
          padding: '8px 12px',
          cursor: 'pointer',
          backgroundColor: colors.mainGreen,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Highlight sx={{ color: colors.black, fontSize: '15px' }} />
          <Typography sx={{ fontWeight: '700', marginLeft: '8px', fontSize: '14px', color: colors.black }}>
            Brand
          </Typography>
        </Box>
        {openItems['Brand2'] ? <ExpandLess sx={{ color: colors.black }} /> : <ExpandMore sx={{ color: colors.black }} />}
      </Box>

      <Collapse in={openItems['Brand2']} timeout="auto" unmountOnExit>
        <List component="div" sx={{ paddingX: '16px', backgroundColor: colors.greybg, borderRadius: '4px' }}>
          {brandItems.map((item) => (
            <React.Fragment key={item.name}>
              <Box
                onClick={() => handleClick(item.name)}
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
          ))}
        </List>
      </Collapse>
    </List>
  );
};
