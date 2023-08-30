import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { categories, listItem, listSelector } from '../atom';
import { FaTrash } from 'react-icons/fa';
import AddToCategory from './AddToCategory';

const List = styled.ul`
    margin-top: 32px;
    padding: 24px;
    border-radius: 10px;
    width: 50%;
    max-height: 50%;
    overflow-y: scroll;
    background-color: var(--bg-300);
`;

const ListItems = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--bg-200);
    margin-bottom: 12px;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 20px;
`;

const ListStateButtons = styled.button`
    color: var(--accent-100);
    transition: 300ms all;
    &:hover {
        color: var(--accent-200);
    }
`;

export default function ListBox() {
    const [list, setList] = useRecoilState(listItem);
    const catList = useRecoilValue(listSelector);

    const catArr = useRecoilValue(categories);

    // 리스트 아이템 상태 토글링
    const toggleItemState = (itemState, itemId, itemText) => {
        const itemIndex = list.findIndex((a) => a.id === itemId);
        const newItem = { id: itemId, text: itemText, state: itemState };
        setList([
            ...list.slice(0, itemIndex),
            newItem,
            ...list.slice(itemIndex + 1),
        ]);
    };

    // 리스트 아이템 삭제
    const deleteItem = (itemId) => {
        const newList = list.filter((a) => a.id !== itemId);
        setList(newList);
    };

    return (
        <List>
            {catList.length < 1
                ? `There's  no Task`
                : catList.map((item) => {
                      return (
                          <ListItems key={item.id}>
                              <span>{item.text}</span>
                              <AddToCategory />
                              <div>
                                  {catArr.map((cat) => {
                                      return (
                                          item.state !== cat && (
                                              <ListStateButtons
                                                  onClick={() => {
                                                      toggleItemState(
                                                          cat,
                                                          item.id,
                                                          item.text
                                                      );
                                                  }}
                                              >
                                                  {cat}
                                              </ListStateButtons>
                                          )
                                      );
                                  })}
                                  <ListStateButtons
                                      onClick={() => {
                                          deleteItem(item.id);
                                      }}
                                  >
                                      <FaTrash />
                                  </ListStateButtons>
                              </div>
                          </ListItems>
                      );
                  })}
        </List>
    );
}

// -- 아이템 상태 변경을 위한 단계 --
// 바꿔야할 아이템의 인덱스 번호를 찾고,
// 아이템[인덱스].상태 === 클릭한 버튼의 값  으로 변경,
// 기존 스테이트의 불변성을 유지한채로 스테이트값 교체.
