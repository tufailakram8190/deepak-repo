// src/ScrapChart.js
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import "../ScrapChart.css"

const ScrapChart = ({ data }) => {
  const [isFullScreen, setIsFullScreen] = useState(false); // State to manage full-screen mode

  useEffect(() => {
    // Initialize the chart
    const chartDom = document.getElementById('scrap-chart');
    const myChart = echarts.init(chartDom);

    // Data based on the provided sample
    const data_new = data.by_work_center;

    // Extract the needed data
    const workCenters = data_new.map(item => item.work_center);
    const scrapQuantities = data_new.map(item => parseFloat(item.total_scrap_quantity));
    const cumulativePercentages = scrapQuantities.map((qty, idx, arr) => {
      const total = arr.reduce((sum, value) => sum + value, 0);
      const cumulativeSum = arr.slice(0, idx + 1).reduce((sum, value) => sum + value, 0);
      return ((cumulativeSum / total) * 100).toFixed(2);
    });

    // Generate a unique color for each bar
    const colors = [
      '#FF5733', '#33FF57', '#3357FF', '#FF33A1',
      '#FFBD33', '#8D33FF', '#33FFF2', '#FF5733',
      '#FFC300', '#DAF7A6', '#900C3F', '#581845',
      '#C70039', '#FF5733', '#33FFBD', '#FF33E1'
    ];

    // Chart configuration
    const option = {
      title: {
        text: 'Scrap By Work Center (SWC)',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params) => {
          let tooltipContent = '';
          params.forEach((item) => {
            const isBar = item.seriesType === 'bar';
            tooltipContent += `${item.marker} ${item.seriesName}: ${item.value}`;
            if (isBar) {
              tooltipContent += ` (${cumulativePercentages[item.dataIndex]}%)<br/>`;
            } else {
              tooltipContent += `%<br/>`;
            }
          });
          return tooltipContent;
        }
      },
      xAxis: {
        type: 'category',
        data: workCenters,
        axisLabel: {
          rotate: 45,
          textStyle: {
            fontSize: 12,
            fontFamily: 'Arial, sans-serif'
          }
        }
      },
      yAxis: [
        {
          type: 'value',

        },
        {
          type: 'value',
   
          max: 100
        }
      ],
      series: [
        {
          name: 'Scrap Quantity',
          type: 'bar',
          data: scrapQuantities,
          itemStyle: {
            color: function (params) {
              return colors[params.dataIndex % colors.length];
            }
          }
        },
        {
          name: 'Cumulative Percentage',
          type: 'line',
          yAxisIndex: 1,
          data: cumulativePercentages,
          smooth: true,
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          },
          lineStyle: {
            color: 'green'
          }
        }
      ]
    };

    // Set the chart options
    myChart.setOption(option);

    // Resize chart on window resize or full-screen change
    const resizeChart = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeChart);
    document.addEventListener('fullscreenchange', resizeChart);

    // Clean up the chart instance and event listeners on component unmount
    return () => {
      myChart.dispose();
      window.removeEventListener('resize', resizeChart);
      document.removeEventListener('fullscreenchange', resizeChart);
    };
  }, [data]);

  // Handle full-screen toggle
  const toggleFullScreen = () => {
    const chartContainer = document.getElementById('scrap-chart-container');
    if (!document.fullscreenElement) {
      chartContainer.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Listen for fullscreen change to update state
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div id="scrap-chart-container" className="scrap-chart-container">
      <div id="scrap-chart" className="chart" style={{ width: '100%', height: isFullScreen ? '100vh' : '90vh', backgroundColor: "#e8e8e8" }}></div>
      <button onClick={toggleFullScreen} className="full-screen-btn">
        {isFullScreen ? 'Exit Full Screen' : 'Max Screen'}
      </button>
    </div>
  );
};

export default ScrapChart;
