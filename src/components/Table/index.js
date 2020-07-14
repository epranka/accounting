import update from "immutability-helper";
import React, { useContext, useReducer, memo } from "react";

const TableContext = React.createContext({});

const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_VISIBILITY":
            return update(state, {
                [action.name]: { $set: action.visible },
            });
        default:
            return state;
    }
};

const TableProvider = ({ children, defaultVisibleColumns }) => {
    const ctx = useReducer(reducer, defaultVisibleColumns);
    return (
        <TableContext.Provider value={ctx}>{children}</TableContext.Provider>
    );
};

const useVisibleColumns = () => {
    return useContext(TableContext);
};

export { useVisibleColumns };
export default memo(TableProvider);
