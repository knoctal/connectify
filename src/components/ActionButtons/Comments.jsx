import { Comment, ActionButton } from "../../../lib/data/Icons";

export default function Comments({ postId }) {
  return (
    <div style={{ cursor: "pointer" }}>
      <ActionButton Icon={Comment} />
    </div>
  );
}
