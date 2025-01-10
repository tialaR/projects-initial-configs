import { Button } from "#components/Button";
import { Icon } from "#components/Icon";
import { InputFileUpload } from "#components/InputFileUpload";
import { useState, useEffect } from "react";
import * as S from "./styles";
import { ErrorMessage } from "#styles/components";

type InsertFileProps = {
    existingFile?: File | null;
    onFileSelect: (file: File | null) => void;
};

type FileType = {
    name: string;
    file: File;
};

const InsertFile: React.FC<InsertFileProps> = ({ existingFile, onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (existingFile) {
            setSelectedFile({
                name: existingFile.toString(),
                file: existingFile,
            });
        }
    }, [existingFile]);

    const handleFileChange = (file: File) => {
        if (file.type === "application/pdf") {
            console.log("Arquivo recebido:", file);
            setSelectedFile({
                name: file.name,
                file,
            });
            onFileSelect(file);
            setErrorMessage(null);
        } else {
            setErrorMessage("Somente arquivos PDF são suportados.");
        }
    };

    return (
        <S.Container>
            <S.Wrapper>
                <S.FileInputWrapper>
                    <Icon name="upload" size={60} />
                    <p>Adicione o arquivo abaixo ou arraste aqui.</p>
                    <InputFileUpload
                        placeholder={selectedFile ? selectedFile.name : "Inserir Arquivo"}
                        onFileChange={handleFileChange}
                        accept=".pdf"
                    />
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
