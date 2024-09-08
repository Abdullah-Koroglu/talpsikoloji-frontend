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

const ListItemSelected = ({ data, titleName }) => {
  // States
  // const [selectedIndex, setSelectedIndex] = useState(1)

  const handleListItemClick = index => {
    window.location.href = `/tracks/${index}`
  }

  return (
    <List>
      {
        data.map((item, index) => {
          return (
            <ListItem
              key={index}
              disablePadding
              secondaryAction={
                <IconButton edge='end' onClick={e => e.stopPropagation()}>
                  <i className='ri-message-2-line text-xl' />
                </IconButton>
              }
            >
              <ListItemButton onClick={() => handleListItemClick(item.id)}>
                {/* <ListItemAvatar>
                  <Avatar src={item.avatar} alt={item.name} />
                </ListItemAvatar> */}
                <ListItemText

                  // primary={item.name} 
                  primary={`${titleName} ${index + 1}. Dinletisi`}

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