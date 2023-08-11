import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
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
import AddInsertNewVideoDialog from './InsertNewVideoDialog';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AddIcon from '@mui/icons-material/Add';
import StoreIcon from '@mui/icons-material/Store';
import { Card, Grid } from '@mui/material';
import VideoPlayerMain from './VideoPlayer';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showAddCameraBox, setShowAddCameraBox] = React.useState(false);
  const [items, setItems] = React.useState('default');

  const urls = ["https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd"
                ,"https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd"
                ,"https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd"];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddCameraClick = () => {
    setShowAddCameraBox(true);
  };

  const handleGetNewUrl = (newUrl) => {
    urls.push(newUrl);
    setItems('newUrl');
  };

  // const createItems = React.useMemo(() => new Array(1).fill(null).map((_, index) => {
  //   const id = String(index + 1);
  //   return {
  //     label: `Some label`,
  //     children: (
  //       <div>
  //         Child {id}, value: {value}
  //       </div>
  //     ),
  //     key: id,
  //   };
  // }), [items]);
  
  // React.useMemo(()=>{
  //   return urls.map((url, index) => {
  //     <Grid item xs={12} sm={12} md={6}>
  //         <Card minHeight={800}> 
  //             <VideoPlayerMain url={url} videoId={index}/>
  //         </Card>
  //     </Grid>
  //   })
  //   ,[items]});

  const drawer = (
    <Box>
      <Box
        component="img"
        sx={{
          width: '100%'
        }}
        alt="React JS Image"
        src="https://maktabkhooneh.org/mag/wp-content/uploads/2019/07/react-js-image.png"
      />

      <List>
        <ListItem 
          key='Add Camera' 
          disablePadding
          onClick={handleAddCameraClick}
        >
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary='Add Camera' />
          </ListItemButton>
        </ListItem>

        <ListItem 
          key='Contact us' 
          disablePadding >
          <ListItemButton>
            <ListItemIcon>
              <PhoneInTalkIcon />
            </ListItemIcon>
            <ListItemText primary='Contact us' />
          </ListItemButton>
        </ListItem>

        <ListItem 
          key='Abaut us' 
          disablePadding >
          <ListItemButton>
            <ListItemIcon>
              <StoreIcon /> 
            </ListItemIcon>
            <ListItemText primary='Abaut us' />
          </ListItemButton>
        </ListItem>

      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
            sx={{ mr: 2 , display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            React Camera's Project
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
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
        <Typography paragraph>
          Camera's list 
        </Typography>

        <Box>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {urls.map((url, index) => (
                    <Grid item xs={12} sm={12} md={6}>
                        <Card minHeight={800}> 
                            <VideoPlayerMain url={url} videoId={index}/>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {/* {createItems} */}
        </Box>

      </Box>
      <AddInsertNewVideoDialog 
        showAddCameraBox={showAddCameraBox} 
        setShowAddCameraBox={setShowAddCameraBox}
        handleCallback = {handleGetNewUrl}/>
    </Box>
  );
}