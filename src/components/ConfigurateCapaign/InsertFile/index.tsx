import { Button } from "#components/Button";
import { Icon } from "#components/Icon";
import { InputFileUpload } from "#components/InputFileUpload";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: transparent;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.colors.primary.purple100};
  border-radius: 8px;
  padding: 2rem 2rem 3rem 2rem;
  text-align: center;
  margin-bottom: 1.5rem;

  p {
    display: flex;
    font-size: ${({ theme }) => theme.typography.title.t18.size};
    font-size: ${({ theme }) => theme.typography.title.t18.semiBold};
    color: ${({ theme }) => theme.colors.grayScale.gray900};
    margin-bottom: 1rem;
  }
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
`;

const InsertFile = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (file: string | File) => {
        if (file instanceof File) {
            setSelectedFile(file);
            console.log('Arquivo selecionado:', file.name);
        } else {
            console.log('Texto:', file);
        }
    };

    console.log(selectedFile);

    return (
        <Container>
            <Wrapper>
                <FileInputWrapper>
                    <Icon name="upload" size={60} />
                    <p>Adicione o arquivo abaixo ou arraste aqui.</p>
                    <InputFileUpload placeholder="Inserir Arquivo" onFileChange={handleFileChange} />
                </FileInputWrapper>
                <Footer>
                    <Button variant="primary-outline" onClick={() => { }}>Pré-visualizar</Button>
                </Footer>
            </Wrapper>
        </Container>
    );
}
export { InsertFile }