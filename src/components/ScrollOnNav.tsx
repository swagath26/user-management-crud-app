import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollOnNav = () => {
    const {pathname, hash} = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0});
        if (hash) {
            const sectionId = hash.replace('#', '');
            const sectionElement = document.getElementById(sectionId);
            if(sectionElement) {
                sectionElement.scrollIntoView({ behavior: 'smooth'});
            }
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollOnNav;