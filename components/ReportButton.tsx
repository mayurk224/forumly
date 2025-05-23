"use client";

import { reportContent } from "@/action/reportContent";
import { useUser } from "@clerk/nextjs";
import { Flag } from "lucide-react";
import { useState } from "react";

interface ReportButtonProps {
  contentId: string;
  reported: boolean;
}

function ReportButton({ contentId, reported }: ReportButtonProps) {
  const [isReported, setIsReported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useUser();

  const handleReport = async () => {
    if (isReported || isLoading || !isSignedIn) return;
    setIsLoading(true);

    try {
      const response = await reportContent(contentId);

      if (response?.error) {
        console.error("Error reporting content:", response.error);
        return; // exit without setting `isReported`
      }

      setIsReported(true);
    } catch (error) {
      console.error("Error reporting content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      aria-label={isReported ? "Content reported" : "Report content"}
      className={`flex items-center gap-1.5 font-medium text-gray-500 hover:text-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        isReported || reported ? "text-red-500" : ""
      } `}
      onClick={handleReport}
      disabled={!isSignedIn || isLoading || isReported || reported}
    >
      <Flag
        className={`size-4 ${isReported || reported ? "fill-red-500" : ""}`}
      />
      <span className="hidden sm:block">
        {isReported || reported
          ? "Reported"
          : isSignedIn
          ? "Report"
          : "Sign in to report"}
      </span>
    </button>
  );
}

export default ReportButton;
