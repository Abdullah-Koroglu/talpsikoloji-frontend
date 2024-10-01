// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box, Button, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import DraggableList from 'src/components/draggableList'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker, StaticDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'



const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};



const UsersPage = () => {
  const searchParams = useSearchParams()

  const userId = searchParams.get('id')

  const [data, setData] = useState({})
  const [tracks, setTracks] = useState([])
  const [lists, setLists] = useState([])
  const [base, setBase] = useState({})
  const [willAdd, setWillAdd] = useState(null)
  const [startedListeningAt, setStartedListeningAt] = useState(null)

  const onDragEnd = ({ destination, source }) => {
    // If dropped outside the list, do nothing
    if (!destination) return;

    // Reorder the items
    const newItems = reorder(data.tracks, source.index, destination.index);

    // Update the state with new items order
    setData({ ...data, tracks: newItems });
  };

  const getUser = async () => {
    const response = await axios(`/users/${userId}?populate[tracks][populate]=track`)
    response.data && setData(response.data)
  }

  const updateUser = async () => {
    const pushBody = {
      tracks: data.tracks.map(t => {
        return {
          id: t.id > 0 ? t.id : undefined,
          track: t.track.id,
          completed: t.completed
        }
      })
    }
    data.startedListeningAt !== startedListeningAt?.format('YYYY-MM-DD') && (pushBody.startedListeningAt = startedListeningAt?.format('YYYY-MM-DD'))
    const response = await axios.put(`/users/${userId}`, pushBody)

    response.data && setData(response.data)
    getUser()
  }

  const getTracks = async () => {
    const response = await axios(`/tracks`)
    response.data && setTracks(response.data.data)
  }

  const getLists = async () => {
    const response = await axios(`/lists?populate[Tracks][populate]=track`)
    response.data && setLists(response.data.data)
  }

  const getBase = async () => {
    const response = await axios(`/base-list?populate[Tracks][populate]=track`)
    response.data && setBase(response.data.data.attributes)
  }

  console.log({ startedListeningAt: startedListeningAt?.format('YYYY-MM-DD'), s: data.startedListeningAt });

  useEffect(() => {
    userId && getUser()
    userId && getTracks()
    userId && getBase()
    userId && getLists()
  }, [userId])


  return (
    <Box container spacing={6}>
      <Typography variant="h2" gutterBottom>
        {data ? data.childFullName : "Kullanıcı"} Dinletileri
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {data.tracks && <>
          <DraggableList allTracks={tracks} setItems={setData} items={data.tracks} onDragEnd={onDragEnd} />
          <Box>
            <Button
              onClick={() => {
                setData({
                  ...data,
                  tracks: [
                    ...data.tracks,
                    {
                      id: Math.floor(Math.random() * -9000) - 1000,
                      completed: false,
                      track: {

                      }
                    }
                  ]
                })
              }}
            >
              Yeni Dinleti Ekle
            </Button>
            <Button
              onClick={() => {
                setData({
                  ...data,
                  tracks: [
                    ...data.tracks,
                    ...base.Tracks.map(t => {
                      return {
                        id: Math.floor(Math.random() * -9000) - 1000,
                        completed: false,
                        track: { ...t.track.data.attributes, id: t.track.data.id }
                      }
                    })
                  ]
                })
              }
              }
            >
              Baz Sıralamayı Ekle
            </Button>
            <Button
              onClick={updateUser}
            >
              Kaydet
            </Button>
          </Box>
          <Box>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={willAdd} onChange={(e) => setWillAdd(e.target.value)} label="Dinleti Listesi">
              {
                lists.map(list => (
                  <MenuItem key={list.id} value={list.id}>{list.attributes.Title}</MenuItem>
                ))
              }
            </Select>
            <Button
              onClick={() => {
                const list = lists.find(l => l.id === willAdd)
                console.log({
                  list: list.attributes.Tracks.map(t => {
                    return {
                      id: Math.floor(Math.random() * -9000) - 1000,
                      completed: false,
                      track: { ...t.track.data.attributes, id: t.track.data.id }
                    }
                  })
                });

                setData({
                  ...data,
                  tracks: [
                    ...data.tracks,
                    ...list.attributes.Tracks.map(t => {
                      return {
                        id: Math.floor(Math.random() * -9000) - 1000,
                        completed: false,
                        track: { ...t.track.data.attributes, id: t.track.data.id }
                      }
                    })
                  ]
                })
              }}
            > Listeyi Ekle</Button>
          </Box>
        </>}

      </Box>
      {data.childFullName && <MobileDatePicker defaultValue={dayjs(data.startedListeningAt)} value={startedListeningAt} onChange={newValue => setStartedListeningAt(newValue)} />}
    </Box>
  )
}


export default UsersPage
