import React from 'react';

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '4px', style = {} }) => {
    return (
        <div
            style={{
                width,
                height,
                backgroundColor: '#eee',
                backgroundImage: 'linear-gradient(90deg, #eee, #f5f5f5, #eee)',
                backgroundSize: '200px 100%',
                backgroundRepeat: 'no-repeat',
                borderRadius,
                animation: 'skeleton-loading 1.5s infinite linear',
                ...style
            }}
        />
    );
};

export default Skeleton;
