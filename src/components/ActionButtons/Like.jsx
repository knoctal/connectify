import { supabase } from "../../supabaseClient";
import React, { useReducer, useCallback, useEffect } from "react";
import { RedHeart, HeartOutline, ActionButton } from "../../../lib/data/Icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const initialState = {
  liked: false,
  count: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LIKE_STATE":
      return {
        liked: action.payload.liked,
        count: action.payload.count,
      };
    case "UPDATE_LIKE_COUNT":
      return {
        ...state,
        count: action.payload.count,
      };
    default:
      return state;
  }
};
const fetchLikeData = async (postId) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { liked: false, count: 0 };

  const { data: likeData, error: likeError } = await supabase
    .from("likes")
    .select("id")
    .eq("userLiked_id", user.id)
    .eq("postLiked_id", postId)
    .maybeSingle();

  if (likeError) console.error("Error fetching like data:", likeError);

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("like_count")
    .eq("post_id", postId)
    .single();

  if (postError) console.error("Error fetching post data:", postError);

  return {
    liked: !!likeData,
    count: postData?.like_count || 0,
  };
};

const updateLikeStatus = async ({ postId, liked }) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("User not authenticated");

  const { data: userDetails, error: userDetailsError } = await supabase
    .from("usersDetails")
    .select("user_name, profile_url")
    .eq("user_id", user.id)
    .single();

  if (userDetailsError) throw new Error("Error fetching user details");

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("like_count, user_id")
    .eq("post_id", postId)
    .single();

  if (postError) throw new Error("Error fetching post data");

  let updatedLikeCount;

  if (liked) {
    await supabase
      .from("likes")
      .delete()
      .eq("userLiked_id", user.id)
      .eq("postLiked_id", postId);

    updatedLikeCount = Math.max(postData.like_count - 1, 0);
  } else {
    await supabase.from("likes").insert({
      postLiked_id: postId,
      userLiked_id: user.id,
    });

    updatedLikeCount = postData.like_count + 1;

    await supabase.from("notifications").insert({
      user_id: postData.user_id,
      post_id: postId,
      type: "like",
      message: `${userDetails.user_name} liked your post`,
      profile_url: userDetails.profile_url,
    });
  }
  await supabase
    .from("posts")
    .update({ like_count: updatedLikeCount })
    .eq("post_id", postId);

  return { liked: !liked, count: updatedLikeCount };
};

export default function Like({ postId }) {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["likeData", postId],
    queryFn: () => fetchLikeData(postId),
    onSuccess: (data) => {
      dispatch({ type: "SET_LIKE_STATE", payload: data });
    },
    refetchOnWindowFocus: false,
  });

  // Mutation for liking/disliking the post
  const { mutate } = useMutation({
    mutationFn: ({ postId, liked }) => updateLikeStatus({ postId, liked }),
    onMutate: async ({ liked }) => {
      dispatch({
        type: "SET_LIKE_STATE",
        payload: {
          liked: !liked,
          count: state.count + (liked ? -1 : 1),
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likeData", postId] });
    },
    onError: (error, { liked }) => {
      dispatch({
        type: "SET_LIKE_STATE",
        payload: { liked, count: state.count },
      });
      console.error("Error updating like status:", error.message);
    },
  });

  const handleLikeClick = useCallback(() => {
    mutate({ postId, liked: state.liked });
  }, [state.liked, postId, mutate]);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_LIKE_STATE", payload: data });
    }
  }, [data]);

  return (
    <div
      onClick={handleLikeClick}
      className="flex items-center w-fit hover:bg-stone-300 cursor-pointer dark:hover:bg-slate-900 rounded-full p-1"
    >
      <ActionButton
        Icon={state.liked ? RedHeart : HeartOutline}
        info={state.count > 0 ? state.count : ""}
      />
    </div>
  );
}
