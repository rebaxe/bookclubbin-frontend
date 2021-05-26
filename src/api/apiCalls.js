import axios from 'axios'

const myHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const resourceUrl = process.env.REACT_APP_RESOURCE_BASE_URL
const authUrl = process.env.REACT_APP_AUTH_BASE_URL

// Get bookclub info.
export async function getBookclubs(user) {
  const clubs = await axios({
    method: 'get',
    url: `${resourceUrl}/bookclubs/user/${user.id}`,
    headers: myHeaders,
  })
  return clubs.data
}

export async function getBookclub(id) {
  const club = await axios({
    method: 'GET',
    url: `${resourceUrl}/bookclubs/${id}/`,
    withCredentials: true,
  })
  return club
}

// Handle books in shelves.
export async function addBook(clubId, shelfToUpdate, book) {
  await axios({
    method: 'PATCH',
    url: `${resourceUrl}/bookclubs/${clubId}/books/add`,
    data: {
      [shelfToUpdate]: book,
    },
  })
}

export async function removeBook(clubId, shelfToUpdate, book) {
  await axios({
    method: 'PATCH',
    // headers: myHeaders,
    url: `${resourceUrl}/bookclubs/${clubId}/books/remove`,
    data: {
      [shelfToUpdate]: book,
    },
  })
}

// Handle members in bookclub and invites.
export async function removeMember(clubId, memberId) {
  await axios({
    method: 'PATCH',
    // headers: myHeaders,
    url: `${resourceUrl}/bookclubs/${clubId}/members/remove`,
    data: {
      member: memberId,
    },
  })
}

export async function sendInvite(clubId, userId, newMemberId) {
  await axios({
    method: 'PATCH',
    url: `${resourceUrl}/bookclubs/${clubId}/members/invite`,
    data: {
      invite: { invitingUser: userId, invitedUser: newMemberId },
    },
  })
}

export async function acceptInvite(clubId, userId) {
  await axios({
    method: 'PATCH',
    url: `${resourceUrl}/bookclubs/${clubId}/members/invite/accept`,
    data: {
      user: userId,
    },
  })
}

export async function removeInvite(clubId, userId) {
  await axios({
    method: 'PATCH',
    url: `${resourceUrl}/bookclubs/${clubId}/members/invite/remove`,
    data: {
      user: userId,
    },
  })
}

export async function getInvites(userId) {
  const res = await axios({
    method: 'GET',
    url: `${resourceUrl}/bookclubs/user/${userId}/invites`,
  })
  return res
}

// Get user information.
export async function getUserById(id) {
  const response = await axios({
    method: 'GET',
    url: `${authUrl}/users/${id}`,
  })
  return response
  // return response.data
}

export async function getUserByName(string) {
  const response = await axios({
    method: 'GET',
    url: `${authUrl}/users`,
    params: {
      searchString: string,
    },
  })
  return response
}

// Create a new bookclub.
export async function registerClub(clubName, invitationsArray, userId) {
  const res = await axios({
    method: 'post',
    url: `${resourceUrl}/bookclubs/register`,
    data: {
      clubname: clubName,
      invitations: invitationsArray,
      members: userId,
    },
  })
  return res
}

// Delete a bookclub.
export async function deleteClub(clubId) {
  const res = await axios({
    method: 'post',
    url: `${resourceUrl}/bookclubs/${clubId}/delete`,
  })
  return res
}

// Login and logout.
export async function verifyGoogleLogin(googleToken) {
  const res = await axios({
    method: 'post',
    url: `${authUrl}/auth/google`,
    data: {
      token: googleToken,
    },
    withCredentials: true,
  })
  return res
}

export async function googleLogout() {
  const res = await axios({
    method: 'get',
    url: `${authUrl}/auth/google/logout`,
    withCredentials: true,
  })
}

// Search for books.
export async function searchBooks(queryString, searchPreferences) {
  const res = await axios({
    method: 'GET',
    url: 'http://localhost:8081/api/v1/search',
    params: {
      query: `${queryString}+${searchPreferences}:${queryString}`,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return res
}
