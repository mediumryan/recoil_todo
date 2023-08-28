import { useRecoilState } from 'recoil';
import './CSS/index.css';
import { listItem } from './atom';

function App() {
    const [list, setList] = useRecoilState(listItem);

    return (
        <div>
            {list}
            <button
                onClick={() => {
                    setList([...list, 'hi, bye']);
                }}
            >
                +++
            </button>
        </div>
    );
}

export default App;
