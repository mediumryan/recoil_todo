import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { categories, currentCategory } from '../atom';
import { FaTrash } from 'react-icons/fa';

const CategoryBtn = styled.button`
    color: var(--text-100);
    background-color: var(--bg-300);
    margin: 24px 12px;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 22px;
    transition: 300ms all;
`;

const CategoryDelete = styled.button`
    color: var(--text-100);
    font-size: 18px;
    transition: 300ms all;
    &:hover {
        transform: scale(1.15);
    }
`;

export default function CategoryBox() {
    const [cat, setCat] = useRecoilState(currentCategory);
    const [catArr, setCatArr] = useRecoilState(categories);

    const toggleCategory = (category) => {
        if (cat === category) {
            return;
        }
        setCat(category);
    };

    const deleteCategory = (category) => {
        const newCat = catArr.filter((a) => a !== category);
        setCatArr(newCat);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {catArr.map((category) => {
                return (
                    <div>
                        <CategoryBtn
                            onClick={() => toggleCategory(category)}
                            style={{
                                color: cat === category ? '#ff3d3d' : '#fff',
                            }}
                        >
                            {category}
                        </CategoryBtn>
                        <CategoryDelete
                            onClick={() => {
                                deleteCategory(category);
                            }}
                            style={{
                                color: cat === category ? '#ff3d3d' : '#fff',
                            }}
                        >
                            <FaTrash />
                        </CategoryDelete>
                    </div>
                );
            })}
        </div>
    );
}
