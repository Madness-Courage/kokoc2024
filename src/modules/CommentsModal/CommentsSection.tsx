import React from 'react';
import styles from './CommentsSection.module.css';
import avatarPlaceholder from '../../assets/images/placeholder_3.png';

interface Comment {
    author: string;
    text: string;
    created_at: string;
    avatar?: string;
}

interface CommentsSectionProps {
    comments: Comment[];
    isAuthenticated: boolean;
    onCommentTextChange: (text: string) => void;
    onCommentSubmit: () => void;
    commentText: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
                                                             comments,
                                                             isAuthenticated,
                                                             onCommentTextChange,
                                                             onCommentSubmit,
                                                             commentText
                                                         }) => {

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onCommentTextChange(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (commentText.trim()) {
            onCommentSubmit();
        }
    };

    return (
        <div className={styles.commentsContainer}>
            <div className={styles.commentsHeader}>
                <h3 className={styles.commentsTitle}>КОММЕНТАРИИ</h3>
                <span className={styles.commentsCount}>{comments.length}</span>
            </div>

            {!isAuthenticated ? (
                <p className={styles.authMessage}>
                    Вы бы могли прокомментировать эту новость, но мы не знаем кто вы, авторизуйтесь, пожалуйста.
                </p>
            ) : (
                <div className={styles.allForm}>
                    <div className={styles.commentForm}>
                        <img
                            src={avatarPlaceholder}
                            alt="User Avatar"
                            className={styles.avatar}
                        />
                        <textarea
                            value={commentText}
                            onChange={handleCommentChange}
                            placeholder="Введите комментарий"
                            className={styles.commentInput}
                        />
                    </div>
                    <button
                        onClick={handleCommentSubmit}
                        className={styles.submitButton}
                    >
                        ОПУБЛИКОВАТЬ
                    </button>
                </div>
            )}

            <div className={styles.commentsList}>
                {comments.map((comment, index) => (
                    <div key={index} className={styles.commentItem}>
                        <div className={styles.commentHeader}>
                            <img src={comment.avatar || avatarPlaceholder} alt="Avatar" className={styles.avatarSmall} />
                            <div>
                                <p className={styles.commentAuthor}>{comment.author}</p>
                                <p className={styles.commentDate}>
                                    {new Date(comment.created_at).toLocaleString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                        <p className={styles.commentText}>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsSection;
