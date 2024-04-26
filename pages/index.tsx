/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
// import Chart from "react-apexcharts";
import dynamic from 'next/dynamic';
import {Grid} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {useStatisticSlice} from 'slices/statistic';
import moment, {Moment} from 'moment';
import {selectStatistic} from 'slices/statistic/selectors';
import {ReportTypeEnum} from 'utils/enum';
import {numberWithCommas} from 'utils/general';
import {useRouter} from 'next/router';
import BoxMolecules from 'components/molecules/Box';

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

const DashboardPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [statisticBy, setStatisticBy] = useState<
    ReportTypeEnum.DATE | ReportTypeEnum.MONTH
  >(ReportTypeEnum.DATE);
  const {getDashboardStatistic} = useStatisticSlice();
  const {data, loading, error} = useSelector(selectStatistic);
  const [dateFilter, setDateFilter] = useState<Moment>(moment.utc());
  const defaultOptions = {
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
        columnWidth: '50%',
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
    fill: {
      opacity: 1,
    },
    colors: [process.env.COLOR_SUCCESS, process.env.COLOR_DANGER],
    xaxis: {},
    tooltip: {
      y: {
        formatter: (val: any) => {
          return numberWithCommas(val) + ' VNĐ';
        },
      },
    },
  };
  const [optionsMonth, SetOptionsMonth] = useState<any>({
    options: {},
    series: [],
  });
  const [optionsDate, SetOptionsDate] = useState<any>({
    options: {},
    series: [],
  });

  useEffect(() => {
    if (!data?.dashboard?.month) {
      dispatch(getDashboardStatistic('month'));
    } else {
      const params = {
        ...defaultOptions,
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeFormatter: {
              year: '',
              month: 'MM',
              day: '',
              hour: '',
            },
          },
          categories: data?.dashboard?.month?.categories,
        },
      };
      SetOptionsMonth({
        options: params,
        series: data?.dashboard?.month?.Series,
      });
    }
  }, [data.dashboard?.month]);

  useEffect(() => {
    if (!data?.dashboard?.date) {
      dispatch(getDashboardStatistic('date'));
    } else {
      const params = defaultOptions;

      SetOptionsDate({
        options: {
          ...params,
          xaxis: {
            type: 'datetime',
            categories: data?.dashboard?.date?.categories,
          },
        },
        series: data?.dashboard?.date?.Series,
      });
    }
  }, [data.dashboard?.date]);

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
      <Grid item xs={12} sm={6} md={6}>
        <BoxMolecules
          title="Nạp - Rút (Ngày)"
          loading={!!loading?.dashboard?.date}>
          {typeof window !== 'undefined' &&
            optionsDate.options &&
            optionsDate.series &&
            optionsDate.series.length > 0 && (
              <Chart
                options={optionsDate.options}
                series={optionsDate.series}
                type="bar"
                width="100%"
              />
            )}
        </BoxMolecules>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <BoxMolecules
          title="Nạp - Rút (Tháng)"
          loading={!!loading?.dashboard?.date}>
          {typeof window !== 'undefined' &&
            optionsMonth.options &&
            optionsMonth.series &&
            optionsMonth.series.length > 0 && (
              <Chart
                options={optionsMonth.options}
                series={optionsMonth.series}
                type="bar"
                width="100%"
              />
            )}
        </BoxMolecules>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
