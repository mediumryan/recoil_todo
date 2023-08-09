import { styled } from 'styled-components';
import './CSS/index.css';
import ToDoList from './Components/ToDoList';

const MainContainer = styled.main`
    background-color: var(--bg-200);
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function App() {
    return (
        <MainContainer>
            <ToDoList />
        </MainContainer>
    );
}

export default App;
