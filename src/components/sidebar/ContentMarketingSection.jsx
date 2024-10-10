import { Box, List, ListItem, Typography, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { colors } from "../../assets/styles/colors";
import { ArticlesIcon } from "../Icons";
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { contentItems } from "../../services/routesList";

export const ContentMarketingSection = ({ toggleSidebar, isPinned }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

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
          <ArticlesIcon style={{ fontSize: '20px' }} />
          <Typography sx={{ fontWeight: '700', marginLeft: '8px', fontSize: '14px', color: 'inherit' }}>
            Content Marketing
          </Typography>
        </Box>
        {isOpen ? <ExpandLess sx={{ color: 'inherit' }} /> : <ExpandMore sx={{ color: 'inherit' }} />}
      </Box>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" sx={{ paddingX: '16px', backgroundColor: colors.greybg, borderRadius: '4px' }}>
          {contentItems.map((item) => {
            const isDisabled = item.disabled;
            const isLinkActive = isActive(item.link);

            return (
              <Link
                onClick={!isPinned && toggleSidebar}
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
                      color: isDisabled ? colors.grey : colors.white,
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
