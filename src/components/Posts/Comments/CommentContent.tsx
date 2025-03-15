interface CommentContentProps {
    commentText: string;
}

export default function CommentContent(props : CommentContentProps) {
    return (
        <div className="flex flex-col w-1/1">
            <p className="text-sm text-charcoalBlack mx-4.5">{props.commentText}</p>
        </div>
    )
}