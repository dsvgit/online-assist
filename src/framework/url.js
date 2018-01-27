import {
  API_HOST,
  WS_HOST
} from 'src/settings/constants';

export function getUrl(_url = '') {
  const url = `${API_HOST}/${_url}`;
  return url;
}

export function getWsUrl(_url = '') {
  const url = `${WS_HOST}/${_url}`;
  return url;
}
