
type Block = {
    id: string;
    type: string;
    data : any;
};

interface Props {
    blocks: Block[];
}

const ParagraphBlock = ({data}: any) => {
    return <p className="mb-4">{data.text}</p>;
}

const ListBlock = ({data}: any) =>{
    return (
        <ul className="list-disc ml-5">
            {data.items.map((item: any, index: number) =>(
                <li key={index}>{item.content}</li>
            ))}
        </ul>
    )
}

const EditorRenderer: React.FC<Props> = ({ blocks}) =>{
    const renderBlock = (block: Block) =>{
        switch(block.type){
            case 'paragraph':
                return <ParagraphBlock key={block.id} data={block.data} />;
            case 'list':
                if(block.data.style === 'unordered'){
                    return <ListBlock key={block.id} data={block.data} />;
                }
            default:
                return <p key={block.id}>Unsupported block type: {block.type}</p>;
        }
    }

    return(
        <div className="prose">
            {blocks.map(renderBlock)}
        </div>
    )
}

export default EditorRenderer;