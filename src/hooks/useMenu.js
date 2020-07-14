import { useState, useRef, useCallback } from "react";

const useMenu = () => {
    const [menuIsShow, setMenuIsShow] = useState();
    const menuDropdownRef = useRef();

    const handleClickOutside = useCallback((e) => {
        e.preventDefault();
        if (
            menuDropdownRef.current &&
            !menuDropdownRef.current.contains(e.target)
        ) {
            setMenuIsShow(false);
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    const showMenu = useCallback(() => {
        setMenuIsShow(true);
        document.addEventListener("click", handleClickOutside);
    }, [handleClickOutside]);

    const closeMenu = useCallback(() => {
        setMenuIsShow(false);
        document.removeEventListener("click", handleClickOutside);
    }, [handleClickOutside]);

    return [menuIsShow, menuDropdownRef, showMenu, closeMenu];
};

export default useMenu;
