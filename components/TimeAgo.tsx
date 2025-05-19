"use client";

import TimeAgoComponent from "react-timeago";

export default function TimeAgo({ date }: { date: Date }) {
  return <TimeAgoComponent date={date} />;
}
