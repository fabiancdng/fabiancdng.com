import React from "react";
import HeroSection from "../components/HeroSection";

const dynamicComponentsTable: any = {
    'layout.hero-section': HeroSection,
}
  
export const renderComponent = (component: any, index: number) => {
    const componentIdentifier: string = component['__component'];

    if (typeof dynamicComponentsTable[componentIdentifier] !== 'undefined') {
      return React.createElement(
        dynamicComponentsTable[componentIdentifier],
        { key: index, data: component },
      );
    }
}