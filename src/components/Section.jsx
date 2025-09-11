import React from 'react';

export const Section = ({ id, title, children }) => (
    <section id={id} className="container mx-auto px-6 py-20">
        <div className="reveal">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text">{title}</h2>
            {children}
        </div>
    </section>
);

