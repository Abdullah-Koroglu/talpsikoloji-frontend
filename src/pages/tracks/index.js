// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useAuth } from 'src/hooks/useAuth'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import axios from 'axios'
import ListItemSelected from 'src/components/tracksList'


const TracksPage = () => {
  const [tracks, setTracks] = useState([])
  const [completions, setCompletions] = useState([])
  const auth = useAuth()
  const { user } = auth

  const getTracks = async () => {
    const response = await axios('/users/me?populate=tracks', {
      headers: {
        Authorization: `Bearer ${user.jwt}`
      }
    })

    response.data && setTracks(response.data.tracks)
  }

  const getCompletions = async () => {
    const response = await axios(`/completions?filters[users_permissions_user][$eq]=${user.id}&populate=track`, {
      headers: {
        Authorization: `Bearer ${user.jwt}`
      }
    })

    response.data && setCompletions(response.data)
  }

  useEffect(() => {
    getTracks()
    getCompletions()
  }, [])

  return (
    <Grid container spacing={6}>
      <Typography variant="h2" gutterBottom>
        {user.childFullName}

        {
          (user && tracks?.length > 0) &&
          <ListItemSelected titleName={user.childFullName} data={tracks} />}
      </Typography>
    </Grid>
  )
}
TracksPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TracksPage
