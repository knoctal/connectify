// import React, { useReducer, useEffect } from "react";
// import { RedHeart, HeartOutline, ActionButton } from "../../../lib/data/Icons";
// import { supabase } from "../../supabaseClient";

// const initialState = {
//   liked: false,
//   count: 0,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "TOGGLE_LIKE":
//       return {
//         ...state,
//         liked: !state.liked,
//         count: state.liked ? Math.max(state.count - 1, 0) : state.count + 1,
//       };
//     case "SET_LIKE_STATE":
//       return {
//         ...state,
//         liked: action.payload.liked,
//         count: action.payload.count,
//       };
//     default:
//       return state;
//   }
// };

// export default function Like({ postId }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     const fetchLikeData = async () => {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();
//       if (userError || !user) return;

//       try {
//         // Fetch the like state for the specific post and user
//         const { data: likeData, error: likeError } = await supabase
//           .from("likes")
//           .select("id")
//           .eq("userLiked_id", user.id)
//           .eq("postLiked_id", postId)
//           .maybeSingle(); // Using single() to get one row, will throw error if multiple rows

//         // Fetch the like count from the posts table
//         const { data: postData, error: postError } = await supabase
//           .from("posts")
//           .select("like_count")
//           .eq("post_id", postId)
//           .single();

//         if (postData) {
//           dispatch({
//             type: "SET_LIKE_STATE",
//             payload: {
//               liked: !!likeData,
//               count: postData.like_count,
//             },
//           });
//         }

//         if (likeError) {
//           if (likeError.message.includes("multiple rows")) {
//             // Handle multiple rows case
//             console.log("Multiple rows returned. Handling accordingly.");
//             dispatch({
//               type: "SET_LIKE_STATE",
//               payload: {
//                 liked: false,
//                 count: postData.like_count || 0,
//               },
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching like data:", error.message);
//       }
//     };

//     fetchLikeData();
//   }, [postId]);

//   const handleLikeClick = async () => {
//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();
//     if (userError || !user) return;

//     const { data: likeData, error: likeError } = await supabase
//       .from("likes")
//       .select("id")
//       .eq("userLiked_id", user.id)
//       .eq("postLiked_id", postId)
//       .maybeSingle();

//     // Fetch the current like count
//     const { data: postData, error: postError } = await supabase
//       .from("posts")
//       .select("like_count")
//       .eq("post_id", postId)
//       .single();

//     if (postError || !postData) {
//       console.log("Error fetching post data:", postError?.message);
//       return;
//     }

//     let updatedLikeCount = postData.like_count;

//     if (likeData) {
//       // If the like exists, remove it and decrement the like count
//       const { error: deleteError } = await supabase
//         .from("likes")
//         .delete()
//         .eq("id", likeData.id);

//       if (deleteError) {
//         console.log("Error removing like:", deleteError.message);
//       } else {
//         console.log("Like removed");
//         updatedLikeCount -= 1;
//       }
//     } else {
//       // If the like doesn't exist, add it and increment the like count
//       const { error: insertError } = await supabase.from("likes").insert({
//         postLiked_id: postId,
//         userLiked_id: user.id,
//       });

//       if (insertError) {
//         console.log("Error adding like:", insertError.message);
//       } else {
//         console.log("Like added");
//         updatedLikeCount += 1;
//       }
//     }

//     // Update the like count in the posts table
//     const { error: updateError } = await supabase
//       .from("posts")
//       .update({ like_count: updatedLikeCount })
//       .eq("post_id", postId);

//     if (updateError) {
//       console.log("Error updating like count:", updateError.message);
//     } else {
//       dispatch({
//         type: "SET_LIKE_STATE",
//         payload: { liked: !state.liked, count: updatedLikeCount },
//       });
//     }
//   };

//   return (
//     <div onClick={handleLikeClick} style={{ cursor: "pointer" }}>
//       <ActionButton
//         Icon={state.liked ? RedHeart : HeartOutline}
//         info={state.count}
//       />
//     </div>
//   );
// }

import React, { useReducer, useCallback } from "react";
import { RedHeart, HeartOutline, ActionButton } from "../../../lib/data/Icons";
import { supabase } from "../../supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const initialState = {
  liked: false,
  count: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LIKE":
      return {
        ...state,
        liked: !state.liked,
        count:
          state.liked && state.count > 0 ? state.count - 1 : state.count + 1,
      };
    case "SET_LIKE_STATE":
      return {
        ...state,
        liked: action.payload.liked,
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

  const { data: likeData } = await supabase
    .from("likes")
    .select("id")
    .eq("userLiked_id", user.id)
    .eq("postLiked_id", postId)
    .maybeSingle();

  const { data: postData } = await supabase
    .from("posts")
    .select("like_count")
    .eq("post_id", postId)
    .single();

  return {
    liked: !!likeData,
    count: postData?.like_count || 0,
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
  const { data: postData } = await supabase
    .from("posts")
    .select("like_count")
    .eq("post_id", postId)
    .single();

  let updatedLikeCount;

  if (liked) {
    // Remove the like
    await supabase
      .from("likes")
      .delete()
      .eq("userLiked_id", user.id)
      .eq("postLiked_id", postId);

    // Ensure the like count doesn't go below 0
    updatedLikeCount = Math.max(postData.like_count - 1, 0);
  } else {
    // Add the like
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

  const { data } = useQuery({
    queryKey: ["likeData", postId],
    queryFn: () => fetchLikeData(postId),
    onSuccess: (data) => dispatch({ type: "SET_LIKE_STATE", payload: data }),
  });

  const { mutate } = useMutation({
    mutationFn: ({ postId, liked }) => updateLikeStatus({ postId, liked }),
    onSuccess: (data) => {
      dispatch({ type: "SET_LIKE_STATE", payload: data });
      queryClient.invalidateQueries({ queryKey: ["likeData", postId] });
    },
    onError: (error) => {
      console.error("Error updating like status:", error.message);
    },
  });

  const handleLikeClick = useCallback(() => {
    // Optimistically update the UI
    dispatch({ type: "TOGGLE_LIKE" });

    // Perform the mutation
    mutate({ postId, liked: state.liked });
  }, [state.liked, postId, mutate]);

  return (
    <div onClick={handleLikeClick} style={{ cursor: "pointer" }}>
      <ActionButton
        Icon={state.liked ? RedHeart : HeartOutline}
        info={state.count}
      />
    </div>
  );
}
