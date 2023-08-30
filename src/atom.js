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

export const categories = atom({
    key: 'categories',
    default: ['TO_DO', 'DOING', 'DONE'],
    effects_UNSTABLE: [persistAtom],
});

export const listSelector = selector({
    key: 'list-selector',
    get: ({ get }) => {
        const list = get(listItem);
        const category = get(currentCategory);

        return list.filter((a) => a.state === category);
    },
});
