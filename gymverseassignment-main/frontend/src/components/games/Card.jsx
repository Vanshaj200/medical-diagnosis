import React from 'react';

const Card = ({ card, handleChoice, flipped }) => {
    const handleClick = () => {
        handleChoice(card);
    };

    return (
        <div className="relative">
            <div className={`w-24 h-24 flex items-center justify-center bg-gray-800 border-2 border-gray-600 rounded-lg cursor-pointer ${flipped ? 'opacity-100' : 'opacity-0'}`} onClick={handleClick}>
                <div className="text-4xl text-blue-400">
                    {card.icon}
                </div>
            </div>
            <div className={`w-24 h-24 bg-blue-600 border-2 border-blue-400 rounded-lg absolute inset-0 flex items-center justify-center ${flipped ? 'opacity-0' : 'opacity-100'}`} onClick={handleClick}></div>
        </div>
    );
};

export default Card;
