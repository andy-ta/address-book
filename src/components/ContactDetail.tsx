import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Contact } from '../models/Contact'
import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material'
import ContactService from '../services/ContactService'
import { ArrowBack, Email, Phone, PhoneAndroid } from '@mui/icons-material'

export default function ContactDetail () {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [contact] = useState<Contact>(state as Contact)

  return (
    <div>
      <IconButton onClick={() => navigate('/')}>
        <ArrowBack></ArrowBack>
      </IconButton>
      <Container sx={{
        maxWidth: 750
      }}>
        <Container sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Avatar
            alt={ContactService.getFullName(contact.name)}
            src={contact.picture.large}
            sx={{ width: 162, height: 162, marginRight: 5 }}
          />
          <Box>
            <Typography variant="subtitle1">{contact.name.title}.</Typography>
            <Typography variant="h5">{ContactService.getFullName(contact.name)}</Typography>
          </Box>
        </Container>
        <Container sx={{
          marginTop: 3,
          border: '1px solid rgb(218,220,224)',
          borderRadius: '8px',
          padding: '16px'
        }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Typography variant="h6">Contact Details</Typography>
            </Grid>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={2}>
              <Box className="iconAlign">
                <PhoneAndroid></PhoneAndroid>
                Cell
              </Box>
            </Grid>
            <Grid item xs={10}>
              {contact.cell}
            </Grid>
            <Grid item xs={2}>
              <Box className="iconAlign">
                <Phone></Phone>
                Phone
              </Box>
            </Grid>
            <Grid item xs={10}>
              {contact.phone}
            </Grid>
            <Grid item xs={2}>
              <Box className="iconAlign">
                <Email></Email>
                Email
              </Box>
            </Grid>
            <Grid item xs={10}>
              {contact.email}
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  )
}
