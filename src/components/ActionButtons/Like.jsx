import React, { useReducer, useCallback, useEffect } from "react";
import { RedHeart, HeartOutline, ActionButton } from "../../../lib/data/Icons";
import { supabase } from "../../supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Initial state
const initialState = {
  liked: false, // Whether the user has liked the post
  count: 0, // Total like count of the post
};

// Reducer function to manage state
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

// Fetch the like data for a specific post and user
const fetchLikeData = async (postId) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { liked: false, count: 0 };

  // Check if the user has liked the post
  const { data: likeData, error: likeError } = await supabase
    .from("likes")
    .select("id")
    .eq("userLiked_id", user.id)
    .eq("postLiked_id", postId)
    .maybeSingle();

  if (likeError) console.error("Error fetching like data:", likeError);

  // Fetch the current like count of the post
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("like_count")
    .eq("post_id", postId)
    .single();

  if (postError) console.error("Error fetching post data:", postError);

  console.log("Fetched like data:", {
    liked: !!likeData,
    count: postData?.like_count || 0,
  });

  return {
    liked: !!likeData, // If likeData exists, the user has liked the post
    count: postData?.like_count || 0, // Set count to the current post's like count
  };
};

// Update like status and post like count
const updateLikeStatus = async ({ postId, liked }) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("User not authenticated");

  // Fetch the current like count
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("like_count")
    .eq("post_id", postId)
    .single();

  if (postError) throw new Error("Error fetching post count");

  let updatedLikeCount;

  if (liked) {
    // User is removing the like
    await supabase
      .from("likes")
      .delete()
      .eq("userLiked_id", user.id)
      .eq("postLiked_id", postId);

    updatedLikeCount = Math.max(postData.like_count - 1, 0);
  } else {
    // User is liking the post
    await supabase.from("likes").insert({
      postLiked_id: postId,
      userLiked_id: user.id,
    });

    updatedLikeCount = postData.like_count + 1;
  }

  // Update the like count in the posts table
  await supabase
    .from("posts")
    .update({ like_count: updatedLikeCount })
    .eq("post_id", postId);

  return { liked: !liked, count: updatedLikeCount };
};

export default function Like({ postId }) {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch the initial like data on component mount or refresh
  const { data, isError, isLoading } = useQuery({
    queryKey: ["likeData", postId],
    queryFn: () => fetchLikeData(postId),
    onSuccess: (data) => {
      // Ensure state is updated after fetching
      dispatch({ type: "SET_LIKE_STATE", payload: data });
    },
    refetchOnWindowFocus: false, // Avoid unnecessary refetching
  });

  // Mutation for liking/disliking the post
  const { mutate } = useMutation({
    mutationFn: ({ postId, liked }) => updateLikeStatus({ postId, liked }),
    onMutate: async ({ liked }) => {
      // Optimistically update UI before server response
      dispatch({
        type: "SET_LIKE_STATE",
        payload: {
          liked: !liked, // Toggle the liked state
          count: state.count + (liked ? -1 : 1), // Decrease count if currently liked, otherwise increase
        },
      });
    },
    onSuccess: () => {
      // Refetch the data to ensure it's up-to-date
      queryClient.invalidateQueries({ queryKey: ["likeData", postId] });
    },
    onError: (error, { liked }) => {
      // Rollback on error
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
    <div onClick={handleLikeClick} style={{ cursor: "pointer" }}>
      <ActionButton
        Icon={state.liked ? RedHeart : HeartOutline}
        info={state.count > 0 ? state.count : ""}
      />
    </div>
  );
}
