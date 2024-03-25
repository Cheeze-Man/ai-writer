import { useState } from "react";
import { callGPT } from "./api/gpt";

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await callGPT({
        prompt: `Open AI를 이용한 프로젝트를 시작했다. 프로젝트에 버그가 많이 나왔음. 구글에서 검색했지만 해결 안되었어.
      역시 gpt를 통해서 해결했다. 근데 이렇게 해결하는게 개발실력에 도움 될까..?`,
      });
      setData(message);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleClickAPICall}>GPT API Call</button>
      <div>{data}</div>
      <div>{isLoading ? "loading..." : "finished"}</div>
    </>
  );
}

export default App;
