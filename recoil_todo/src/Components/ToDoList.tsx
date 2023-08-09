import { styled } from 'styled-components';
import CreateToDo from './CreateToDo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryButtonValues, categoryState, toDoSelector } from '../atoms';
import ToDo from './ToDo';
import { useForm } from 'react-hook-form';

const ToDoContainer = styled.div`
    width: 95%;
    h1 {
        margin: 24px 0;
        font-size: 64px;
        font-weight: 700;
        font-style: italic;
        text-align: center;
        color: var(--primary-100);
    }
`;

const SelectAndForm = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

const SelectBox = styled.select`
    border: 1px solid var(--primary-100);
    color: var(--primary-100);
    font-size: 24px;
    border-radius: 8px;
    padding: 8px 12px;
`;

const CategoryForm = styled.form`
    margin-left: 12px;
    button {
        margin-left: 4px;
    }
`;

const ListBox = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: minmax(120px, auto);
    grid-gap: 12px;
    padding: 36px 48px;
    border-radius: 20px;
    background-color: var(--primary-200);
    min-height: 280px;
    max-height: 540px;
    overflow: scroll;
`;

export default function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const selectCategory = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    const { register, handleSubmit, watch, setValue } = useForm();

    console.log(watch());
    console.log(toDos);

    // about category selector
    const [categoryBtnValues, setCategoryBtnValues] =
        useRecoilState(categoryButtonValues);

    const addCategory = (data: { new_category: string }) => {
        setCategoryBtnValues((pre) => [
            ...pre,
            { name: data.new_category, label: data.new_category },
        ]);
        setValue('new_category', '');
    };

    return (
        <ToDoContainer>
            <h1>투두</h1>
            <CreateToDo />
            <SelectAndForm>
                <SelectBox value={category} onInput={selectCategory}>
                    {categoryBtnValues.map((item) => {
                        return <option key={item.label}>{item.name}</option>;
                    })}
                </SelectBox>
                <CategoryForm onSubmit={handleSubmit(addCategory as any)}>
                    <input
                        {...register('new_category')}
                        placeholder="Add custom tag"
                    />
                    <button>Add</button>
                </CategoryForm>
            </SelectAndForm>
            <ListBox>
                {toDos?.map((item) => {
                    return <ToDo {...item} key={item.id} />;
                })}
            </ListBox>
        </ToDoContainer>
    );
}
