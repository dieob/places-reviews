import React from 'react';
import './AdColumn.scss'

const AdColumn = (props) => {

    return (
        <>
            {
                <div className={'ad-column-container '+ props.side}>
                    ADS
                </div>
            }
        </>
    )
}

export default AdColumn;