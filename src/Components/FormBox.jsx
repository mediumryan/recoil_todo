import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { listItem } from '../atom';

const Input = styled.input`
    font-size: 20px;
    padding: 12px 16px 12px 8px;
    border-radius: 4px;
`;

const SubmitBtn = styled.button`
    color: var(--text-100);
    font-size: 20px;
    padding: 12px 16px;
    margin-left: 4px;
    border: 1px solid var(--text-100);
    border-radius: 4px;
    transition: 300ms all;
    &:hover {
        color: var(--primary-300);
        border-color: var(--primary-300);
    }
`;

export default function FormBox() {
    const { register, handleSubmit, setValue } = useForm();
    const [list, setList] = useRecoilState(listItem);

    const createToDo = (data) => {
        const newList = { id: Date.now(), text: data.toDo, state: 'TO_DO' };
        setList([...list, newList]);
    };

    const onValid = (data) => {
        createToDo(data);
        setValue('toDo', '');
    };

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <Input
                {...register('toDo', { required: true })}
                placeholder="Add your Tasks"
            />
            <SubmitBtn>Add</SubmitBtn>
        </form>
    );
}
