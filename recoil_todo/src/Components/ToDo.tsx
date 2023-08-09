import { styled } from 'styled-components';
import { IToDo, categoryButtonValues, toDoState } from '../atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FaTrash } from 'react-icons/fa';

const ListItems = styled.li`
    padding: 24px;
    font-size: 24px;
    font-weight: 600;
    background-color: var(--bg-100);
    color: var(--primary-100);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    span {
        margin-bottom: 24px;
    }
`;

const BtnBox = styled.div`
    display: flex;
    align-items: center;
    button {
        margin: 0 4px;
        &:hover {
            color: var(--primary-300);
            background-color: var(--primary-100);
        }
    }
`;

export default function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const changeCategory = (newCategory: IToDo['category']) => {
        setToDos((preToDos) => {
            const targetIndex = preToDos.findIndex((a) => a.id === id);
            const newToDo = { id, text, category: newCategory };
            return [
                ...preToDos.slice(0, targetIndex),
                newToDo,
                ...preToDos.slice(targetIndex + 1),
            ];
        });
    };
    const deleteTodo = () => {
        setToDos((preToDos) => preToDos.filter((a) => a.id !== id));
    };

    const categoryBtnValues = useRecoilValue(categoryButtonValues);

    return (
        <ListItems>
            <span>{text}</span>
            <BtnBox>
                {categoryBtnValues.map(
                    (button) =>
                        category !== button.name && (
                            <button
                                key={button.name}
                                onClick={() =>
                                    changeCategory(
                                        button.name as IToDo['category']
                                    )
                                }
                            >
                                {button.label}
                            </button>
                        )
                )}
                <button onClick={deleteTodo}>
                    <FaTrash />
                </button>
            </BtnBox>
        </ListItems>
    );
}
