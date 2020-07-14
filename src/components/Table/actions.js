export const changeColumnVisibility = (dispatch, name, visible) => {
    return dispatch({
        type: "CHANGE_VISIBILITY",
        name,
        visible,
    });
};
