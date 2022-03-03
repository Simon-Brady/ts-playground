import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useHistoricalData } from '../../hooks/useHistoricalData';
import styled from '@emotion/styled';
import { Checkbox } from '../inputs';
import { Loader } from '../Loader';
import { useChartOptions } from '../../hooks/useChartOptions';
import 'flatpickr/dist/themes/dark.css';
import Flatpickr from 'react-flatpickr';
import { ChartWrapper } from './style';

const DatePickerWrapper = styled.div`
	display: flex;
	padding-bottom: 20px;
	margin-top: 20px;
	padding-left: 20px;
	input {
		padding: 4px;
		font-weight: bold;
		border: none;
		background: #6a9b9b;
		color: #000;
		border-radius: 7px;
		width: 50%;
		text-align: center;
	}
`;

const CheckboxContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	padding-top: 10px;
	margin-bottom: 20px;
	border-bottom: 1px #ccc solid;
`;

type ChartPropsT = {
	symbols: string[],
	symbol: string
}

type CheckedSymbolT = {
	[k: string]: boolean
}

type DOMTargetT = {checked: boolean, value: string}

type ChangeSymbolT = { target: DOMTargetT}


const Chart = ({ symbols = [], symbol}: ChartPropsT) => {
	const initialCheckedSymbol: CheckedSymbolT = {[symbol] : true}
	// Default checked symbol inherited from prop
	const [checkedSymbols, setCheckedSymbols] = useState(initialCheckedSymbol);

	const instantiateDateRange = () => {
		// Set default date range to a month
		// let today = new Date();
		// let lastWeek = new Date();
		// // return date - 30 days
		// lastWeek.setDate(lastWeek.getDate() - 30);
		// return [lastWeek, today];

		return [new Date('01-01-2020'), new Date('02-01-2020')];
	};
	const [dateRange, setDateRange] = useState(instantiateDateRange());

	const { historicalData, isErrored } = useHistoricalData({
		checkedSymbols,
		dateRange,
	});

	const { chartOptions } = useChartOptions({
		type: 'historicalData',
		financialData: historicalData,
		symbol,
		checkedSymbols,
	});

	// On checkbox change, set checked status
	const handleSymbolChange = (e: ChangeSymbolT) => {
		const { target } = e;
		const { checked, value } = target;
		setCheckedSymbols({ ...checkedSymbols, [value]: checked });
	};
	/* 
		if errored, show error,
		else if no chart data, assume loading,
		else render chart
	*/
	return (
		<ChartWrapper>
			{!isErrored ? (
				<>
					{chartOptions.series.length ? (
						<>
							<DatePickerWrapper>
								<Flatpickr
									value={dateRange}
									onChange={(date) => {
										setDateRange(date);
									}}									
									options={{
										mode: 'range',
										maxDate: 'today',
									}}
								/>
							</DatePickerWrapper>
							<HighchartsReact highcharts={Highcharts} options={chartOptions} />
							<CheckboxContainer>
								{symbols && !isErrored
									? symbols.map((displaySymbol, key) => (
											<Checkbox
												name={`${symbol}-checkbox`}
												label={displaySymbol}
												defaultChecked={symbol === displaySymbol}
												onChangeMethod={handleSymbolChange}
												value={displaySymbol}
												key={key}
											/>
									  ))
									: null}
							</CheckboxContainer>
						</>
					) : (
						<div className='loading'>
							<Loader />
						</div>
					)}
				</>
			) : (
				<p>Chart Error</p>
			)}
		</ChartWrapper>
	);
};

export default Chart;
