import { callGPT } from "./api/gpt";

function App() {
  const handleClickAPICall = async () => {
    await callGPT();
  };

  return (
    <>
      <button onClick={handleClickAPICall}>GPT API Call</button>
    </>
  );
}

export default App;
