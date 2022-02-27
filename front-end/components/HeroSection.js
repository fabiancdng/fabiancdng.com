import { useEffect } from "react";

const HeroSection = ({ data }) => {
    useEffect(() => {
        console.log('Hero', data);
    }, []);

    return (
        <div>HeroSection</div>
    );
}

export default HeroSection;