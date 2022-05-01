import { useEffect, useState } from 'react';
import { FaMoon, FaRegMoon } from 'react-icons/fa';
// import { GlobalContext } from '../../contexts/GlobalContext';

/**
 * Props for the DarkModeToggle component.
 */
 interface DarkModeToggleProps {
    additionalCSS?: string
}


const DarkModeToggle = ({ additionalCSS }: DarkModeToggleProps) => {
    // Get color mode state from global context.
    // const { colorMode, setColorMode } = useContext(GlobalContext);
    const [colorMode, setColorMode] = useState('light');

    const changeColorMode = () => {
        // Toggle color mode in state.
        setColorMode(colorMode === 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        // Set .dark class on body to use tailwind dark: selectors.
        if (colorMode === 'dark') {
            document.body.classList.add('dark');
        } else {
            // Remove class when dark mode has been disabled.
            document.body.classList.remove('dark');
        }
    }, [colorMode]);

    return (
        <a
            onClick={changeColorMode}
            className={ `hover:bg-slate-200 bg-slate-100 flex flex-col justify-center rounded cursor-pointer px-4 py-3
            text-xl transition-all duration-500 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white ` + additionalCSS }
        >
            { colorMode === 'light' ? <FaMoon /> : <FaRegMoon /> }
        </a>
    );
}

export default DarkModeToggle;