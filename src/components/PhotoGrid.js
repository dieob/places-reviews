import React, { Component } from 'react';

import './PhotoGrid.scss';

function PhotoGrid(model) {

    return (
        <div className="grid-container">
            {
                model.photoList.map((photo, index) => {
                    <div key={index} className="grind-item">
                        <figure>
                            <img className="image" src={"data:image/gif;base64," + photo} alt="model" />
                        </figure>
                    </div>
                })
            }
        </div>
    );
}

export default PhotoGrid;
