import React from 'react';

const Basket = ({ x, onMouseDown, onTouchStart }) => {
    return (
        <div
            className="absolute bottom-2"
            style={{
                left: `${x}px`,
                width: '100px',
                height: '50px',
                backgroundColor: '#D2691E', // Chocolate color for better visibility
                borderRadius: '5px',
                border: '2px solid #FFF', // White border for contrast
                cursor: 'move',
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
        />
    );
};

export default Basket;
