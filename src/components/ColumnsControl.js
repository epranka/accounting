import React, { useCallback, memo } from "react";
import styled from "styled-components";
import useMenu from "../hooks/useMenu";
import { useVisibleColumns } from "./Table";
import * as actions from "./Table/actions";

const S = {};

const Checkbox = memo(({ title, name, visible, locked, onChange }) => {
    const handleChange = useCallback(
        (e) => {
            e.preventDefault();
            if (locked && visible) return;
            onChange(name, !visible);
        },
        [name, locked, visible, onChange]
    );

    return (
        <S.Checkbox>
            <S.CheckboxLabel locked={locked && visible} onClick={handleChange}>
                <S.CheckboxInput
                    name={name}
                    value={name}
                    type="checkbox"
                    checked={visible}
                    readOnly
                />{" "}
                {title}
            </S.CheckboxLabel>
        </S.Checkbox>
    );
});

const ColumnsControl = ({ columns }) => {
    const [menuIsShow, menuRef, showMenu, closeMenu] = useMenu();
    const [visibleColumns, dispatch] = useVisibleColumns();

    const handleMenuToggle = useCallback(
        (e) => {
            e.preventDefault();
            if (menuIsShow) return closeMenu();
            else return showMenu();
        },
        [closeMenu, showMenu, menuIsShow]
    );

    const changeVisibility = useCallback(
        (name, visible) => {
            actions.changeColumnVisibility(dispatch, name, visible);
        },
        [dispatch]
    );

    const locked =
        Object.values(visibleColumns).filter((visible) => visible).length < 2;

    return (
        <S.ColumnsControl>
            <S.ColumnsControlButton onClick={handleMenuToggle}>
                <i className="fas fa-th-large"></i>
            </S.ColumnsControlButton>
            {menuIsShow ? (
                <S.ColumnsControlBox ref={menuRef}>
                    {columns.map((column, key) => {
                        return (
                            <Checkbox
                                key={key}
                                visible={visibleColumns[column.name]}
                                title={column.title}
                                name={column.name}
                                locked={locked}
                                onChange={changeVisibility}
                            />
                        );
                    })}
                </S.ColumnsControlBox>
            ) : null}
        </S.ColumnsControl>
    );
};

S.Checkbox = styled.div``;

S.CheckboxLabel = styled.label`
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 5px;

    ${(props) =>
        props.locked
            ? `
        color: #bfbfbf;
        font-style: italic;
    `
            : null}
`;

S.CheckboxInput = styled.input`
    margin-right: 8px;
    cursor: pointer;
    pointer-events: none;
`;

S.ColumnsControl = styled.div``;

S.ColumnsControlButton = styled.div`
    color: #969696;
    cursor: pointer;

    transition: color 0.15s ease;

    &:hover {
        color: #7d7d7d;
    }
`;

S.ColumnsControlBox = styled.div`
    position: absolute;
    background: white;
    border-radius: 5px;
    border: 1px solid #cecece;
    overflow: hidden;
    box-shadow: 0 0 4px 0px #d2d2d2;
    padding: 15px;
    z-index: 999;
    min-width: 150px;
`;

export default memo(ColumnsControl);
