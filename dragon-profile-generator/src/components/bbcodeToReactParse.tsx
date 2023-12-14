import React, { ReactNode } from 'react';

interface BBCodeParserProps {
    bbcode: string;
}

const BBCodeParser: React.FC<BBCodeParserProps> = ({ bbcode }) => {
    const parseBBCode = (text: string): ReactNode[] => {
        const elements: ReactNode[] = [];

        // Replace [center] tag
        text = text.replace(/\[center\]([\s\S]*?)\[\/center\]/g, (_, content) => {
            elements.push(<div key={elements.length} style={{ textAlign: 'center' }}>{parseBBCode(content)}</div>);
            return '';
        });

        // Replace [img] tag
        text = text.replace(/\[img\]([^[\]]+?)\[\/img\]/g, (_, src) => {
            elements.push(<img key={elements.length} src={src} alt="BBCode Image" style={{ maxWidth: '100%', height: 'auto' }} />);
            return '';
        });

        // Replace [columns] tag
        text = text.replace(/\[columns\]([\s\S]*?)\[\/columns\]/g, (_, content) => {
            elements.push(<div key={elements.length} style={{ display: 'flex' }}>{parseBBCode(content)}</div>);
            return '';
        });

        // Replace [size] tag
        text = text.replace(/\[size=(\d+)\]([\s\S]*?)\[\/size\]/g, (_, size, content) => {
            elements.push(<span key={elements.length} style={{ fontSize: `${size}px` }}>{parseBBCode(content)}</span>);
            return '';
        });

        // Replace [font] tag
        text = text.replace(/\[font=([^\]]+)\]([\s\S]*?)\[\/font\]/g, (_, font, content) => {
            elements.push(<span key={elements.length} style={{ fontFamily: font }}>{parseBBCode(content)}</span>);
            return '';
        });

        // Replace [b] tag
        text = text.replace(/\[b\]([\s\S]*?)\[\/b\]/g, (_, content) => {
            elements.push(<strong key={elements.length}>{parseBBCode(content)}</strong>);
            return '';
        });

        // Replace [u] tag
        text = text.replace(/\[u\]([\s\S]*?)\[\/u\]/g, (_, content) => {
            elements.push(<u key={elements.length}>{parseBBCode(content)}</u>);
            return '';
        });

        // Replace [i] tag
        text = text.replace(/\[i\]([\s\S]*?)\[\/i\]/g, (_, content) => {
            elements.push(<i key={elements.length}>{parseBBCode(content)}</i>);
            return '';
        });

        // Other replacements...

        return elements;
    };

    const result: ReactNode[] = parseBBCode(bbcode);

    return (
        <div>
            {result}
        </div>

    );
};

export default BBCodeParser;
