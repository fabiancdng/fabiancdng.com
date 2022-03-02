import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProjectExplorer from "../components/ProjectExplorer";

const componentsTable: { [key: string]: React.FC<any> } = {
  'layout.header': Header,
  'layout.hero-section': HeroSection,
  'layout.project-explorer': ProjectExplorer,
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