import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { listItem } from '../atom';

const Input = styled.input`
    font-size: 20px;
    padding: 12px 16px;
`;

const SubmitBtn = styled.button`
    color: var(--text-100);
    font-size: 20px;
    padding: 12px 16px;
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

    console.log(list);

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <Input {...register('toDo', { required: true })} />
            <SubmitBtn>Add</SubmitBtn>
        </form>
    );
}
