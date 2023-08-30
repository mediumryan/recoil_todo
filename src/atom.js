import { atom, selector } from 'recoil';

export const listItem = atom({
    key: 'list-item',
    default: [],
});

export const currentCategory = atom({
    key: 'current-category',
    default: 'TO_DO',
});

export const listSelector = selector({
    key: 'list-selector',
    get: ({ get }) => {
        const list = get(listItem);
        const category = get(currentCategory);
        if (category === 'TO_DO') {
            return list.filter((a) => a.state === 'TO_DO');
        }
        if (category === 'DOING') {
            return list.filter((a) => a.state === 'DOING');
        }
        if (category === 'DONE') {
            return list.filter((a) => a.state === 'DONE');
        }
    },
});
