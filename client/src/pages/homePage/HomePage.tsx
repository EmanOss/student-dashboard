import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Announcements from '../../components/Announcements';
import Quizzes from '../../components/Quizzes';
import { StudentDashboard } from '../../components/StudentDashboard';
import { Campaign, Dashboard, DriveFileRenameOutline, Logout } from '@mui/icons-material';
import requireAuth from '../../HOCs/requireAuth';
import { useTheme } from '@mui/material';
import { withTranslation } from 'react-i18next';
import { TranslationProps } from '../../types/TranslationProps';


const drawerWidth = 240;


function HomePage({ t, i18n }: TranslationProps) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Logging out');
    const response = await fetch(`/api/auth/logout/`, {
      method: 'POST',
      credentials: 'include'
    });
    const json = await response.json();

    console.log(json);
    if (response.ok) {
      navigate('/login');
    }

  }

  const sideBarLinks = [
    {
      text: t('Dashboard'),
      icon: <Dashboard />,
      path: 'dashboard'
    },
    {
      text: t('Announcements'),
      icon: <Campaign />,
      path: 'announcements'
    }
    , {
      text: t('Quizzes'),
      icon: <DriveFileRenameOutline />,
      path: 'quizzes'
    }];

  const drawer = (
    <div>
      <Toolbar sx={{ bgcolor: primaryColor }} />
      <Divider />
      <List sx={{ bgcolor: primaryColor }} >
        {sideBarLinks.map((linkItem) => (
          <ListItem key={linkItem.text} disablePadding sx={{ '&:hover': { bgcolor: 'white', color: primaryColor }, bgcolor: primaryColor, color: 'white' }}>
            <ListItemButton onClick={() => navigate(linkItem.path)} >
              <ListItemIcon sx={{ color: 'inherit' }} >
                {linkItem.icon}
              </ListItemIcon>
              <ListItemText primary={linkItem.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ bgcolor: primaryColor }} >
        <ListItem key='logout' disablePadding sx={{ '&:hover': { bgcolor: 'white', color: primaryColor }, bgcolor: primaryColor, color: 'white' }}>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: 'inherit' }} >
              <Logout />
            </ListItemIcon>
            <ListItemText primary={t("Log out")} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {t('Welcome back!')}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path="" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="announcements" element={<Announcements />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default withTranslation()(requireAuth(HomePage));