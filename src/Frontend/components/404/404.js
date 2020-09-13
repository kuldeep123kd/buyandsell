import React from 'react';

import { Link } from 'react-router-dom';

import './404.css';

/* *** This page will shown when no route found *** */

const NoMatch = ({ location }) => {
	return (
	<div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>404</h1>
			</div>
			<h2>Oops, The Page you are looking for can't be found!</h2>
			<Link to="/"><span className="arrow"></span>Return To Homepage</Link>
		</div>
	</div>
	)
}

export default NoMatch;
