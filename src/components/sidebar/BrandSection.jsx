import { ExpandLess, ExpandMore, Highlight } from "@mui/icons-material";
import { Box, Collapse, List, ListItem, Typography } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from "react";
import { colors } from "../../assets/styles/colors";
import { brandItems } from "../../services/routesList";

export const BrandSection = ({ toggleSidebar }) => {
  const location = useLocation();
  const [openItems, setOpenItems] = useState({});

  const handleClick = (title) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ paddingBottom: '120px', width: '100%' }}>
      <Typography sx={{
        color: colors.black, marginBottom: '8px', mt: '10px', fontWeight: 'bold', borderTop: `1px solid ${colors.darkGrayMain}`, paddingTop: '16px', backgroundColor: colors.mainGreen, borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
        width: 'calc(100% - 24px)',
      }}>
        <Highlight sx={{ fontSize: '15px', marginRight: '8px' }} />
        Brand
      </Typography>
      {brandItems.map((item) => (
        <React.Fragment key={item.name}>
          <Box
            onClick={() => handleClick(item.name)}
            sx={{
              borderRadius: '4px',
              padding: '8px 12px',
              cursor: 'pointer',
              width: 'calc(100% - 24px)',
              color: colors.white,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
              {item.icon}
              <Typography sx={{ fontWeight: '700', marginLeft: '8px', fontSize: '14px', color: 'inherit' }}>
                {item.name}
              </Typography>
            </Box>
            {openItems[item.name] ? <ExpandLess sx={{ color: 'inherit' }} /> : <ExpandMore sx={{ color: 'inherit' }} />}
          </Box>
          <Collapse in={openItems[item.name]} timeout="auto" unmountOnExit>
            <List component="div" sx={{ padding: '8px 12px', backgroundColor: colors.greybg, borderRadius: '4px' }}>
              {item.subItems.map((subItem) => {
                const isDisabled = subItem.disabled;
                const isLinkActive = isActive(subItem.link);

                return (
                  <Link
                    onClick={toggleSidebar}
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
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                        {subItem.icon}
                      </Box>
                      <Typography sx={{ fontSize: '14px', color: 'inherit', ml: '8px' }}>
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
    </Box>
  );
};
