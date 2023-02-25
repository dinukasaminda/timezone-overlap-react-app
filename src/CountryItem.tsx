import React, { useEffect, useState } from "react";
import { HOUR_LIST, ICountryItem } from "./types";
import "./CountryItem.css";
import Card from "@mui/material/Card";
import moment from "moment-timezone";
export function CountryItem(props: {
  countryItem: ICountryItem;
  baseCountryItem: ICountryItem;
}) {
  const [countryItem, setCountryItem] = useState<ICountryItem>(
    props.countryItem
  );
  const [timeList, setTimeList] = useState<string[]>([]);
  const SLOT_ITEM_WIDTH = window.screen.width / 26;
  useEffect(() => {
    const list1: string[] = [];
    if (!countryItem.is_base_timezone) {
      list1.push("" + "ex");
    }
    HOUR_LIST.forEach((v) => {
      list1.push("" + v);
    });
    setTimeList(list1);
  }, []);
  return (
    <div>
      <div className="CountryBar">
        <Card
          sx={{
            boxShadow: 2,
            padding: 0,
            textAlign: "center",
            backgroundColor: "#8d99ae",
          }}
        >
          <p className="BarTitle">{countryItem.timezone}</p>
          <div className="SlotList">
            {timeList.map((v, i) => {
              const m = moment();
              m.set("hours", i);
              m.set("minute", 0);
              let timeFormat = m.format("HH:mm");

              let isSelectedRange = false;

              let nTimeMoment = m;
              if (!countryItem.is_base_timezone) {
                const timeNow = m.unix();
                const mTime = moment.unix(timeNow);
                // const timeBaseTZ = mTime
                //   .tz(props.baseCountryItem.timezone)
                //   .format("HH:mm");
                nTimeMoment = mTime.tz(countryItem.timezone);
                timeFormat = mTime.tz(countryItem.timezone).format("HH:mm");
                // console.log("timeBaseTZ", timeBaseTZ);
                // console.log("timeTZ", timeTZ);
              }

              const [sh, sm] = countryItem.start_time.split(":").map((v) => +v);
              const [eh, em] = countryItem.end_time.split(":").map((v) => +v);
              const nTimeHH = nTimeMoment.get("hours");
              const nTimeMM = nTimeMoment.get("minutes");
              console.log(
                [sh, sm],
                [eh, em],
                nTimeHH,
                nTimeMM,
                sh <= nTimeHH && sm <= nTimeMM && eh >= nTimeHH && em >= nTimeMM
              );
              if (
                sh * 60 + sm <= nTimeHH * 60 + nTimeMM &&
                eh * 60 + em >= nTimeHH * 60 + nTimeMM
              ) {
                isSelectedRange = true;
              }

              let baseClass = "HourCard";
              if (isSelectedRange) {
                baseClass += " HourSelectedCard";
              }
              //   if (v == "ex") {
              //     baseClass = "HourShiftCard";
              //   }
              const colorClass = i % 2 == 0 ? "HourCardEven" : "HourCardOdd";
              const w = SLOT_ITEM_WIDTH;
              return (
                <div
                  key={v}
                  className={baseClass + " " + colorClass}
                  style={{
                    left: w * i + "px",
                    width: w + "px",
                    top: "0px",
                  }}
                >
                  <p className="HourValue">{timeFormat} </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
