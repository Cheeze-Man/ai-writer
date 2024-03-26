import { useState } from "react";
import { callGPT } from "./api/gpt";
import PromptInput from "./components/PromptInput";
import styled from "styled-components";
import logo from "./assets/logo.png";
import MemoirDisplay from "./components/MemoirDisplay";
import { message } from "antd";

const dummyData = JSON.parse(
  `{ "title": "",
    "thumbnail": "",
    "summary": "",
    "emotional_content": "",
    "emotional_result": "",
    "analysis": "",
    "action_list": [""] }`
);

function App() {
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickAPICall = async (userInput: string) => {
    try {
      setIsLoading(true);
      const message = await callGPT({
        prompt: `${userInput}`,
      });
      setData(JSON.parse(message));
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "알 수 없는 에러가 발생했습니다.",
        duration: 3,
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (userInput: string) => {
    handleClickAPICall(userInput);
  };

  return (
    <AppContainer>
      {contextHolder}
      <AppTitle>
        chat GPT 일기장, Memoir AI <img width={"300rem"} src={logo} />
      </AppTitle>
      <PromptInput
        messageApi={messageApi}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
      <MemoirDisplay data={data} isLoading={isLoading} />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`;

const AppTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  font-family: "Noto Sans KR";
  font-weight: 700;
  letter-spacing: -0.75px;
  color: #3f3f46;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;
`;
