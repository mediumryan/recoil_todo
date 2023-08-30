import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { categories } from '../atom';

const AddToForm = styled.form`
    display: flex;
    align-items: center;
    input {
        padding: 4px 8px;
    }
    button {
        font-size: 18px;
        color: var(--text-100);
        display: flex;
        align-items: center;
    }
`;

export default function AddToCategory() {
    const { register, handleSubmit, setValue } = useForm();
    const [catArr, setCatArr] = useRecoilState(categories);

    const onValid = (data) => {
        setCatArr([...catArr, data.newCategory]);
        setValue('newCategory', '');
    };

    return (
        <AddToForm onSubmit={handleSubmit(onValid)}>
            <input
                placeholder="Add your own Category"
                {...register('newCategory', { required: true })}
            />
            <button>
                <FaPlus />
            </button>
        </AddToForm>
    );
}
