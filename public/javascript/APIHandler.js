class APIHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: 'https://minions-api.herokuapp.com/characters'
    })
  }

  getFullList() {
    return this.axiosApp.get('/')
  }

  getOneRegister(minionId) {
    return this.axiosApp.get(`/${minionId}`)
  }

  createOneRegister(minionInfo) {
    return this.axiosApp.post('/', minionInfo)
  }

  updateOneRegister(minionId, minionInfo) {
    return this.axiosApp.put(`/${minionId}`, minionInfo)
  }

  deleteOneRegister(minionId) {
    return this.axiosApp.delete(`/${minionId}`)
  }
}

