import React, { createContext, useState } from 'react';

// Define interface for values the context holds.
interface GlobalContext {
    colorMode: 'light' | 'dark',
    setColorMode: (colorMode: 'light' | 'dark') => void
}

const initialGlobalContext: GlobalContext = {
    colorMode: 'light',
    setColorMode: () => {},
}

// Create React Context.
export const GlobalContext = createContext<GlobalContext>(initialGlobalContext);

/**
 * Provider for global state shared across the entire component tree.
 */
export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    // Set the initial values as state.
    const [colorMode, setColorMode] = useState<GlobalContext['colorMode']>('light');

    // Assign the states and "setters" to the context.
    const initialGlobalContext: GlobalContext = {
        colorMode,
        setColorMode
    };

    return(
    <GlobalContext.Provider
        value={ initialGlobalContext }
    >
        {children}
    </GlobalContext.Provider>
    );
}