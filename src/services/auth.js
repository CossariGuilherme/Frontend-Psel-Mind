export const isAuthenticated = () => localStorage.getItem('jwt') !== null
export const getToken = () => localStorage.getItem('jwt')
export const getId = () => localStorage.getItem('id')
export const login = (token,id, acesso) => {
  localStorage.setItem('jwt', token)
  localStorage.setItem('id', id)
  localStorage.setItem('acesso',acesso)
}

export const logout = () => {
  localStorage.removeItem('jwt')
}

export const acesso = () => localStorage.getItem('acesso')
