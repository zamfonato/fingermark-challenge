import { atom } from 'recoil';

const nameState = atom({
  key: 'name',
  default: 'Pedro',
});

export default nameState;