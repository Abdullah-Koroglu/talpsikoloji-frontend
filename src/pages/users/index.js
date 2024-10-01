// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'

const UsersPage = () => {
  const [data, setData] = useState([])

  const getUsers = async () => {
    const response = await axios('/users')
    response.data && setData(response.data)
  }


  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Box container spacing={6}>
      <Typography variant="h2" gutterBottom>
        Kullanıcılar
      </Typography>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Çocuğun Adı</TableCell>
              <TableCell align="left">Ebeveyn Adı</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.location.href = `/users/${item.id}`
                }}
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.childFullName}
                </TableCell>
                <TableCell align="left">{item.parentFullName}</TableCell>
                <TableCell align="right">{item.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}


export default UsersPage
