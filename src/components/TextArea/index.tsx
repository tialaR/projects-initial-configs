import { useState, useRef, useEffect, TextareaHTMLAttributes } from 'react';
import * as S from './styles';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    onChange: (value: string) => void;
    width?: string | number;
    label?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ onChange, width = '', label = '', ...rest }) => {
    const [content, setContent] = useState<string>('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [content]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setContent(newValue);
        onChange(newValue);
    };

    return (
        <>
            {label && <S.Label>{label}</S.Label>}
            <S.TextAreaWrapper width={width}>
                <S.TextArea ref={textAreaRef} value={content} onChange={handleChange} {...rest} />
            </S.TextAreaWrapper>
        </>
    );
};

export { TextArea };
