import { ajax } from 'rxjs/internal/ajax/ajax'
import { map, Observable } from 'rxjs'
import { Contact } from '../models/Contact'

type ContactsResource = { results: Contact[] };

export default class ContactService {
  static readonly randomApiUrl = 'https://randomuser.me/api'

  static getContacts (term?: string): Observable<Contact[]> {
    return ajax.getJSON<ContactsResource>(`${ContactService.randomApiUrl}/?seed=nuvalence&results=30&inc=name,email,phone,cell,picture,login`)
      .pipe(
        map(response => response.results),
        map(contacts => {
          if (term) {
            return contacts.filter(c =>
              c.name.first.toLowerCase().includes(term) || c.name.last.toLowerCase().includes(term))
          }
          return contacts
        })
      )
  }

  static getFullName (name: Contact['name']): string {
    return `${name.first} ${name.last}`
  }
}
