import FormattedPostText from "../FormattedPostText";

interface CommentContentProps {
  commentText: string;
}

export default function CommentContent(props: CommentContentProps) {
  return (
    <div className="flex flex-col w-1/1">
      <p className="text-sm text-wrap text-charcoalBlack mx-4.5">
        <FormattedPostText
          text={props.commentText}
          taggedUsers={[]}
          taggedCompanies={[]}
        />
      </p>
    </div>
  );
}
