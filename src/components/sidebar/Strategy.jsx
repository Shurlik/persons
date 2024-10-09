import { Box, List, ListItem, Typography, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { colors } from "../../assets/styles/colors";
import { StrategyIcon } from "../Icons";
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { strategyItems } from "../../services/routesList";

export const StrategySection = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <List sx={{ padding: 0, width: '100%', mt: '10px' }}>
      <Box
        onClick={handleToggle}
        sx={{
          borderRadius: '4px',
          padding: '8px 12px',
          width: 'calc(100% - 24px)',
          color: colors.black,
          cursor: 'pointer',
          backgroundColor: colors.mainGreen,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
          <StrategyIcon />
          <Typography sx={{ fontWeight: '700', marginLeft: '8px', fontSize: '14px', color: 'inherit' }}>
            Strategy
          </Typography>
        </Box>
        {isOpen ? <ExpandLess sx={{ color: 'inherit' }} /> : <ExpandMore sx={{ color: 'inherit' }} />}
      </Box>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" sx={{ padding: '8px 12px', backgroundColor: colors.greybg, borderRadius: '4px' }}>
          {strategyItems.map((item) => {
            const isActive = location.pathname === item.link;

            return (
              <Link
                onClick={toggleSidebar}
                key={item.name}
                to={item.link}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit',
                  width: '100%',
                }}
              >
                <ListItem
                  sx={{
                    borderRadius: '4px',
                    backgroundColor: isActive ? colors.greyhover : 'transparent',
                    color: isActive ? colors.orange : colors.white,
                    '&:hover': { backgroundColor: colors.greyhover, color: colors.orange },
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                    {item.icon}
                  </Box>
                  <Typography sx={{ fontSize: '14px', color: 'inherit' }}>
                    {item.name}
                  </Typography>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};
