import { useState, useEffect } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
    const gridSize = 9; // Total number of squares
    const [blinkIndices, setBlinkIndices] = useState([]);

    // Function to generate random indices for blinking
    const generateRandomBlink = () => {
        const randomIndices = Array.from({ length: Math.floor(gridSize * 0.2) }, () =>
            Math.floor(Math.random() * gridSize)
        );
        setBlinkIndices(randomIndices);
    };

    // Start random blinking effect
    useEffect(() => {
        const interval = setInterval(() => {
            generateRandomBlink();
        }, 1000); // Change blink every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-20">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-5 mb-3">
                    {[...Array(gridSize)].map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-2xl ${blinkIndices.includes(i) ? "bg-primary animate-pulse" : "bg-primary/60"
                                }`}
                        />
                    ))}
                </div>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div>
    );
};

export default AuthImagePattern;
