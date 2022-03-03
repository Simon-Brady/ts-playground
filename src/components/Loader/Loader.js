import React from 'react';
import styled from '@emotion/styled';

const StyledLoader = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;

	div {
		display: inline-block;
		position: absolute;
		left: 8px;
		width: 16px;
		background: #fcf;
		animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
	}
	div:nth-of-type(1) {
		left: 8px;
		animation-delay: -0.24s;
	}
	div:nth-of-type(2) {
		left: 32px;
		animation-delay: -0.12s;
	}
	div:nth-of-type(3) {
		left: 56px;
		animation-delay: 0;
	}
	@keyframes lds-facebook {
		0% {
			top: 8px;
			height: 64px;
		}
		50%,
		100% {
			top: 24px;
			height: 32px;
		}
	}
`;

const Loader = () => (
	<StyledLoader className='lds-facebook'>
		<div></div>
		<div></div>
		<div></div>
	</StyledLoader>
);

export default Loader;
