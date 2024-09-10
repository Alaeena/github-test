export const LeftButton = ({ className, onClick }) => (
    <svg className={className} onClick={onClick} enableBackground="new 0 0 13 20" viewBox="0 0 13 20" role="img">
        <path stroke="none" d="m4.2 10l7.9-7.9-2.1-2.2-9 9-1.1 1.1 1.1 1 9 9 2.1-2.1z"></path>
    </svg>
);
export const RightButton = ({ className, onClick }) => (
    <svg enableBackground="new 0 0 13 21" onClick={onClick} viewBox="0 0 13 21" role="img" className={className}>
        <path stroke="none" d="m11.1 9.9l-9-9-2.2 2.2 8 7.9-8 7.9 2.2 2.1 9-9 1-1z"></path>
    </svg>
);
