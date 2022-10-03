import { useEffect, useRef, useState } from "react";

const useDetectClose = (elem) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (elem.current !== null && !elem.current.contains(e.target)) {
                setIsOpen(!isOpen);
            }
        };

        if (isOpen) {
            window.addEventListener("click", onClick);
        }
        return () => {
            window.removeEventListener("click", onClick);
        };
    }, [isOpen]);

    return [isOpen, setIsOpen];
};

export default useDetectClose;