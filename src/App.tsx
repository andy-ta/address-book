import React from 'react'
import './App.css'
import { alpha, AppBar, Box, InputBase, styled, Toolbar, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContactDetail from './components/ContactDetail'
import ContactsList from './components/ContactsList'
import { Contacts } from '@mui/icons-material'

// Using MUI search template.
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '33%'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
}))

function App () {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Contacts sx={{ 'margin-right': '10px' }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'none', sm: 'block' },
              'text-decoration': 'inherit',
              color: 'inherit'
            }}
          >
            Address Book
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContactsList />} />
          <Route path="contact/:id" element={<ContactDetail />} />
          <Route path="*" element={<ContactsList />} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
