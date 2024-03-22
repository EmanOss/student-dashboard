import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MultipleSelectChip from '../../components/MultipleSelectChip';
import { withTranslation } from 'react-i18next';
import { TranslationProps } from '../../types/TranslationProps';

function RegisterPage({ t, i18n}: TranslationProps) {
  // const { dispatch } = UseAuthContext();
  const [error, setError] = React.useState('');
  const [courseList, setCourseList] = React.useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      
    });
    console.log('courseList:', courseList);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          courses: courseList,
          email: data.get('email'), 
          password: data.get('password') }),
        credentials: 'include',
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        const errorMessage = await response.json();
        console.log('Register failed:', errorMessage);

        setError(errorMessage.error);
      }
    } catch (error) {
      console.error('Register failed:', error);
      setError('Register failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('Sign up')}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={t("First Name")}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t("Last Name")}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={t("Email Address")}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={t("Password")}
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <MultipleSelectChip courseList={courseList} setCourseList={setCourseList} />
            </Grid>
          </Grid>
          <Typography color='error' fontSize={14} >{error}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('Sign Up')}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                {t('Already have an account? Sign in')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default withTranslation()(RegisterPage);