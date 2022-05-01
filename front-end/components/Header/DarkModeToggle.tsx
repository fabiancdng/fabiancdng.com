import { useState } from 'react';
import { FaMoon, FaRegMoon } from 'react-icons/fa';

/**
 * Props for the DarkModeToggle component.
 */
 interface darkModeToggleProps {
    additionalCSS?: string
}


const DarkModeToggle = ({ additionalCSS }: darkModeToggleProps) => {
    const [colorMode, setColorMode] = useState('light');
    return (
        <a
            onClick={
                () => setColorMode(colorMode === 'light' ? 'dark' : 'light')
            }
            className={ "hover:bg-slate-200 bg-slate-100 flex flex-col justify-center rounded cursor-pointer px-4 py-3 text-xl transition-all duration-500 " + additionalCSS }
        >
            { colorMode === 'light' ? <FaMoon /> : <FaRegMoon /> }
        </a>
    );
}

export default DarkModeToggle;