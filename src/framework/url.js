import {
  API_HOST
} from 'src/settings/constants';

export function getUrl(_url = '') {
  const url = `${API_HOST}/${_url}`;
  return url;
}
