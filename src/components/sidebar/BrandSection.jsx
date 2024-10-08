import { AdsClick, AutoGraph, AutoMode, ExpandLess, ExpandMore, PersonOutlined, SubjectOutlined } from "@mui/icons-material";
import { BrandIcon, StepsIcon } from "../Icons";
import { Box, Collapse, List, ListItem, Typography } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import React from "react";
import { colors } from "../../assets/styles/colors";

export const BrandSection = ({ openItems, handleClick }) => {
  const location = useLocation();

  const brandItems = [
    {
      name: 'Persona',
      icon: <PersonOutlined style={{ fontSize: '16px' }} />,
      subItems: [
        { name: 'Step by Step', link: '/', icon: <AutoMode style={{ fontSize: '15px' }} />, disabled: false },
        { name: '1 Click Generation', link: '/', icon: <AdsClick style={{ fontSize: '15px' }} />, disabled: true },
        { name: 'Analyzer', link: '/', icon: <StepsIcon />, disabled: false },
      ],
    },
    {
      name: 'Brand',
      icon: <BrandIcon />,
      subItems: [
        { name: 'Guidelines', link: '/', icon: <SubjectOutlined style={{ fontSize: '15px' }} />, disabled: false },
        { name: 'Analyzer', link: '/', icon: <AutoGraph style={{ fontSize: '15px' }} />, disabled: true },
      ],
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ paddingBottom: '120px', width: '100%' }}>
      <Typography sx={{ color: colors.white, marginBottom: '8px', mt: '10px', fontWeight: 'bold', borderTop: `1px solid ${colors.darkGrayMain}`, paddingTop: '16px' }}>
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
              color: colors.black,
              backgroundColor: colors.mainGreen,
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
