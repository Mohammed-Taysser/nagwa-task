import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

function getWords() {
  return api.get<Word[]>('/word');
}

function getRank(score: number) {
  return api.post<{ rank: number }>('/rank', {
    score,
  });
}

export { getRank, getWords };
