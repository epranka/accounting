import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const S = styled.div``;

const Editable = ({ type, name, decimals, children, value, onChange }) => {
    const inputRef = useRef();
    const [editing, setEditing] = useState(false);
    const [editableValue, setEditableValue] = useState(
        value || (type === "text" ? "" : "0")
    );

    const commitChange = useCallback(() => {
        setEditing(false);
        let sanitizedValue =
            type === "text"
                ? editableValue.trim()
                : parseFloat(editableValue) || 0;
        setEditableValue(sanitizedValue);
        onChange(name, sanitizedValue);
    }, [type, name, setEditing, onChange, editableValue]);

    const cancelChange = useCallback(() => {
        setEditing(false);
        setEditableValue(value);
    }, [value]);

    const handleChange = useCallback((e) => {
        setEditableValue(e.target.value);
    }, []);

    const handleBlur = useCallback(
        (e) => {
            e.preventDefault();
            commitChange();
        },
        [commitChange]
    );

    const handleKeyUp = useCallback(
        (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                commitChange();
            } else if (e.key === "Escape") {
                cancelChange();
            }
        },
        [commitChange, cancelChange]
    );

    const handleClick = useCallback(() => {
        if (type === "number" && decimals > 0) {
            setEditableValue(value.toFixed(decimals));
        }
        if (!editing) setEditing(true);
    }, [decimals, value, type, editing, setEditing]);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editing]);

    return (
        <>
            <S.Editable onClick={handleClick}>
                {editing ? (
                    <input
                        ref={inputRef}
                        type={type}
                        value={editableValue}
                        onBlur={handleBlur}
                        onKeyUp={handleKeyUp}
                        onChange={handleChange}
                    />
                ) : (
                    <>
                        <span data-tip="Click to edit">{children}</span>
                        <ReactTooltip />
                    </>
                )}
            </S.Editable>
        </>
    );
};

Editable.defaultProps = {
    type: "text",
    decimals: 0,
};

S.Editable = styled.div`
    cursor: pointer;

    input {
        text-align: inherit;
        display: block;
        width: 100%;
        border: 0;
        outline: 0;
        font-size: inherit;
        background: transparent;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }
`;

export default memo(Editable);
