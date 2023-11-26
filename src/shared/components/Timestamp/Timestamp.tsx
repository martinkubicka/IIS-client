import { Tooltip, Typography } from "@mui/joy";
import moment from "moment";

interface TimestampProps {
  includeDate?: boolean;
  includeTime?: boolean;
  relative?: boolean;
  tooltip?: boolean;
  timestamp: Date;
}

export const Timestamp = ({
  includeDate = true,
  includeTime = true,
  timestamp,
  relative,
}: TimestampProps) => {
  const date = moment(timestamp);
  let formattedDate;

  if (relative) {
    if (moment().diff(date, "hours") > 24) {
      formattedDate = date.calendar();
    } else {
      formattedDate = date.fromNow();
    }
  } else if (includeDate && includeTime) {
    formattedDate = date.format("MMMM Do YYYY, h:mm a");
  } else if (includeDate) {
    formattedDate = date.format("MMMM Do YYYY");
  } else {
    formattedDate = date.format("h:mm a");
  }

  return (
    <Tooltip title={date.format("MMMM Do YYYY, h:mm a")}>
      <Typography tabIndex={0} level={"body-xs"}>
        {formattedDate}
      </Typography>
    </Tooltip>
  );
};
