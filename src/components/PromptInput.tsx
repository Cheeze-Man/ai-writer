import { Button, Input } from "antd";
import { useState } from "react";
import { Title } from "./CommonStyles";
import styled from "styled-components";

type Props = {
  isLoading?: boolean;
  onSubmit?: (userInput: string) => void;
  messageApi: any;
};

const { TextArea } = Input;

const PromptInput = ({ isLoading, onSubmit, messageApi }: Props) => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };
  const handleClick = () => {
    if (onSubmit) {
      if (!userInput) {
        messageApi.open({
          type: "error",
          content: "오늘 있었던 일을 적어주세요 :)",
          duration: 3,
        });
        return;
      }
      messageApi.open({
        type: "success",
        content: "Memoir AI가 요청을 접수했어요!",
        duration: 3,
      });
      onSubmit(userInput);
      setUserInput("");
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <Title style={{ fontWeight: "700", color: "#3f3f46 " }}>
        오늘 있었던 일을 아래에 적어주세요😊
      </Title>
      <TextArea
        value={userInput}
        onChange={handleInputChange}
        placeholder="오늘 일어난 일들을 간단히 적어주세요."
        autoSize={{ minRows: 10, maxRows: 20 }}
        style={{ padding: "1rem" }}
      />
      <ButtonContainer>
        <Button loading={isLoading} onClick={handleClick}>
          내 하루를 분석해줘!
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default PromptInput;

const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
`;
