import React, { Component } from 'react';
import Search from './Search';

import './Find.scss';

class Find extends Component {

    render() {
        return (
            <div className="find-container extra-margin-top">
                <h2 className="title">Type in the name</h2>
                <Search class="search-page"></Search>
            </div>
        )
    }
}

export default Find;