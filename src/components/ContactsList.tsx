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
import { concatMap, debounceTime, fromEvent, map, Subscription } from 'rxjs'
import { useNavigate } from 'react-router-dom'

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
  let search$: Subscription

  const [contacts, setContacts] = useState<Contact[]>([])
  const [sortOrder, setSortOrder] = useState<Order>('asc')
  const navigate = useNavigate()

  useEffect(() => {
    const getContacts$ = ContactService.getContacts().subscribe(c => {
      sortByName(c)
      getContacts$.unsubscribe()
    })

    search$ = fromEvent(document.querySelector('#search') as HTMLInputElement, 'input')
      .pipe(
        map(e => (e.target as HTMLInputElement).value), // Definitely an InputEvent, let's cast it from Event.
        debounceTime(500),
        concatMap(ContactService.getContacts)
      )
      .subscribe(c => {
        sortByName(c, sortOrder)
      })
  }, [])

  useEffect(() => () => search$.unsubscribe(), [])

  /**
   * Reverses the current sort order and applies it to the provided list of contacts.
   * @param contacts
   * @param order
   */
  const sortByName = (contacts: Contact[], order?: Order) => {
    order = order ?? 'asc'
    setSortOrder(order)
    const c = contacts.sort((a, b) => {
      // Sorts the result in reverse alphabetical first.
      const result = ContactService.getFullName(a.name) > ContactService.getFullName(b.name) ? -1 : 1
      // If we actually need it as alphabetical, then reverse the result.
      return order === 'asc' ? result * -1 : result
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
                      onClick={() => sortByName(contacts, sortOrder === 'asc' ? 'desc' : 'asc')}
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
                onClick={() => navigate(`/contact/${row.login.uuid}`, { state: row })}
              >
                <TableCell scope="row">
                  <CardHeader
                    avatar={
                      <Avatar alt={ContactService.getFullName(row.name)} src={row.picture.thumbnail} />
                    }
                    title={ContactService.getFullName(row.name)}
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
