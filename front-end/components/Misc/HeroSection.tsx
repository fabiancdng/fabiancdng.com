import { useEffect } from "react";
import imageData from "../../types/image";

/**
 * Data from the CMS for a HeroSection component.
 */
interface heroSectionData {
    id: number,
    __component: string,
    title: string,
    subtitle: string,
    description: string|null,
    backgroundColorCode: string|null,
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
}

const HeroSection = ({ data }: heroSectionProps) => {
    useEffect(() => {
        console.log('HeroSection: ', data);
    }, []);

    return (
        <div>{ data.title }</div>
    );
}

export default HeroSection;