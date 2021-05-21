import axios from 'axios'

const myHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export async function getBookclubs(user) {
  const clubs = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_GET_CLUB}/${user.id}`,
    headers: myHeaders,
  })
  return clubs.data
}

export async function getBookclub(id) {
  const club = await axios({
    method: 'GET',
    url: `http://localhost:8081/api/v1/bookclubs/${id}/`,
  })
  return club.data
}

export async function addBook(clubId, shelfToUpdate, book) {
  await axios({
    method: 'PATCH',
    url: `http://localhost:8081/api/v1/bookclubs/${clubId}/books/add`,
    data: {
      [shelfToUpdate]: book,
    },
  })
}

export async function removeBook(clubId, shelfToUpdate, book) {
  await axios({
    method: 'PATCH',
    // headers: myHeaders,
    url: `http://localhost:8081/api/v1/bookclubs/${clubId}/books/remove`,
    data: {
      [shelfToUpdate]: book,
    },
  })
}

export async function removeMember(clubId, memberId) {
  await axios({
    method: 'PATCH',
    // headers: myHeaders,
    url: `http://localhost:8081/api/v1/bookclubs/${clubId}/members/remove`,
    data: {
      member: memberId,
    },
  })
}
export async function getUserById(id) {
  const response = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_GET_USER}/${id}`,
  })
  return response.data
}

export async function getUserByName(string) {
  const response = await axios({
    method: 'GET',
    url: process.env.REACT_APP_SEARCH_USERS,
    params: {
      searchString: string,
    },
  })
  return response.data
}

export async function sendInvite(clubId, userId, newMemberId) {
  await axios({
    method: 'PATCH',
    url: `http://localhost:8081/api/v1/bookclubs/${clubId}/members/invite`,
    data: {
      invite: { invitingUser: userId, invitedUser: newMemberId },
    },
  })
}

export async function acceptInvite(clubId, userId) {
  await axios({
    method: 'PATCH',
    url: `http://localhost:8081/api/v1/bookclubs/${clubId}/members/invite/accept`,
    data: {
      user: userId,
    },
  })
}

export async function removeInvite(clubId, userId) {
  await axios({
    method: 'PATCH',
    url: `http://localhost:8081/api/v1/bookclubs/${clubId}/members/invite/remove`,
    data: {
      user: userId,
    },
  })
}

export async function getInvites(userId) {
  const res = await axios({
    method: 'GET',
    url: `http://localhost:8081/api/v1/bookclubs/user/${userId}/invites`,
  })
  return res
}
