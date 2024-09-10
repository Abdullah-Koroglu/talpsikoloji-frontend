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
  const [trackIndex, setTrackIndex] = useState(0)

  const auth = useAuth()
  const router = useRouter()

  const { trackId, orderId } = router.query
  const { user } = auth


  const getTrack = async () => {
    if (orderId) {
      const meResponse = await axios('/users/me?populate[tracks][populate]=track')
      const myTracks = meResponse.data.tracks

      const trackIndex = myTracks.findIndex(track => track.id === parseInt(orderId))
      const thisTrack = myTracks[trackIndex]
      setTrackIndex(trackIndex)

      if (thisTrack.track.id === parseInt(trackId)) {
        if (thisTrack.completed === false) {
          const response = await axios(`/tracks/${trackId}?populate=track`)
          setTrack(response.data?.data)
        } else {
          window.location.href = '/tracks'
        }
      } else {
        window.location.href = '/tracks'
      }
    } else {
      window.location.href = '/tracks'
    }
  }

  const postCompletion = () => {
    user.id && axios.post(`/complete-track`, {
      id: orderId,
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
      <Button onClick={() => router.push('/tracks')}>Geri</Button>
      {/* <Button onClick={postCompletion}>post</Button> */}
      <Typography variant="h2" gutterBottom>
        {`${user.childFullName} ${trackIndex + 1}. Dinletisi`}
      </Typography>
      {track.attributes && <audio style={{ width: '100%' }} onEnded={postCompletion} src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${track.attributes.track.data.attributes.url}`} controls controlsList="nodownload"></audio>}
    </Box>
  )
}

TrackPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TrackPage