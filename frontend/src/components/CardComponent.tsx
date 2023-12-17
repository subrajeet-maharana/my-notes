import React from 'react';

interface Card {
    id: number;
    title: string;
    content: string;
}

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-2 mb-2 hover:bg-gray-100">
            <div className="text-sm text-gray-600">ID: {card.id}</div>
            <div className="text-lg font-semibold text-gray-800">{card.title}</div>
            <div className="text-md text-gray-700">{card.content}</div>
        </div>
    );
};

export default CardComponent;
