/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {Grid, Stack} from '@mui/material';
import {useStatisticSlice} from 'slices/statistic';
import {selectStatistic} from 'slices/statistic/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {numberWithCommas} from 'utils/general';
import {ReportTypeEnum} from 'utils/enum';
import BoxMolecules from 'components/molecules/Box';

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

const MemberPage = () => {
  const dispatch = useDispatch();
  const {
    getMemberDepositWithdrawalStatistic,
    getMemberWinLoseStatistic,
    getMemberPromotionRebateStatistic,
  } = useStatisticSlice();
  const {data, loading} = useSelector(selectStatistic);

  const [statisticBy, setStatisticBy] = useState<
    ReportTypeEnum.DATE | ReportTypeEnum.MONTH
  >(ReportTypeEnum.DATE);
  const [options, SetOptions] = useState<any>({});
  const [series, SetSeries] = useState<Array<any>>([]);

  const [statistic1By, setStatistic1By] = useState<
    ReportTypeEnum.DATE | ReportTypeEnum.MONTH
  >(ReportTypeEnum.DATE);
  const [options1, SetOptions1] = useState<any>({});
  const [series1, SetSeries1] = useState<Array<any>>([]);

  const [statistic2By, setStatistic2By] = useState<
    ReportTypeEnum.DATE | ReportTypeEnum.MONTH
  >(ReportTypeEnum.DATE);
  const [options2, SetOptions2] = useState<any>({});
  const [series2, SetSeries2] = useState<Array<any>>([]);

  const [limit, setLimit] = useState<number>(10);

  const fetchDataMemberDepositWithdrawalStatistic = (type: string) => {
    const payload = {
      type: type,
      field: 'deposit',
      limit: limit,
    };
    dispatch(getMemberDepositWithdrawalStatistic(payload));
  };

  const fetchDataMemberWinLoseStatistic = (type: string) => {
    const payload = {
      type: type,
      field: 'deposit',
      limit: limit,
    };
    dispatch(getMemberWinLoseStatistic(payload));
  };

  const fetchDataMemberPromotionRebateStatistic = (type: string) => {
    const payload = {
      type: type,
      field: 'promotion',
      limit: limit,
    };
    dispatch(getMemberPromotionRebateStatistic(payload));
  };
  useEffect(() => {
    handleChangeMemberDepositWithdrawalStatisticBy("date")
    handleChangeMemberWinLoseStatisticBy("date")
    handleChangeMemberPromotionRebateStatisticBy("date")
  }, [])
  useEffect(() => {
    if(data.member.depositWithdrawal){
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
          width: 4,
          colors: ['transparent'],
        },
        xaxis: {
          type: 'category',
          categories: [...data?.member?.depositWithdrawal?.categories],
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
      SetSeries([...data?.member?.depositWithdrawal?.Series]);
    }

    if (data.member.winLose) {
      SetOptions1({
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
          width: 4,
          colors: ['transparent'],
        },
        xaxis: {
          type: 'category',
          categories: [...data?.member?.winLose?.categories],
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
      SetSeries1([...data?.member?.winLose?.Series]);
    }
    if (data.member.promotionRebate) {
      SetOptions2({
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
          width: 4,
          colors: ['transparent'],
        },
        xaxis: {
          type: 'category',
          categories: [...data?.member?.promotionRebate?.categories],
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
      SetSeries2([...data?.member?.promotionRebate?.Series]);
    } 
  }, [data]);

  const handleChangeMemberDepositWithdrawalStatisticBy = (type: any) => {
    setStatisticBy(type);
    fetchDataMemberDepositWithdrawalStatistic(type);
  };

  const handleChangeMemberWinLoseStatisticBy = (type: any) => {
    setStatistic1By(type);
    fetchDataMemberWinLoseStatistic(type);
  };

  const handleChangeMemberPromotionRebateStatisticBy = (type: any) => {
    setStatistic2By(type);
    fetchDataMemberPromotionRebateStatistic(type);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={6}>
        <BoxMolecules
          title={`Top ${limit} Nạp - Rút`}
          loading={!!loading?.member.depositWithdrawal}
          stack={{
            value: statisticBy,
            data: [
              {
                label: 'Ngày',
                val: 'date',
                func: () =>
                  handleChangeMemberDepositWithdrawalStatisticBy(
                    ReportTypeEnum.DATE,
                  ),
              },
              {
                label: 'Tháng',
                val: 'month',
                func: () =>
                  handleChangeMemberDepositWithdrawalStatisticBy(
                    ReportTypeEnum.MONTH,
                  ),
              },
            ],
          }}>
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
      <Grid item xs={12} sm={12} md={6}>
        <BoxMolecules
          title={`Top ${limit} Thắng - Thua`}
          loading={!!loading?.member.winLose}
          stack={{
            value: statistic1By,
            data: [
              {
                label: 'Ngày',
                val: 'date',
                func: () =>
                  handleChangeMemberWinLoseStatisticBy(ReportTypeEnum.DATE),
              },
              {
                label: 'Tháng',
                val: 'month',
                func: () =>
                  handleChangeMemberWinLoseStatisticBy(ReportTypeEnum.MONTH),
              },
            ],
          }}>
          {typeof window !== 'undefined' &&
            options1 &&
            series1 &&
            series1.length > 0 && (
              <Chart
                options={options1}
                series={series1}
                type="bar"
                width="100%"
              />
            )}
        </BoxMolecules>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
      <BoxMolecules
          title={`Top ${limit} Hoàn trả`}
          loading={!!loading?.member.promotionRebate}
          stack={{
            value: statistic2By,
            data: [
              {
                label: 'Ngày',
                val: 'date',
                func: () =>
                handleChangeMemberPromotionRebateStatisticBy(ReportTypeEnum.DATE),
              },
              {
                label: 'Tháng',
                val: 'month',
                func: () =>
                handleChangeMemberPromotionRebateStatisticBy(ReportTypeEnum.MONTH),
              },
            ],
          }}>
          {typeof window !== 'undefined' &&
            options2 &&
            series2 &&
            series2.length > 0 && (
              <Chart
                options={options2}
                series={series2}
                type="bar"
                width="100%"
              />
            )}
        </BoxMolecules>
      </Grid>
    </Grid>
  );
};

export default MemberPage;
