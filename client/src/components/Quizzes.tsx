import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Paper, Typography } from '@mui/material';
import { Quiz } from '../types/Quiz';
import { withTranslation } from 'react-i18next';
import { TranslationProps } from '../types/TranslationProps';


function Quizzes({ t }: TranslationProps) {

  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);

  React.useEffect(() => {
    const getCourseName = async (courseId: string) => {
      const response = await fetch(`${baseUrl}/api/courses/${courseId}`, { credentials: 'include', });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        return json.title;
      }
    }

    const fetchQuizzes = async () => {
      const response = await fetch(`${baseUrl}/api/quizzes/`, { credentials: 'include', });
      const json = await response.json();

      if (response.ok) {
        const updatedAnnouncements = json.map(async (item: Quiz) => {
          item.course = await getCourseName(item.course);
          return item;
        });

        Promise.all(updatedAnnouncements)
          .then(updatedItems => {
            setQuizzes(updatedItems);
          })
          .catch(error => {
            console.error('Error updating course names:', error);
          });
      }
    }
    fetchQuizzes();
  }, []);

  return (

    <Paper
      sx={{
        m: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 240,
      }}
    >
      <h2>{t('Quizzes')}</h2>
      <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
        {quizzes && quizzes.map((quiz: any) => (
          <React.Fragment key={quiz._id}>
            <ListItem >
              <ListItemText
                primary={
                  <Typography variant="h5" component="div">
                    {quiz.title + ' - ' + quiz.course}
                  </Typography>}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'flex', gap: '1rem' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <strong>{t('Topic')}:</strong>
                      {quiz.topic}
                    </Typography>
                    <br />
                    <Typography
                      sx={{ display: 'flex', gap: '1rem' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <strong>{t('Due')}:</strong>
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
    </Paper>
  );
}

export default withTranslation()(Quizzes);