// React Imports
import { useState } from 'react'

// MUI Imports
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import toast from 'react-hot-toast'

const ListItemSelected = ({ data, titleName, todaysTrack }) => {
  // States
  // const [selectedIndex, setSelectedIndex] = useState(1)

  const handleListItemClick = (trackId, orderId, completed) => {
    if (completed) {
      if (orderId === todaysTrack.id) {
        toast.success('Bugünün dinletisini tamamladınız.')

        return
      }
      toast.error('Dinleti tamamlanmıştır. Günün dinletisini dinleyebilirsiniz.')

      return
    } else if (orderId !== todaysTrack.id) {
      toast.error('Günün dinletisini dinlemeden diğer dinletilere geçemezsiniz.')

      return
    }
    window.location.href = `/tracks/${trackId}?orderId=${orderId}`
  }

  return (
    <List>
      {
        data.map((item, index) => {
          return (
            <ListItem
              key={index}
              disablePadding
              disabled={item.id !== todaysTrack.id}
              selected={item.completed}
              secondaryAction={
                <IconButton edge='end' onClick={e => e.stopPropagation()}>
                  <i className='ri-message-2-line text-xl' />
                </IconButton>
              }
            >
              <ListItemButton onClick={() => handleListItemClick(item.track.id, item.id, item.completed)}>
                {/* <ListItemAvatar>
                  <Avatar src={item.avatar} alt={item.name} />
                </ListItemAvatar> */}
                <ListItemText

                  // primary={item.name} 
                  primary={`${titleName} ${index + 1}. Dinletisi ${item.id === todaysTrack.id ? '🎯' : ''}`}
                />
              </ListItemButton>
            </ListItem>
          )
        })
      }
    </List>
  )
}

export default ListItemSelected