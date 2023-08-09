import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IToDo {
    id: number;
    text: string;
    category: string;
}

interface CategoryButtonType {
    name: string;
    label: string;
}

export const toDoState = atom<IToDo[]>({
    key: 'toDo',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<string>({
    key: 'category',
    default: 'TO_DO',
    effects_UNSTABLE: [persistAtom],
});

export const categoryButtonValues = atom<CategoryButtonType[]>({
    key: 'category_button_values',
    default: [
        { name: 'DOING', label: 'Doing' },
        { name: 'TO_DO', label: 'To Do' },
        { name: 'DONE', label: 'Done' },
    ],
    effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
    key: 'toDoSelector',
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((a) => a.category === category);
    },
});
