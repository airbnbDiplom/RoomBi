"use client";
import style from "./itemWeather.module.css";
import { useTranslation } from "react-i18next";
import { WeatherDay } from "@/app/type/type";

const ItemWeather: React.FC<{ data: WeatherDay }> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <h4>
        {t("weatherWindDate") + ": "} {data.date}
      </h4>

      <div>
        <h5>{t("weatherWind")} 💨</h5>
        <div className={style.containerWind}>
          <p>
            {t("weatherWindDirection") + ": "} {data.wind.direction}
          </p>
          <p>
            {t("weatherWindSpeed") + ": "} {data.wind.speed} м/с
          </p>
        </div>
      </div>

      <div>
        <h5>{t("weatherWindTemperature")} 🌡</h5>
        <div className={style.containerWind}>
          <p>
            {t("weatherWindTemperatureMaximum") + ": "} {data.temperature.max}
            &deg;C
          </p>
          <p>
            {t("weatherWindTemperatureMinimal") + ": "} {data.temperature.min}
            &deg;C
          </p>
        </div>
      </div>

      <div>
        <h5>{t("weatherWindPrecipitation")} 💦</h5>
        <div className={style.containerWind}>
          <p>
            {t("weatherWindQuantity") + ": "} {data.precipitation.amount}
          </p>
          <p>
            {t("weatherWindProbability") + ": "}{" "}
            {data.precipitation.probability}
          </p>
        </div>
      </div>
    </div>
  );
};
export { ItemWeather };
