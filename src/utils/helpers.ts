import dayjs from "dayjs";

export const formatTime = (timeString: string): string => {
  return dayjs(timeString).format("HH:mm");
};

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("DD/MM/YYYY HH:mm");
};

export const getFlightStatusColor = (status: string): string => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes("landed") || statusLower.includes("arrived")) {
    return "success";
  } else if (statusLower.includes("cancelled")) {
    return "error";
  } else if (statusLower.includes("delayed")) {
    return "warning";
  } else if (
    statusLower.includes("scheduled") ||
    statusLower.includes("expected")
  ) {
    return "processing";
  } else {
    return "default";
  }
};

export const calculateDuration = (
  departureTime: string,
  arrivalTime: string
): string => {
  const dep = dayjs(departureTime);
  const arr = dayjs(arrivalTime);
  const duration = arr.diff(dep, "minute");
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};
