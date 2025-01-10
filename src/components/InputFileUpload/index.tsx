import { Icon } from '#components/Icon';
import { useState } from 'react';
import styled from 'styled-components';

const CustomFileInputWrapper = styled.label`
  position: relative;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.grayScale.gray500};
  border-radius: 8px;
  padding: 1rem;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

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
        <CustomFileInputWrapper htmlFor="file-upload">
            <HiddenFileInput
                id="file-upload"
                type="file"
                accept={accept}
                multiple={false}
                onChange={handleFileChange}
            />
            <span>{fileName || placeholder}</span>
            <Icon name="upload" size={24} />
        </CustomFileInputWrapper>
    );
};

export { InputFileUpload };
