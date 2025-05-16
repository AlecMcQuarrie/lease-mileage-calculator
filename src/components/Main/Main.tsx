import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export default function Main() {
  console.log("component rendered");
  const [milesLimit, setMilesLimit] = useState<number>();
  const [currentMileage, setCurrentMileage] = useState<number>();
  const [startDate, setStartDate] = useState<string>();
  const [milesPerDay, setMilesPerDay] = useState<number>();
  const [calculatedMileageByDays, setCalculatedMileageByDays] =
    useState<number>();
  const [recommendedMaxMilesByNow, setRecommendedMaxMilesByNow] =
    useState<number>();
  const [daysSinceLeaseStart, setDaysSinceLeaseStart] = useState<number>();

  const updateValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    callback: Dispatch<SetStateAction<any>>
  ) => {
    callback(event.target.value);
  };

  const calculateDisabled = () =>
    !Boolean(milesLimit && currentMileage && startDate);

  const calculateLeaseMileageUsage = () => {
    if (milesLimit && currentMileage && startDate) {
      const now = new Date();
      setDaysSinceLeaseStart(
        Math.floor(
          (now.getTime() - new Date(startDate as string).getTime()) / 86400000
        )
      );
      setMilesPerDay(milesLimit / 365);
    }
  };

  useEffect(() => {
    if (currentMileage && daysSinceLeaseStart && milesPerDay) {
      setCalculatedMileageByDays(currentMileage / daysSinceLeaseStart);
      setRecommendedMaxMilesByNow(milesPerDay * daysSinceLeaseStart);
    }
  }, [daysSinceLeaseStart, currentMileage, milesPerDay]);

  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-around"}
        width={"100%"}
        padding={"24px"}
        sx={{ backgroundColor: "white" }}
      >
        <TextField
          label="Annual Lease Mileage Limit"
          type="number"
          variant="outlined"
          onChange={(e) => updateValue(e, setMilesLimit)}
        ></TextField>
        <TextField
          label="Current Mileage"
          type="number"
          variant="outlined"
          onChange={(e) => updateValue(e, setCurrentMileage)}
        ></TextField>
        <TextField
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          type="date"
          onChange={(e) => updateValue(e, setStartDate)}
        ></TextField>
        <Button
          disabled={calculateDisabled()}
          onClick={calculateLeaseMileageUsage}
          variant="contained"
        >
          Calculate
        </Button>
      </Stack>
      <Divider />
      <Stack
        flexDirection={"row"}
        justifyContent={"space-around"}
        width={"100%"}
        padding={"24px"}
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Typography variant="body1">
          Days since lease started: {daysSinceLeaseStart}
        </Typography>
        <Typography variant="body1">
          Recommended miles per day (on average): {Math.floor(milesPerDay || 0)}
        </Typography>
      </Stack>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-around"}
        width={"100%"}
        padding={"24px"}
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Typography variant="body1">
          Your mileage: {currentMileage}. If you used the recommended Miles per
          day: {Math.floor(recommendedMaxMilesByNow || 0)}.
        </Typography>
        <Typography variant="body1">
          Your mileage per day (on average):{" "}
          {Math.floor(calculatedMileageByDays || 0)}
        </Typography>
      </Stack>
    </>
  );
}
