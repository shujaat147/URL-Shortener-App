

interface UrlListProps {
    urls: { original: string; shortened: string }[];
}

const List: React.FC<UrlListProps> = ({ urls }) => {
    return (
        <ul className="list-group">
            {urls.map((url, index) => (
                <li key={index} className="list-group-item">
                    <strong>Original:</strong> {url.original} <br />
                    <strong>Shortened:</strong> {url.shortened}
                </li>
            ))}
        </ul>
    );
};

export default List