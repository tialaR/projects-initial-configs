import { useState, useEffect, useRef } from 'react';
import { Button } from '#components/Button';
import { Icon } from '#components/Icon';
import * as S from './styles';
import { ErrorMessage } from '#styles/components';

type InsertFileProps = {
    existingFile?: File | null;
    loadingFileText?: string;
    finalText?: string;
    onFileSelect: (file: File | null) => void;
};

type FileType = {
    name: string;
    file: File;
};

const InsertFile: React.FC<InsertFileProps> = ({
    existingFile,
    loadingFileText = 'Carregando...',
    finalText = '',
    onFileSelect
}) => {
    const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (existingFile) {
            setSelectedFile({
                name: typeof existingFile === 'string' ? existingFile : existingFile?.name,
                file: existingFile,
            });
        }
    }, [existingFile]);

    const handleFile = (file: File) => {
        if (file.type === 'application/pdf') {
            setSelectedFile({ name: file.name, file });
            onFileSelect(file);
            setErrorMessage(null);
        } else {
            setErrorMessage('Somente arquivos PDF são suportados.');
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);
        const file = event.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const triggerFileInput = () => {
        inputRef.current?.click();
    };

    return (
        <S.Container>
            <S.Wrapper>
                <S.FileInputWrapper
                    onClick={triggerFileInput}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    isDragOver={isDragOver}
                >
                    <div>
                        <Icon name="upload" size={48} />
                        <p>Adicione o arquivo abaixo ou arraste aqui.</p>
                    </div>

                    <S.CustomFileInputWrapper onClick={(e) => e.stopPropagation()}>
                        <S.HiddenFileInput
                            ref={inputRef}
                            type="file"
                            accept="*/*"
                            onChange={handleFileChange}
                        />
                        <span>{selectedFile?.name || loadingFileText || finalText}</span>
                        <Icon name="upload" size={24} />
                    </S.CustomFileInputWrapper>
                </S.FileInputWrapper>

                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

                <S.Footer>
                    <Button variant="primary-outline" disabled>
                        Pré-visualizar
                    </Button>
                </S.Footer>
            </S.Wrapper>
        </S.Container>
    );
};

export { InsertFile };
