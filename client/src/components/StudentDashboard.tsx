import { Copyright } from "@mui/icons-material"
import { Grid, Paper } from "@mui/material"
import { Container } from "@mui/system"
import Announcements from "./Announcements"
import Quizzes from "./Quizzes"
import backgroundImage from '../assets/images/study-bg.jpg';


export const StudentDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        {/* Top Image */}
        <Grid item xs={12}>
          <Paper sx={{
            p: 2, display: 'flex', flexDirection: 'column', height: 240,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${backgroundImage})`
          }}>

          </Paper>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
            <Announcements />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
            <Quizzes />
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  )
}