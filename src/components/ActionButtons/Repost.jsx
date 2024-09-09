import React, { useReducer } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ActionButton,
  SimpleRepost,
  FilledRepost,
} from "../../../lib/data/Icons"; // Import your icons
import { supabase } from "../../supabaseClient"; // Import Supabase client

const initialState = { reposted: false, repostCount: 0 };

function repostReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_REPOST":
      return {
        ...state,
        reposted: !state.reposted,
        repostCount: state.reposted
          ? state.repostCount - 1
          : state.repostCount + 1,
      };
    case "SET_INITIAL_REPOSTS":
      return {
        ...state,
        reposted: action.payload.reposted,
        repostCount: action.payload.repostCount,
      };
    default:
      return state;
  }
}

export default function Repost({ postId, userId, userName }) {
  const [state, dispatch] = useReducer(repostReducer, initialState);
  const queryClient = useQueryClient();

  // Fetch the post's repost count and user repost status together
  const { isLoading, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const { data: postData, error } = await supabase
        .from("posts")
        .select("repost_count")
        .eq("post_id", postId)
        .single();
      if (error) throw new Error(error.message);

      const { data: repostData, error: repostError } = await supabase
        .from("reposts")
        .select("*")
        .eq("post_id", postId)
        .eq("reposter_id", userId)
        .single();

      if (repostError && repostError.message !== "Row not found") {
        throw new Error(repostError.message);
      }

      return {
        repostCount: postData.repost_count || 0,
        reposted: !!repostData,
      };
    },
    onSuccess: (data) => {
      dispatch({
        type: "SET_INITIAL_REPOSTS",
        payload: {
          reposted: data.reposted,
          repostCount: data.repostCount,
        },
      });
    },
  });

  const repostMutation = useMutation({
    mutationFn: async () => {
      if (!state.reposted) {
        const { error: repostRecordError } = await supabase
          .from("reposts")
          .insert({
            post_id: postId,
            reposter_id: userId,
            userName: userName,
          });

        const { error: countError } = await supabase
          .from("posts")
          .update({ repost_count: state.repostCount + 1 })
          .eq("post_id", postId);

        if (repostRecordError || countError) {
          throw new Error(repostRecordError?.message || countError?.message);
        }
      } else {
        const { error: repostError } = await supabase
          .from("reposts")
          .delete()
          .eq("post_id", postId)
          .eq("reposter_id", userId);

        const { error: countError } = await supabase
          .from("posts")
          .update({ repost_count: state.repostCount - 1 })
          .eq("post_id", postId);

        if (repostError || countError) {
          throw new Error(repostError?.message || countError?.message);
        }
      }
    },
    onSuccess: () => {
      dispatch({ type: "TOGGLE_REPOST" });
      queryClient.invalidateQueries(["post", postId]);
      queryClient.invalidateQueries("feed"); // Invalidate the feed query to update the feed
    },
  });

  const handleRepostClick = () => {
    repostMutation.mutate();
  };

  return (
    <div onClick={handleRepostClick}>
      <ActionButton
        Icon={state.reposted ? FilledRepost : SimpleRepost}
        info={state.repostCount > 0 ? state.repostCount : ""}
        style={{ color: state.reposted ? "green" : "inherit" }}
      />
    </div>
  );
}
