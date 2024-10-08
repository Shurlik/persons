import { Box, List, ListItem, Typography, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore, TrendingUp } from '@mui/icons-material';
import { colors } from "../../assets/styles/colors";
import { CampaignIcon, Presentation, Sales } from "../Icons";
import { Phone } from "@mui/icons-material";
import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

export const SalesSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const salesItems = [
    { name: 'Campaigns', link: '/', icon: <CampaignIcon />, disabled: false },
    { name: 'Sales Letter', link: '/', icon: <Sales />, disabled: false },
    { name: 'Sales Presentations', link: '/', icon: <Presentation />, disabled: true },
    { name: 'Discovery Calls', link: '/', icon: <Phone style={{ fontSize: '15px' }} />, disabled: false },
  ];

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <List sx={{ padding: 0, width: '100%' }}>
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
          marginTop: '16px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
          <TrendingUp style={{ fontSize: '16px' }} />
          <Typography sx={{ fontWeight: '700', marginLeft: '8px', fontSize: '14px', color: 'inherit' }}>
            Sales
          </Typography>
        </Box>
        {isOpen ? <ExpandLess sx={{ color: 'inherit' }} /> : <ExpandMore sx={{ color: 'inherit' }} />}
      </Box>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" sx={{ paddingX: '16px', backgroundColor: colors.greybg, borderRadius: '4px' }}>
          {salesItems.map((item) => {
            const isLinkActive = isActive(item.link);
            const isDisabled = item.disabled;

            return (
              <Link
                key={item.name}
                to={item.link}
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
