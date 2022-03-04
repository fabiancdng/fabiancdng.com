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
    },
    htmlAnchor: string,
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
        <div id={ data.htmlAnchor } className="h-screen flex flex-col justify-center align-middle">
            <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 mt-10 lg:mt-25">
                {/* Text */}
                <div className="flex flex-1 flex-col items-center lg:items-start">
                    <h1 className="text-4xl lg:text-6xl text-center lg:text-left mb-3 font-bold">{ data.title }</h1>
                    <h2 className="text-3xl lg:text-5xl text-center lg:text-left text-slate-700 mb-1">{ data.subtitle }</h2>
                    <h3 className="text-2xl lg:text-3xl text-center lg:text-left mb-6 text-gray-500">{ data.description }</h3>
                </div>

                {/* Logo */}
                <div className="flex justify-center flex-1 lg:mb-0 z-10">
                    <img src={ statics.CMS_URL + data.logo.data?.attributes.url } className="lg:w-3/6 lg:h-3/6" alt="" />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;