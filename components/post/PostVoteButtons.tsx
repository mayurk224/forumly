"use client";

import { downvote } from "@/action/downvote";
import { upvote } from "@/action/upvote";
import {
  GetPostVotesQueryResult,
  GetUserPostVoteStatusQueryResult,
} from "@/sanity.types";
import { useUser } from "@clerk/nextjs";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useState, useTransition } from "react";

function PostVoteButtons({
  contentId,
  votes,
  vote,
  contentType,
}: {
  contentId: string;
  votes: GetPostVotesQueryResult;
  vote: GetUserPostVoteStatusQueryResult;
  contentType: "post" | "comment";
}) {
  const { user, isSignedIn } = useUser();
  const [isPending, startTransition] = useTransition();

  const [optimisticVotes, setOptimisticVotes] =
    useState<GetUserPostVoteStatusQueryResult>(vote);
  const [optimisticScore, setOptimisticScore] = useState<number>(
    votes.netScore
  );

  const handleUpVote = () => {
    if (!isSignedIn || isPending) return;

    // Calculate score change based on current vote status
    let scoreChange = 0;
    if (optimisticVotes?.voteType === "upvote") {
      // User is canceling their upvote
      scoreChange = -1;
      setOptimisticVotes(null);
    } else if (optimisticVotes?.voteType === "downvote") {
      // User is changing from downvote to upvote (+2 because we remove downvote and add upvote)
      scoreChange = 2;
      setOptimisticVotes({ voteType: "upvote" });
    } else {
      // User is adding a new upvote
      scoreChange = 1;
      setOptimisticVotes({ voteType: "upvote" });
    }

    // Update the score immediately
    setOptimisticScore((prev) => prev + scoreChange);

    // Make the actual API call in transition
    startTransition(async () => {
      try {
        await upvote(contentId, contentType);
      } catch (error) {
        // If there's an error, revert the optimistic updates
        setOptimisticVotes(vote);
        setOptimisticScore(votes.netScore);
        console.error(`Failed to upvote ${contentType}:`, error);
      }
    });
  };

  const handleDownVote = () => {
    if (!isSignedIn || isPending) return;

    // Calculate score change based on current vote status
    let scoreChange = 0;
    if (optimisticVotes?.voteType === "downvote") {
      // User is canceling their downvote
      scoreChange = 1;
      setOptimisticVotes(null);
    } else if (optimisticVotes?.voteType === "upvote") {
      // User is changing from upvote to downvote (-2 because we remove upvote and add downvote)
      scoreChange = -2;
      setOptimisticVotes({ voteType: "downvote" });
    } else {
      // User is adding a new downvote
      scoreChange = -1;
      setOptimisticVotes({ voteType: "downvote" });
    }

    // Update the score immediately
    setOptimisticScore((prev) => prev + scoreChange);

    // Make the actual API call in transition
    startTransition(async () => {
      try {
        await downvote(contentId, contentType);
      } catch (error) {
        // If there's an error, revert the optimistic updates
        setOptimisticVotes(vote);
        setOptimisticScore(votes.netScore);
        console.error(`Failed to downvote ${contentType}:`, error);
      }
    });
  };


  return (
    <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-sm border w-12">
      <button
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
          optimisticVotes?.voteType === "upvote"
            ? "bg-orange-100 text-orange-500"
            : "hover:bg-gray-100 text-gray-400"
        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleUpVote}
        disabled={isPending || !isSignedIn || !user}
        title="Upvote"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <span className="text-sm font-semibold text-gray-700 my-1">
        {optimisticScore}
      </span>

      <button
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
          optimisticVotes?.voteType === "downvote"
            ? "bg-orange-100 text-orange-500"
            : "hover:bg-gray-100 text-gray-400"
        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleDownVote}
        disabled={isPending || !isSignedIn || !user}
        title="Downvote"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </div>
  );
}

export default PostVoteButtons;
