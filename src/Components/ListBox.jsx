import React from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { listItem } from '../atom';

const List = styled.ul``;

const ListItems = styled.li``;

const ListStateButtons = styled.button`
    color: tomato;
`;

export default function ListBox() {
    const [list, setList] = useRecoilState(listItem);

    const toggleItemState = (itemState, itemId, itemText) => {
        const itemIndex = list.findIndex((a) => a.id === itemId);
        const newItem = { id: itemId, text: itemText, state: itemState };
        setList([
            ...list.slice(0, itemIndex),
            newItem,
            ...list.slice(itemIndex + 1),
        ]);
    };

    console.log(list);

    return (
        <List>
            {list.map((item) => {
                return (
                    <ListItems key={item.id}>
                        <span>{item.text}</span>
                        {item.state !== 'TO_DO' && (
                            <ListStateButtons
                                onClick={() => {
                                    toggleItemState(
                                        'TO_DO',
                                        item.id,
                                        item.text
                                    );
                                }}
                            >
                                TODO
                            </ListStateButtons>
                        )}
                        {item.state !== 'DOING' && (
                            <ListStateButtons
                                onClick={() => {
                                    toggleItemState(
                                        'DOING',
                                        item.id,
                                        item.text
                                    );
                                }}
                            >
                                DOING
                            </ListStateButtons>
                        )}
                        {item.state !== 'DONE' && (
                            <ListStateButtons
                                onClick={() => {
                                    toggleItemState('DONE', item.id, item.text);
                                }}
                            >
                                DONE
                            </ListStateButtons>
                        )}
                    </ListItems>
                );
            })}
        </List>
    );
}

// 바꿔야할 아이템의 인덱스 번호를 찾고,
// 아이템[인덱스].상태 === 클릭한 버튼의 값  으로 변경,
// 기존 스테이트의 불변성을 유지한채로 스테이트값 교체.
