// ScrapChart.js
import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { useState } from 'react';

const ScrapChart = ({ data }) => {
  const [isFullScreen, setIsFullScreen] = useState(false); // State to manage full-screen mode

  useEffect(() => {


    // Initialize the chart
    const chartDom = document.getElementById('scrap-chart_first');
    const myChart = echarts.init(chartDom);

    // Process data
    const processedData = data.by_month_year.map((item) => ({
        ...item,
        date: `${item.month}-${item.year}`
      })).sort((a, b) => new Date(a.year, a.month - 1) - new Date(b.year, b.month - 1));
  
      const dates = processedData.map(item => item.date);
      const scrapQuantities = processedData.map(item => parseFloat(item.total_scrap_quantity))
      const scrapValues = processedData.map(item => parseFloat(item.total_value_for_scrap))
  
      // ECharts option
      const option = {
        grid: {

          },
        title: {
            text: 'MOM Trendline of Scrap Value & Quantity',
            left: 'center',
            top: 'top'
          },
        tooltip: {
          trigger: 'axis'
        },
 legend: {
        data: [
          { name: 'Scrap Value',  },
          { name: 'Scrap Quantity',}
        ],
        left: 'center',
        top: '8%',
    
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          rotate: 45, // Rotate labels by 45 degrees
          textStyle: {
            fontSize: 12, // Adjust font size if needed
            fontFamily: 'Arial, sans-serif' // Adjust font family if needed
          }
        }
      }
,      
        yAxis: {
            type: 'value',
      
            axisLabel: {
              formatter: '{value}'
            }
          },
        series: [
          {
            name: 'Scrap Value',
            type: 'line',
            data: scrapValues,
            smooth: true,
            yAxisIndex: 0,
            label: {
              show: true,
              position: 'top',
              formatter: function(params) {
                return '₹ ' + (params.value / 1000).toFixed(2) + "K";
              },

 
              borderRadius: 4,
              padding: [3, 5],
              borderWidth: 1,
        
            },
            itemStyle: {
              color: '#c23531'
            },
            markPoint: {
              data: scrapValues.map((value, index) => ({
                coord: [dates[index], value],
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: true,
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: 40,
                  padding: [5, 5],
                  borderWidth: 2,
                  borderColor: '#c23531'
                }
              }))
            }
          },
          {
            name: 'Scrap Quantity',
            type: 'line',
            data: scrapQuantities,
            smooth: true,
            yAxisIndex: 0,
            label: {
              show: true,
              position: 'top',
              formatter: function(params) {
                return   (params.value / 1000).toFixed(2) + "K";
              },


              borderRadius: 4,
              padding: [3, 5],
              borderWidth: 1,
 
            },
            itemStyle: {
              color: '#2f4554'
            },
            markPoint: {
              data: scrapQuantities.map((value, index) => ({
                coord: [dates[index], value],
                symbol: 'circle',
                symbolSize: 5,
                label: {
                  show: true,
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: 40,
                  padding: [1, 1],
                  borderWidth: 1,
                  borderColor: '#2f4554'
                }
              }))
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
    const chartContainer = document.getElementById('scrap-chart_first-container');
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
      <div id="scrap-chart_first-container" className="scrap-chart_first-container">
        <div id="scrap-chart_first" className="chart" style={{ width: '100%',   height: isFullScreen ? '100vh' : '90vh', backgroundColor: "#e8e8e8" }}></div>
        <button onClick={toggleFullScreen} className="full-screen-btn">
          {isFullScreen ? 'Exit Full Screen' : 'Max Screen'}
        </button>
      </div>
    );
  };
  
  export default ScrapChart;