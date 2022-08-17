import React from 'react'
import { act, render } from '@testing-library/react'
import App from '../App'
import { unmountComponentAtNode } from 'react-dom'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'
import Mock = jest.Mock
import ContactService from '../services/ContactService'

jest.mock('rxjs/ajax')

const contacts = {
  results: [
    {
      name: {
        title: 'Ms',
        first: 'Amanda',
        last: 'Pulkkinen'
      },
      email: 'amanda.pulkkinen@example.com',
      login: {
        uuid: '2d9d4529-4ae5-4963-b7f6-5daba0ae5686',
        username: 'heavyfrog725',
        password: 'marine1',
        salt: 'AKyWJb0o',
        md5: '6af0dff44c817be1b3e994a8a49110c2',
        sha1: '1cf7f8e47e4e6c13d01d0a9fa583a14a8a7c5dcc',
        sha256: 'd4e829d8007bf4287468cfbe6d27a0ef6afc2444b4a834bc6979aec5dd1e725d'
      },
      phone: '06-611-505',
      cell: '046-555-95-98',
      picture: {
        large: 'https://randomuser.me/api/portraits/women/71.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/71.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/71.jpg'
      }
    },
    {
      name: {
        title: 'Mr',
        first: 'Alp',
        last: 'Claassens'
      },
      email: 'alp.claassens@example.com',
      login: {
        uuid: '4a87a40c-b5e8-4f40-9f9a-3238a9650832',
        username: 'happytiger561',
        password: 'brooklyn',
        salt: 'WmVqmj4W',
        md5: 'da9766eeebfc0ec35d8198268301e994',
        sha1: '9181da7f219128adc1d96e20c6c3c15793851132',
        sha256: '75fb5212b8d4d9ec62ea559892b0617ed0b0276b8b333ac5b2c333bde7132bb9'
      },
      phone: '(0948) 139251',
      cell: '(06) 63457144',
      picture: {
        large: 'https://randomuser.me/api/portraits/men/19.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/19.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/19.jpg'
      }
    }
  ]
}

let container: Element | null = null

beforeEach(() => {
  (ajax.getJSON as Mock).mockImplementation(() => of(contacts))
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container)
    container.remove()
  }
  container = null
})

test('list contacts', () => {
  act(() => {
    if (container) {
      render(<App />, { container })
    }
  })
  // Assert rows
  expect(container?.querySelectorAll('tbody tr').length).toEqual(contacts.results.length)
})

test('sort contacts', () => {
  act(() => {
    if (container) {
      render(<App/>, { container })
    }
  })

  act(() => {
    const sortButton = container?.querySelector('.MuiTableSortLabel-root') as HTMLElement
    sortButton.click()
  })

  const reversedContacts = contacts.results.sort((a, b) => {
    if (ContactService.getFullName(a.name) > ContactService.getFullName(b.name)) {
      return -1
    }
    return 1
  })
  // Assert rows
  let i = 0
  container?.querySelectorAll('tbody tr').forEach(el => {
    const tds = el.querySelectorAll('td')
    const nameTd = tds.item(0).textContent
    const emailTd = tds.item(1).textContent
    const phoneTd = tds.item(2).textContent

    expect(nameTd).toEqual(`${reversedContacts[i].name.first} ${reversedContacts[i].name.last}`)
    expect(emailTd).toEqual(reversedContacts[i].email)
    expect(phoneTd).toEqual(reversedContacts[i].phone)

    i++
  })
})

test('filter contacts', () => {
  act(() => {
    if (container) {
      render(<App/>, { container })
    }
  })

  act(() => {
    const sortButton = container?.querySelector('#search') as HTMLInputElement
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
    nativeInputValueSetter?.call(sortButton, 'am')
    sortButton.dispatchEvent(new Event('input', { bubbles: true }))
  })

  const el = container?.querySelectorAll('tbody tr')
  const tds = el?.item(0).querySelectorAll('td')
  const nameTd = tds?.item(0).textContent
  const emailTd = tds?.item(1).textContent
  const phoneTd = tds?.item(2).textContent

  expect(nameTd).toEqual(`${contacts.results[0].name.first} ${contacts.results[0].name.last}`)
  expect(emailTd).toEqual(contacts.results[0].email)
  expect(phoneTd).toEqual(contacts.results[0].phone)
})
