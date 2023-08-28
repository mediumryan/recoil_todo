import { atom } from 'recoil';

export const listItem = atom({
    key: 'list-item', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});
