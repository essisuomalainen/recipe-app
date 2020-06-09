import React from 'react';
import style from './header.module.css';

const Header = () => {
	return (
		<div className={style.headerContainer}>
			<h1 className={style.headerStyle}>Online recipe book</h1>
		</div>
	);
};

export default Header