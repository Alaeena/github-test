import { useState, useEffect } from 'react';

const getMobile = () => {
    if (window.innerWidth <= 800) {
        return true;
    }
    return false;
};

const useMobile = () => {
    const [mobile, setMobile] = useState(getMobile());

    useEffect(() => {
        const handleWindowResize = () => {
            if (getMobile() !== mobile) {
                setMobile(getMobile());
            }
        };
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [mobile]);

    return [mobile];
};

export default useMobile;
