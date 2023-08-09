import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { categoryState, toDoState } from '../atoms';

interface IForm {
    toDo: string;
}

export const StyledForm = styled.form`
    margin-bottom: 24px;
    text-align: center;
    input {
        margin-right: 8px;
    }
    button {
        &:hover {
            color: var(--primary-300);
            background-color: var(--primary-100);
        }
    }
`;

export default function CreateToDo() {
    const category = useRecoilValue(categoryState);
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        setToDos((preToDos) => [
            ...preToDos,
            { id: Date.now(), text: toDo, category },
        ]);
        setValue('toDo', '');
    };

    return (
        <>
            <StyledForm onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register('toDo', {
                        required: 'Please Add To Do.',
                    })}
                    placeholder="Add to anything"
                />
                <button>Submit</button>
            </StyledForm>
        </>
    );
}
