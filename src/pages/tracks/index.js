// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const TracksPage = () => {

  return (
    <Grid container spacing={6}>
      Tracks
    </Grid>
  )
}
TracksPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TracksPage
