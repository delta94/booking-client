import React from "react";
import {IUseDayPicker, LANG} from "../../hooks/hook";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/ArrowDayByDay";
import {autoComma} from "../../utils/utils";
import Preloader from "../../atoms/preloader/Preloader";
import {Doughnut, ChartData} from "react-chartjs-2";
import {getSalesStatistic_GetSalesStatistic_data} from "../../types/api";
import {arraySum} from "../../utils/elses";
import {getStaticColors} from "../../utils/getStaticColors";

export interface IViewConfigProp {
  showDayPicker?: boolean;
  dayPickerHook?: IUseDayPicker;
}

interface Iprops extends IViewConfigProp {
  priceData: getSalesStatistic_GetSalesStatistic_data[];
  loading: boolean;
}

const DaySales: React.FC<Iprops> = ({
  loading,
  priceData,
  dayPickerHook,
  showDayPicker
}) => {
  if (loading) return <Preloader size="medium" loading={loading} />;

  const totalPrice = arraySum(priceData.map(data => data.price));

  const datasets: ChartData<Chart.ChartData> = {
    labels: priceData.map(data => data.payMethod || "") || "",
    datasets: priceData.map(data => ({
      label: data.payMethod || "",
      data: [data.price],
      backgroundColor: getStaticColors(priceData.length),
      hoverBackgroundColor: getStaticColors(priceData.length, {light: true})
    }))
  };

  return (
    <div>
      {showDayPicker && dayPickerHook && (
        <JDdayPicker
          isRange={false}
          input
          canSelectBeforeDay={false}
          label={LANG("calender_date")}
          {...dayPickerHook}
          className="JDwaves-effect JDoverflow-visible"
          inputComponent={(prop: any) => (
            <ArrowDayByDay {...prop} dayPickerHook={dayPickerHook} />
          )}
        />
      )}
      {autoComma(totalPrice)}
      {LANG("money_unit")}
      <Doughnut data={datasets} />
    </div>
  );
};

export default DaySales;
