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
import { Box } from '@mui/material'


const TracksPage = () => {
  const [tracks, setTracks] = useState([])
  const [completions, setCompletions] = useState([])
  const auth = useAuth()
  const { user } = auth

  const getTracks = async () => {
    const response = await axios('/users/me?populate[tracks][populate]=track', {
      headers: {
        Authorization: `Bearer ${user.jwt}`
      }
    })

    response.data && setTracks(response.data.tracks)
  }

  const findTodaysTrack = () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()

    const todayDate = new Date(year, month, day)
    const startDate = new Date(user.startedListeningAt)

    const dayDifference = Math.floor((todayDate - startDate) / (1000 * 60 * 60 * 24)) + 1;


    return dayDifference < 0 ? null : tracks[dayDifference]
  }

  useEffect(() => {
    getTracks()
  }, [])

  return (
    <Box container spacing={6}>
      <Typography variant="h2" gutterBottom>
        {user.childFullName}

        {
          (user && tracks?.length > 0) &&
          <ListItemSelected titleName={user.childFullName} data={tracks} todaysTrack={findTodaysTrack()} />}
      </Typography>
    </Box>
  )
}
TracksPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TracksPage
