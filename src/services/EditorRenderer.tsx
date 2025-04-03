

type Block = {
    id: string;
    type: string;
    data: any;
};

interface Props {
    blocks: Block[];
}

const ParagraphBlock = ({ data }: any) => {
    return <p className="mb-4">{data.text === '<br>' ? <br/> : (data.text)}</p>;
};

const ListBlock = ({ data }: any) => {
    if (data.style === "unordered") {
        return (
            <ul className="list-disc ml-5">
                {data.items.map((item: any, index: number) => (
                    <li key={index}>{item.content}</li>
                ))}
            </ul>
        );
    } else {
        return (
            <ol className="list-decimal ml-5">
                {data.items.map((item: any, index: number) => (
                    <li key={index}>{item.content}</li>
                ))}
            </ol>
        );
    }
};

const HeadingBlock = ({ data }: any) => {
    if (data.level === 2) {
        return <p className="text-2xl font-bold">{data.text}</p>;
    } else if (data.level === 3) {
        return <p className="text-xl font-semibold">{data.text}</p>;
    } else {
        return <p className="text-lg font-medium">{data.text}</p>;
    }
};

// **Mapping object for block types**
const blockComponents: Record<string, React.FC<{ data: any }>> = {
    paragraph: ParagraphBlock,
    list: ListBlock,
    header: HeadingBlock,
};

const EditorRenderer: React.FC<Props> = ({ blocks }) => {
    return (
        <div className="prose">
            {blocks.map((block) => {

                const BlockComponent = blockComponents[block.type];

                if (!BlockComponent) {
                    return <p key={block.id}>Unsupported block type: {block.type}</p>;
                }

                return <BlockComponent key={block.id} data={block.data} />;
            })}
        </div>
    );
};

export default EditorRenderer;
