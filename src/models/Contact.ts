export interface Contact {
  name: {
    title: string,
    first: string,
    last: string
  },
  login: {
    uuid: string
  },
  email: string,
  phone: string,
  cell: string,
  picture: {
    large: string,
    medium: string,
    thumbnail: string
  }
}
