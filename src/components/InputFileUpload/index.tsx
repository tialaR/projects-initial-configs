import { Icon } from '#components/Icon';
import { useState } from 'react';
import styled from 'styled-components';

const CustomFileInputWrapper = styled.div`
  position: relative;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.grayScale.gray500};
  border-radius: 8px;
  padding: 1rem;
  background-color: transparent;
  text-align: center;
  cursor: pointer;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const HiddenFileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

type InputFileUploadProps = {
    onFileChange: (file: File) => void;
    placeholder?: string;
};

const InputFileUpload: React.FC<InputFileUploadProps> = ({
    onFileChange,
    placeholder = 'Adicione o arquivo aqui ou arraste para esta área.',
}) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onFileChange(file);
        }
    };

    return (
        <CustomFileInputWrapper>
            <HiddenFileInput type="file" onChange={handleFileChange} />
            <div>
                {fileName ? (
                    <span>{fileName}</span>
                ) : (
                    <span>{placeholder}</span>
                )}
                <Icon name="upload" size={24} />
            </div>
        </CustomFileInputWrapper>
    );
}

export { InputFileUpload }
