import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Paper } from "@mui/material"

export default function Announcements() {

  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [announcements, setAnnouncements] = React.useState([]);


  React.useEffect(() => {

    const fetchAnnoucements = async () => {
      const response = await fetch(`${baseUrl}/api/announcements/`, { credentials: 'include', });
      const json = await response.json();

      if (response.ok) {
        setAnnouncements(json);
        announcements.map((item: any) => {
          console.log(item.author);
        })
        // dispatch({
        //   type: 'SET_WORKOUTS',
        //   payload: json
        // })
      }
    }
    fetchAnnoucements();
  }, []);

  return (
    <Paper
      sx={{
        m:2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 240,
      }}
    >
      <h2>Announcements</h2>
      <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
        {announcements && announcements.map((announcement: any) => (
          <React.Fragment key={announcement._id}>
            <ListItem key={announcement._id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={announcement.author} src={announcement.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={announcement.course}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {announcement.author}
                    </Typography>
                    {` — ${announcement.text}`}
                    <br />
                    <Typography
                      sx={{ display: 'block', textAlign: 'end' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {new Date(announcement.updatedAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
