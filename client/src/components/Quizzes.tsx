import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Divider, Typography } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export default function Quizzes() {

  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [quizzes, setQuizzes] = React.useState([]);


  React.useEffect(() => {

    const fetchQuizzes = async () => {
      // const response = await fetch(`${baseUrl}/api/quizzes/`);
      const response = await fetch(`${baseUrl}/api/quizzes/`, { credentials: 'include', });
      const json = await response.json();

      if (response.ok) {
        setQuizzes(json);
        // dispatch({
        //   type: 'SET_WORKOUTS',
        //   payload: json
        // })
      }
    }
    fetchQuizzes();
  }, []);

  return (

    <>
      <h2>Quizzes</h2>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {quizzes && quizzes.map((quiz: any) => (
          <React.Fragment key={quiz._id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DriveFileRenameOutlineIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <h3>{quiz.title + ' - ' + quiz.course}</h3>}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'flex', gap: '1rem' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <strong>Topic:</strong>
                      {quiz.topic}
                    </Typography>
                    <br />
                    <Typography
                      sx={{ display: 'flex', gap: '1rem' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <strong>Due:</strong>
                      {new Date(quiz.dueDate).toLocaleDateString()}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </>
  );
}