import React from 'react';
import styled from '@emotion/styled';
const StyledChartWrapper = styled.div`
	flex: 1 1 auto;
	width: 48%;
	padding: 10px;
	@media (max-width: 768px) {
		width: 100%;
		padding: 0;
	}
	.loading {
		display: flex;
		height: 350px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	border-bottom: 1px #ccc solid;
`;

const ChartWrapper = ({ children }) => (
	<StyledChartWrapper>{children}</StyledChartWrapper>
);

export default ChartWrapper;
