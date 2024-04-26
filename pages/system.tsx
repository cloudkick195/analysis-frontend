/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {Grid, Stack} from '@mui/material';
import {useStatisticSlice} from 'slices/statistic';
import {selectStatistic} from 'slices/statistic/selectors';
import {useDispatch, useSelector} from 'react-redux';
import moment, {Moment} from 'moment';
import {numberWithCommas} from 'utils/general';
import {ReportTypeEnum} from 'utils/enum';
import BoxMolecules from 'components/molecules/Box';

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

const StatisticPage = () => {
  const dispatch = useDispatch();
  const [statisticBy, setStatisticBy] = useState<
    ReportTypeEnum.DATE | ReportTypeEnum.MONTH
  >(ReportTypeEnum.DATE);
  const {getSystemStatistic} = useStatisticSlice();
  const {data, loading, error} = useSelector(selectStatistic);
  const [dateFilter, setDateFilter] = useState<Moment>(moment.utc());

  const [options, SetOptions] = useState<any>({});
  const [series, SetSeries] = useState<Array<any>>([]);
  const [zoomPan, setZoomPan] = useState<any>({
    enabled: true,
    type: 'x',
    zoomedArea: {
      fill: {
        color: '#90CAF9',
        opacity: 0.4,
      },
      stroke: {
        color: '#0D47A1',
        opacity: 0.4,
        width: 1,
      },
    },
  });

  const fetchData = (type: string) => {
    dispatch(getSystemStatistic(type));
  };
  
  useEffect(() => {
    handleChangeStatisticBy("date")
  },[])

  useEffect(() => {
      if(data.system){
        SetOptions({
          chart: {
            toolbar: {
              show: true,
            },
            zoom: {
              enabled: true,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '80%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            type: 'datetime',
            categories: data?.system?.categories || [],
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: (val: any) => {
                return numberWithCommas(val) + ' VNĐ';
              },
            },
          },
          colors: [process.env.COLOR_SUCCESS, process.env.COLOR_DANGER],
        });
        SetSeries(data?.system?.Series|| []);
      }

  }, [data.system]);

  const handleChangeStatisticBy = (type: any) => {
    setStatisticBy(type);
    fetchData(type);
  };

  // const onDatePickerChange = (e: Moment) => {
  //     setDateFilter(e)
  //     if (statisticBy === 'month') {
  //         fetchData(moment(e).year(), moment().month(moment(e).month()).format('MM'))
  //     } else {
  //         fetchData(moment(e).year())
  //     }
  // }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12}>
      <BoxMolecules 
            title="Nạp - Rút" 
            loading={!!loading?.system}
            stack={
              {
                value: statisticBy,
                data: [
                  {
                    label:"Ngày",
                    val: "date",
                    func: ()=>handleChangeStatisticBy(ReportTypeEnum.DATE)
                  },
                  {
                    label:"Tháng",
                    val: "month",
                    func: ()=>handleChangeStatisticBy(ReportTypeEnum.MONTH)
                  }
                ]
              }
            }
        >
          {typeof window !== 'undefined' &&
            options &&
            series &&
            series.length > 0 && (
              <Chart
                options={options}
                series={series}
                type="bar"
                width="100%"
              />
            )}
        </BoxMolecules>
      </Grid>
    </Grid>
  );
};

export default StatisticPage;
