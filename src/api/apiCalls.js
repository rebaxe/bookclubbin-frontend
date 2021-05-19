import axios from 'axios'

const myHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export async function getBookclub(user) {
  const updatedClubs = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_GET_CLUB}/${user.id}`,
    headers: myHeaders,
  })
  return updatedClubs.data
}

export async function addBook(clubId, shelfToUpdate, book) {
  await axios({
    method: 'PATCH',
    url: `http://localhost:8081/api/v1/bookclubs/${clubId}/books/add`,
    // headers: myHeaders,
    data: {
      [shelfToUpdate]: book,
    },
  })
}

export async function removeBook(clubId, shelfToUpdate, book) {
  console.log(clubId)
  console.log(shelfToUpdate)
  console.log(book)
  await axios({
    method: 'PATCH',
    // headers: myHeaders,
    url: `http://localhost:8081/api/v1/bookclubs/${clubId}/books/remove`,
    data: {
      [shelfToUpdate]: book,
    },
  })
}
