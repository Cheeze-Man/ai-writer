import { useState } from "react";
import { callGPT } from "./api/gpt";
import PromptInput from "./components/PromptInput";

const dummyData = JSON.parse(
  `{ "title": "개발 고민과 해결",
    "thumbnail": "https://source.unsplash.com/1600x900/?coding",
    "summary": "코딩 강의를 듣고 프로젝트에 버그가 발생했지만 해결하지 못하여 GPT를 통해 문제를 해결했음",
    "emotional_content": "오늘 코딩 강의를 들었는데, 프로젝트에 버그가 많이 나왔어. 스택오버플로에서 검색해봤지만 해결되지 않았어. 그래서 결국 GPT를 통해서 문제를 해결하게 되었어. 하지만 이렇게 해결하는 것이 내 개발 실력에 도움이 될까 고민이 되는군.",
    "emotional_result": "이번 상황을 통해 내가 프로그래밍에 대해 더 배울 필요가 있음을 느꼈다. 버그를 해결하는 데에만 의존하는 것보다 개념적으로 이해하고 해결하는 것이 더 중요하다는 것을 깨달았다.",
    "analysis": "이번 상황은 개발자로서 성장하는 과정에서 마주치는 문제였다. 알고리즘과 문제 해결 능력은 중요하지만, 개념적인 이해와 전체적인 시스템 구조 파악이 더 중요하다는 것을 알 수 있었다. '지식은 힘이다'라는 명언을 생각해보면, 기술적인 도움을 받는 것도 중요하지만 개념적인 이해와 학습은 더 큰 힘이 될 것이다.",
    "action_list": ["더 깊은 개념적 이해를 위해 관련 서적을 읽어보기", "다른 개발자들과 소통하여 문제 해결 방법 나누기", "개발자 커뮤니티에 참여하여 지식을 공유하기"] }`
);

function App() {
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async (userInput: string) => {
    try {
      setIsLoading(true);
      const message = await callGPT({
        prompt: `${userInput}`,
      });
      setData(JSON.parse(message));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickAPICallButton = () => {
    handleClickAPICall("");
  };

  const handleSubmit = (userInput: string) => {
    handleClickAPICall(userInput);
  };

  console.log(">>data", data);

  return (
    <>
      <PromptInput isLoading={isLoading} onSubmit={handleSubmit} />
      <button onClick={handleClickAPICallButton}>GPT API Call</button>
      <div>title: {data?.title}</div>
      <div>analysis: {data?.analysis}</div>
      <div>emotional_content: {data?.emotional_content}</div>
      <div>emotional_result: {data?.emotional_result}</div>
    </>
  );
}

export default App;
