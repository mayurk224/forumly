import { Loader2 } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );
}

export default Loading;
