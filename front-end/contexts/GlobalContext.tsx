import React, { createContext, useState } from 'react';

// Define interface for values the context holds.
interface GlobalContextInterface {
    colorMode: 'light' | 'dark',
    setColorMode: (colorMode: 'light' | 'dark') => void
}

const initialGlobalContext: GlobalContextInterface = {
    colorMode: 'light',
    setColorMode: () => {},
}

// Create React Context.
export const GlobalContext = createContext<GlobalContextInterface>(initialGlobalContext);

/**
 * Provider for global state shared across the entire component tree.
 */
export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    // Set the initial values as state.
    const [colorMode, setColorMode] = useState<GlobalContextInterface['colorMode']>('light');

    // Assign the states and "setters" to the context.
    const initialGlobalContext: GlobalContextInterface = {
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