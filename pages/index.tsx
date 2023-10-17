import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import Layout from "../components/layouts/Layout"
import { EntryList, NewEntry } from "../context/ui"

const HomePage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />
            <NewEntry/>
            <CardContent>
               <EntryList status="pending"/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En progreso" />
            <CardContent>
               <EntryList status="in-progress"/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas" />
            <CardContent>
               <EntryList status="finished"/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
