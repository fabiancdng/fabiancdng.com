import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import HeroSection from '../components/Misc/HeroSection';
import RichTextSection from '../components/Misc/RichTextSection';
import ProjectExplorer from '../components/Projects/ProjectExplorer';
import staticsData from '../types/statics';

const componentsTable: { [key: string]: React.FC<any> } = {
  'layout.header': Header,
  'layout.hero-section': HeroSection,
  'layout.rich-text-section': RichTextSection,
  'layout.project-explorer': ProjectExplorer,
  'layout.footer': Footer,
};

/**
 * Render and return component by name as string (`__component`) and
 * pass component data payload as prop.
 */
export const renderComponent = (
  component: any,
  index: number,
  statics: staticsData
) => {
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
      {
        key: index,
        data: component,
        statics: statics,
      }
    );
  }
};
