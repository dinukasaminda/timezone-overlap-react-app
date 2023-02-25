import React, { useEffect, useState } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Add, AddIcCallOutlined } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { ICountryItem, ICountryMap } from "./types";
import { CountryItem } from "./CountryItem";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const availableTimeZones = [
  "Pacific/Auckland",
  "Asia/Colombo",
  "US/Central",
  "Hongkong",
  "Europe/London",
  "Europe/Moscow",
];

function App() {
  const [selectedTimeZone, SetTimeZone] = useState<string>("US/Central");
  const [baseTimeZoneItem, setBaseTimeZoneItem] = useState<any>(null);
  const [itemMap, setItemMap] = useState<ICountryMap>({
    "0": {
      timezone: "Asia/Colombo",
      start_time: "08:00",
      end_time: "16:00",
      is_base_timezone: true,
    },
    "1": {
      timezone: "US/Central",
      start_time: "08:00",
      end_time: "16:00",
      is_base_timezone: false,
    },
    "2": {
      timezone: "Europe/London",
      start_time: "08:00",
      end_time: "16:00",
      is_base_timezone: false,
    },
    "3": {
      timezone: "Pacific/Auckland",
      start_time: "08:00",
      end_time: "16:00",
      is_base_timezone: false,
    },
  });
  const [itemList, setItemList] = useState<ICountryItem[]>([]);

  const [startTime, setStartTime] = React.useState<Dayjs | null>(
    dayjs("2023-02-25T08:00:00")
  );
  const [endTime, setEndTime] = React.useState<Dayjs | null>(
    dayjs("2023-02-25T16:00:00")
  );
  const handleStartTimeChange = (newValue: Dayjs | null) => {
    setStartTime(newValue);
  };
  const handleEndTimeChange = (newValue: Dayjs | null) => {
    setEndTime(newValue);
  };

  useEffect(() => {
    const items: ICountryItem[] = [];
    Object.keys(itemMap).forEach((key) => {
      const item = itemMap[key];
      items.push(item);
      if (item.is_base_timezone) {
        setBaseTimeZoneItem(item);
      }
    });
    setItemList(items);
  }, [itemMap]);
  return (
    <div className="App">
      <Stack direction="row" spacing={2} justifyContent="end">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={handleStartTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="End Time"
            value={endTime}
            onChange={handleEndTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormControl style={{ minWidth: "200px" }}>
          <InputLabel id="demo-simple-select-label">Timezone</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTimeZone}
            label="Timezone"
            onChange={(event) => {
              SetTimeZone(event.target.value);
            }}
          >
            {availableTimeZones.map((timeZone) => {
              return (
                <MenuItem key={"tz" + timeZone} value={timeZone}>
                  {timeZone}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button variant="outlined" endIcon={<Add />}>
          Add
        </Button>
      </Stack>
      <div>
        {itemList.map((item) => {
          return (
            <CountryItem
              key={"tzcard" + item.timezone}
              countryItem={item}
              baseCountryItem={baseTimeZoneItem}
            ></CountryItem>
          );
        })}
      </div>
      <div className="footer">
        Made by
        <a href="https://www.facebook.com/DinukaSaminda/">Dinuka Bandara</a>
      </div>
    </div>
  );
}

export default App;
