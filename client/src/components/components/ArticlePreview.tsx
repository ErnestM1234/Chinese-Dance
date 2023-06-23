/* This is a small preview of an article */
import { useNavigate } from 'react-router-dom';



export interface  ArticlePreviewProps {
    id: number,
    title: string,
    text: string,
}

const ArticlePreview = (props: {args: ArticlePreviewProps}) => {
    const navigate = useNavigate();
    const {id, title, text} = props.args;
    return (
        <>
            <div onClick={() => navigate(`/article?id=${id}`)}>
                <h1>{title}</h1>
                <div>{text}</div>
            </div>
        </>
    )
}



export default ArticlePreview;