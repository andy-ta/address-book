import React, { useEffect, useState } from 'react'
import {
  Avatar,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material'
import ContactService from '../services/ContactService'
import { Contact } from '../models/Contact'

type Order = 'asc' | 'desc'

interface Column {
  id: 'name' | 'email' | 'phone';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email', align: 'right' },
  { id: 'phone', label: 'Phone', align: 'right' }
]

export default function ContactsList () {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [sortOrder, setSortOrder] = useState<Order>('desc')

  useEffect(() => {
    ContactService.getContacts().subscribe(c => {
      sortByName(c)
    })
  }, [])

  const getName = (name: Contact['name']) => `${name.first} ${name.last}`

  /**
   * Reverses the current sort order and applies it to the provided list of contacts.
   * @param contacts
   */
  const sortByName = (contacts: Contact[]) => {
    const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(nextOrder)
    const c = contacts.sort((a, b) => {
      const result = getName(a.name) > getName(b.name) ? -1 : 1
      return nextOrder === 'asc' ? result * -1 : result
    })
    setContacts(c)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '93vh' }}>
        <Table stickyHeader aria-label="contact list">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.id === 'name'
                    ? <TableSortLabel
                      active
                      direction={sortOrder}
                      onClick={() => sortByName(contacts)}
                    >
                      {column.label}
                    </TableSortLabel>
                    : column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((row) => (
              <TableRow
                hover
                key={row.login.uuid}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { cursor: 'pointer' }
                }}
              >
                <TableCell component="th" scope="row">
                  <CardHeader
                    avatar={
                      <Avatar alt={getName(row.name)} src={row.picture.thumbnail} />
                    }
                    title={getName(row.name)}
                    sx={{
                      padding: 0
                    }}
                  />
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
