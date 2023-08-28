import { styled } from 'styled-components';
import './CSS/index.css';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { listItem } from './atom';

const MainWrapper = styled.div`
    height: 100vh;
    background: linear-gradient(var(--bg-100), var(--bg-300));
    color: var(--text-100);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 128px;
`;

const Header = styled.h1`
    font-size: 48px;
    color: var(--accent-100);
    font-style: italic;
    cursor: default;
    margin-bottom: 48px;
`;

const FormBox = styled.form`
    display: flex;
    align-items: center;
    padding: 24px;
    margin-bottom: 24px;
`;

const Input = styled.input`
    padding: 12px 24px 12px 8px;
    font-size: 20px;
`;

const Submit = styled.button`
    padding: 12px 24px;
    font-size: 20px;
    background-color: var(--bg-100);
    color: var(--accent-100);
    border: 2px solid var(--accent-100);
`;

const ListWrapper = styled.div`
    width: 50%;
    background-color: var(--bg-300);
    height: 50%;
    padding: 24px 48px;
    border-radius: 20px;
`;

const ListItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--bg-200);
    padding: 12px 24px;
    margin-bottom: 12px;
    border-radius: 10px;
    opacity: ${(props) => (props.opacity === true ? 0.5 : 1)};
    transition: 300ms all;
    button {
        color: var(--text-100);
    }
`;

function App() {
    // 아톰 데이터 받아오기
    const [list, setList] = useRecoilState(listItem);

    // 인풋 핸들러
    const { register, handleSubmit, setValue } = useForm();
    const submitValue = (data) => {
        setList([...list, { id: Date.now(), value: data.todo, isDone: false }]);
        setValue('todo', '');
    };

    // 리스트 삭제
    const deleteList = (listId) => {
        const newList = list.filter((item) => item.id !== listId);
        setList(newList);
    };

    // 상태 체크
    const toggleIsDone = (listId) => {
        const newList = list.map((item) => {
            if (item.id === listId) {
                return {
                    ...item,
                    isDone: !item.isDone,
                };
            }
            return item;
        });
        setList(newList);
    };

    return (
        <MainWrapper>
            <Header>Ryan ToDo</Header>
            <FormBox onSubmit={handleSubmit(submitValue)}>
                <Input {...register('todo')} placeholder="Enter a task" />
                <Submit type="submit">Submit</Submit>
            </FormBox>
            <ListWrapper>
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <ListItems key={item.id} opacity={item.isDone}>
                            <h3>{item.value}</h3>
                            <div>
                                <button
                                    onClick={() => {
                                        toggleIsDone(item.id);
                                    }}
                                >
                                    {item.isDone === true ? '했음' : '안했음'}
                                </button>
                                <button
                                    onClick={() => {
                                        deleteList(item.id);
                                    }}
                                >
                                    지우기
                                </button>
                            </div>
                        </ListItems>
                    ))
                ) : (
                    <ListItems>No tasks yet.</ListItems>
                )}
            </ListWrapper>
        </MainWrapper>
    );
}

export default App;
