import React from "react";
import HeroSection from "../components/HeroSection";

const componentsTable: { [key: string]: React.FC<any> } = {
    'layout.hero-section': HeroSection,
}

/**
 * Render and return component by name as string (`__component`) and
 * pass component data payload as prop.
 */
export const renderComponent = (component: any, index: number) => {
    /**
     * String to identify the component (must exist as key in `componentsTable`).
     */
    const componentIdentifier: string = component['__component'];

    // Make sure component is in table.
    if (typeof componentsTable[componentIdentifier] !== 'undefined') {
      // Render and return matching React component from componentsTable.
      return React.createElement(
        componentsTable[componentIdentifier],
        // Pass unique key (in case used in a forEach) and data as props.
        { key: index, data: component },
      );
    }
}