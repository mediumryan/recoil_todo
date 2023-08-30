import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const listItem = atom({
    key: 'list-item',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const currentCategory = atom({
    key: 'current-category',
    default: 'TO_DO',
    effects_UNSTABLE: [persistAtom],
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
