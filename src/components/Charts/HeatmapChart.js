import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import { ChartWrapper } from './style';
import exampleRetentionData from '../../fixtures/exampleRetentionData.json';
import styled from '@emotion/styled';
/*
	Shamelessly stolen UI from vision 2.0 UI (contractors), but passing dynamic functionality to make this actually work!

*/

const StyledHeatmapWrapper = styled.div``;

const HeatmapChart = () => {
	const options = {
		chart: {
			backgroundColor: '#0d1319',
			className: 'ce-retention-grid-container',
			reflow: false,
			type: 'heatmap',
		},
		title: {
			text: 'PERIODS AFTER INITIAL PURCHASE',
			align: 'center',
			style: {
				color: '#C4C4C4',
				fontSize: '10px',
			},
		},
		legend: {
			enabled: false,
			align: 'right',
			layout: 'vertical',
		},
		plotOptions: {
			series: {
				states: {
					hover: {
						enabled: false,
					},
					inactive: {
						enabled: false,
					},
				},
				// pointWidth: 20,
			},
		},
		xAxis: {
			categories: [
				'0',
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'10',
				'11',
				'12',
				'13',
				'14',
				'15',
				'16',
				'17',
				'18',
			],
			visible: true,
			lineWidth: 0,
			opposite: true,
			labels: {
				style: {
					color: '#E9E9E9',
				},
			},
		},
		yAxis: {
			categories: [
				"<div class='retention-yaxis-label'>Jan<br />2020</div>",
				"<div class='retention-yaxis-label'>Feb<br />2020</div>",
				"<div class='retention-yaxis-label'>Mar<br />2020</div>",
				"<div class='retention-yaxis-label'>Apr<br />2020</div>",
				"<div class='retention-yaxis-label'>May<br />2020</div>",
				"<div class='retention-yaxis-label'>Jun<br />2020</div>",
				"<div class='retention-yaxis-label'>Jul<br />2020</div>",
				"<div class='retention-yaxis-label'>Aug<br />2020</div>",
				"<div class='retention-yaxis-label'>Sep<br />2020</div>",
				"<div class='retention-yaxis-label'>Oct<br />2020</div>",
				"<div class='retention-yaxis-label'>Nov<br />2020</div>",
				"<div class='retention-yaxis-label'>Dec<br />2020</div>",
				"<div class='retention-yaxis-label'>Jan<br />2021</div>",
				"<div class='retention-yaxis-label'>Feb<br />2021</div>",
				"<div class='retention-yaxis-label'>Mar<br />2021</div>",
				"<div class='retention-yaxis-label'>Apr<br />2021</div>",
				"<div class='retention-yaxis-label'>May<br />2021</div>",
				"<div class='retention-yaxis-label'>Jun<br />2021</div>",
				"<div class='retention-yaxis-label'>Jul<br />2021</div>",
			],
			gridLineWidth: 0,
			reversed: true,
			title: null,
			visible: true,
			labels: {
				useHTML: true,
				enabled: true,
				style: {
					color: '#E9E9E9',
				},
				x: -5,
			},
		},
		// dictates the color spread
		colorAxis: [
			{
				stops: [
					[0, '#94E3E0'],
					[0.01, '#61BBB7'],
					[0.4, '#135E5C'],
					[1, '#064746'],
				],
			},
			{
				stops: [
					[0, '#94E3E0'],
					[0.1, '#61BBB7'],
					[0.5, '#135E5C'],
					[1, '#064746'],
				],
			},
		],
		tooltip: {
			outside: true,
			style: {
				color: '#e9e9e9',
			},
			backgroundColor: '#151515',
			borderColor: '#535353',
			shadow: false,
			headerFormat: '',
			pointFormatter: function () {
				let periodStr = this.x === 1 ? ' period' : ' periods';
				return (
					"<span style='font-size:10px;'>" +
					this.series.chart.yAxis[0].categories[this.y]
						.split('<br />')
						.join(' ') +
					"</span><br /><span style='font-size: 10px;'>After " +
					this.x +
					periodStr +
					"</span><br /><strong style='font-size:10px;'>" +
					this.options.value +
					'%</strong>'
				);
			},
			pointFormat:
				"<strong style='font-size:10px;'>{point.series.name}</strong><br><span style='font-size: 10px;'>{point.series.chart.yAxis[0].categories[point.options.y]} {point.options.x}</span><br><strong style='font-size:14px;'>{point.options.value} %</strong>",
			shared: false,
		},
		series: [
			{
				name: 'Total',
				borderWidth: 5,
				borderColor: '#0d1319',
				colorAxis: 0,
				data: exampleRetentionData.totals,
				dataLabels: {
					enabled: true,
					formatter: function () {
						console.log('this', this);
						if (this.point.options.value > 1000000) {
							return (
								Highcharts.numberFormat(this.point.options.value / 1000000, 1) +
								'M'
							);
						} else if (this.point.options.value > 1000) {
							return (
								Highcharts.numberFormat(this.point.options.value / 1000, 1) +
								'K'
							);
						} else {
							return this.point.options.value;
						}
					},
					style: {
						textOutline: 'none',
					},
				},
				tooltip: {
					style: {
						fontSize: 10,
					},
					pointFormatter: function () {
						return (
							'<span style="font-size:10px;">' +
							this.series.chart.yAxis[0].categories[this.y]
								.split('<br />')
								.join(' ') +
							'</span>' +
							"<br /><span style='font-size:10px;'>Cohort " +
							this.series.name +
							'</span>' +
							'<br />' +
							"<strong style='font-size:10px;'>" +
							this.options.value +
							'</strong>'
						);
					},
				},
			},
			{
				name: '',
				borderWidth: 5,
				borderColor: '#0d1319',
				colorAxis: 1,
				data: exampleRetentionData.periodPercentageData,
				dataLabels: {
					enabled: true,
					format: '{point.options.value:,.0f}%',
					style: {
						textOutline: 'none',
					},
				},
			},
		],
		annotations: [
			{
				allowOverlap: true,
				visible: true,
				crop: false,
				draggable: '',
				labels: [
					{
						align: 'right',
						// distance: 23,
						point: {
							xAxis: -1,
							yAxis: -1,
							x: -8,
							y: 10,
						},
						text: 'COHORT',
					},
				],
				labelOptions: {
					backgroundColor: 'transparent',
					borderColor: 'transparent',
					shape: 'rect',
					style: {
						color: '#E9E9E9',
					},
				},
			},
		],
		exporting: {
			buttons: {
				contextButton: {
					enabled: false,
				},
			},
		},
	};

	return (
		<ChartWrapper>
			<StyledHeatmapWrapper>
				<HighchartsReact highcharts={Highcharts} options={options} />
			</StyledHeatmapWrapper>
		</ChartWrapper>
	);
};

export default HeatmapChart;
