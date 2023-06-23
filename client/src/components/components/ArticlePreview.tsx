/* This is a small preview of an article */


export interface  ArticlePreviewProps {
    id: number,
    title: string,
    text: string,
}

const ArticlePreview = (props: {args: ArticlePreviewProps}) => {
    const {id, title, text} = props.args;
    return (
        <>
            <div>
                <h1>{title}</h1>
                <div>{text}</div>
            </div>
        </>
    )
}



export default ArticlePreview;