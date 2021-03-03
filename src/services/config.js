import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://5f6ce87d60cf97001641a6c4.mockapi.io/api/v1',
})
