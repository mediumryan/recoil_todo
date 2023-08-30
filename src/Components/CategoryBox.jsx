import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { categories, currentCategory } from '../atom';

const CategoryBtn = styled.button`
    color: var(--text-100);
    background-color: var(--bg-300);
    margin: 24px 12px;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 22px;
    transition: 300ms all;
`;

export default function CategoryBox() {
    const [cat, setCat] = useRecoilState(currentCategory);
    const catArr = useRecoilValue(categories);

    const toggleCategory = (category) => {
        if (cat === category) {
            return;
        }
        setCat(category);
    };

    return (
        <div>
            {catArr.map((category) => {
                return (
                    <CategoryBtn
                        onClick={() => toggleCategory(category)}
                        style={{
                            color: cat === category ? '#ff3d3d' : '#fff',
                        }}
                    >
                        {category}
                    </CategoryBtn>
                );
            })}
        </div>
    );
}
