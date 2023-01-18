import { atom } from 'recoil';
import { ViewType } from '../@types';

export const currentAdminViewState = atom({
    key: 'currentAdminView',
    default: 'list' as ViewType,
});
