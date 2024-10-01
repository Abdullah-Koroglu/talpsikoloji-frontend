import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Tooltip,
  Select,
  MenuItem,
} from '@mui/material';
import Icon from 'src/@core/components/icon'


const DraggableList = React.memo(({ items, onDragEnd, allTracks, setItems }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <List style={{ width: '100%' }} ref={provided.innerRef} {...provided.droppableProps}>
            {items?.map((item, index) => (
              <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                {(provided, snapshot) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={snapshot.isDragging ? { background: item.completed ? "#cecece" : 'rgb(235,235,235)' } : ''}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <Icon icon='mdi:headset' fontSize={20} />
                      </Avatar>
                    </ListItemAvatar>
                    {item.id > 0 ? <ListItemText secondary={item.id} primary={item.track?.name} />
                      :
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"

                        value={item.track?.id}
                        label="Dinleti"
                        onChange={(e) => {

                          setItems(prev => {
                            const newItems = [...prev.tracks]
                            const itemIndex = newItems.findIndex(i => i.id === item.id)
                            const newItem = allTracks.find(t => t.id === e.target.value).attributes
                            newItems[itemIndex] = {
                              id: item.id,
                              completed: false,
                              track: { ...newItem, id: e.target.value }
                            }

                            return { ...prev, tracks: newItems }
                          })
                        }}
                      >
                        {
                          allTracks.map(track => (
                            <MenuItem key={track.id} value={track.id}>{track.attributes.name}</MenuItem>
                          ))
                        }
                      </Select>
                    }

                    <Tooltip title="Delete">
                      <Icon
                        icon='mdi:delete'
                        fontSize={20}
                        onClick={() => {
                          setItems(prev => {
                            const newItems = prev.tracks.filter(i => i.id !== item.id);

                            return { ...prev, tracks: newItems };
                          });
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;
