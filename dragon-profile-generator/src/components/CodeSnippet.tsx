import React, { useState, useRef } from 'react';
import { Button, Paper, Typography, IconButton } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

interface CodeSnippetProps {
    code: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code }) => {
    const codeRef = useRef<HTMLPreElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    let formattedCode = code.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/^export default\s*/, '').slice(1, -1);

    // Remove anything after "bottom.png[/img][/center][/font]"
    const indexToRemove = formattedCode.indexOf('bottom.png[/img][/center][/font]');
    if (indexToRemove !== -1) {
        formattedCode = formattedCode.slice(0, indexToRemove + 'bottom.png[/img][/center][/font]'.length);
    }

    const handleCopyClick = () => {
        if (codeRef.current) {
            navigator.clipboard.writeText(formattedCode);
            setIsCopied(true);

            // Reset the "Copied" state after a short delay
            setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '16px', position: 'relative' }}>
            <Typography variant="body2" color="textSecondary">
                Code Snippet
            </Typography>
            <pre ref={codeRef} style={{ margin: '8px 0', whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
                <code dangerouslySetInnerHTML={{ __html: formattedCode }} />
            </pre>
            <Button
                onClick={handleCopyClick}
                variant="outlined"
                color="primary"
                size="small"
                style={{ position: 'absolute', top: '8px', right: '8px' }}
            >
                {isCopied ? 'Copied!' : 'Copy'}
                <IconButton
                    size="small"
                    onClick={handleCopyClick}
                    style={{ marginLeft: '8px', padding: '4px' }}
                >
                    <FileCopyIcon fontSize="small" />
                </IconButton>
            </Button>
        </Paper>
    );
};

export default CodeSnippet;
