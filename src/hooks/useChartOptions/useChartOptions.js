import { useEffect, useState } from 'react';
const useChartOptions = ({
	financialData,
	symbol,
	checkedSymbols,
	type = 'historicalData',
}) => {
	const options = {
		title: {
			text: symbol,
			style: { color: '#fff' },
		},
		series: [],
		chart: { backgroundColor: 'rgb(13, 19, 25)' },
	};

	const [chartOptions, setChartOptions] = useState(options);

	/* 
		If historicalData hook returns valid data, 
		compare with list of selected symbols per ticker (chart component)
		and create data objects
		eg: [{name: 'TGT', data:[1, 2, 3]}, {name: 'AMZ', data:[5, 6, 7]}]

		returns set of chart options to hydrate chart component
	*/
	useEffect(() => {
		if (financialData && type) {
			switch (type) {
				case 'historicalData':
					console.log('hit', financialData);
					let aggregateSeriesData = [];
					const symbolKeys = Object.keys(checkedSymbols);
					const validSymbols = symbolKeys.filter(
						(symbol) => checkedSymbols[symbol]
					);

					validSymbols.forEach((validSymbol) => {
						let data = [];
						Object.keys(financialData).forEach((key) => {
							// just pushing close data for now, can adjust to any available data point via props
							data.push(++financialData[key][validSymbol].close);
						});
						aggregateSeriesData.push({ name: validSymbol, data });
					});
					setChartOptions({
						...options,
						xAxis: {
							categories: Object.keys(financialData),
						},
						series: aggregateSeriesData,
					});
					break;
				case 'retention':
					console.log('retention!');
					break;
				default:
					setChartOptions({
						...options,
						xAxis: {
							categories: Object.keys(financialData),
						},
						series: aggregateSeriesData,
					});
			}
		}
	}, [financialData]);

	return { chartOptions };
};

export default useChartOptions;
