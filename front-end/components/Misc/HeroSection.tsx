import { useEffect } from "react";
import imageData from "../../types/image";
import staticsData from "../../types/statics";

/**
 * Data from the CMS for a HeroSection component.
 */
interface heroSectionData {
    id: number,
    __component: string,
    title: string,
    subtitle: string,
    description: string|null,
    backgroundImage: {
        data: imageData|null,
    },
    logo: {
        data: imageData|null,
    }
}

/**
 * Props for the HeroSection component.
 */
interface heroSectionProps {
    data: heroSectionData,
    statics: staticsData,
}

const HeroSection = ({ data, statics }: heroSectionProps) => {
    useEffect(() => {
        console.log('HeroSection: ', data);
    }, []);

    return (
        <div>{ data.title }</div>
    );
}

export default HeroSection;