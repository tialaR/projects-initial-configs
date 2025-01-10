import { Icon } from '#components/Icon';
import { useState } from 'react';
import * as S from './styles';

type InputFileUploadProps = {
    onFileChange: (file: File) => void;
    placeholder?: string;
    accept?: string;
};

const InputFileUpload: React.FC<InputFileUploadProps> = ({
    onFileChange,
    placeholder = 'Adicione o arquivo aqui ou arraste para esta área.',
    accept = '*/*',
}) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        if (file) {
            console.log('Arquivo selecionado:', file);
            setFileName(file.name);
            onFileChange(file);
        } else {
            console.warn('Nenhum arquivo selecionado.');
        }
    };

    return (
        <S.CustomFileInputWrapper htmlFor="file-upload">
            <S.HiddenFileInput
                id="file-upload"
                type="file"
                accept={accept}
                multiple={false}
                onChange={handleFileChange}
            />
            <span>{fileName || placeholder}</span>
            <Icon name="upload" size={24} />
        </S.CustomFileInputWrapper>
    );
};

export { InputFileUpload };
