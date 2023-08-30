import React from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { currentCategory } from '../atom';

const CategoryBtn = styled.button`
    color: var(--text-100);
    background-color: var(--bg-300);
    margin: 24px;
    padding: 24px;
    font-size: 24px;
`;

export default function CategoryBox() {
    const [cat, setCat] = useRecoilState(currentCategory);

    const toggleCategory = (val) => {
        if (cat === val) {
            return;
        }
        setCat(val);
    };

    return (
        <div>
            <CategoryBtn
                onClick={() => toggleCategory('TO_DO')}
                style={{
                    color: cat === 'TO_DO' ? '#ff3d3d' : '#fff',
                }}
            >
                To Do
            </CategoryBtn>
            <CategoryBtn
                onClick={() => toggleCategory('DOING')}
                style={{ color: cat === 'DOING' ? '#ff3d3d' : '#fff' }}
            >
                Doing
            </CategoryBtn>
            <CategoryBtn
                onClick={() => toggleCategory('DONE')}
                style={{ color: cat === 'DONE' ? '#ff3d3d' : '#fff' }}
            >
                Done
            </CategoryBtn>
        </div>
    );
}
