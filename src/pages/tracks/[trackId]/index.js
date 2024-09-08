import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

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
import { Box, Button } from '@mui/material'
import toast from 'react-hot-toast'

const TrackPage = () => {
  const [track, setTrack] = useState([])
  const auth = useAuth()
  const { user } = auth
  const router = useRouter()
  const { trackId } = router.query

  const getTrack = async () => {
    if (trackId) {
      const response = await axios(`/tracks/${trackId}?populate=track`)
      setTrack(response.data?.data)
    }
  }

  const postCompletion = () => {
    user.id && axios.post(`/completions`, {
      data: {
        users_permissions_user: user.id,
        track: track.id
      }
    }).then(() => {
      toast.success('Dinleti Tamamlanmıştır');
    }).catch(() => {
      toast.error('Dinleti Tamamlanamadı');
    })
  }

  useEffect(() => {
    getTrack()
  }, [trackId])

  return (
    <Box container spacing={16}>
      <Button onClick={postCompletion}>post</Button>
      <Typography variant="h2" gutterBottom>
        {track.attributes && track.attributes.name.toUpperCase()}
      </Typography>
      {track.attributes && <audio style={{ width: '100%' }} onEnded={postCompletion} src={`http://localhost:1337${track.attributes.track.data.attributes.url}`} controls controlsList="nodownload"></audio>}
    </Box>
  )
}

TrackPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TrackPage