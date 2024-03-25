import { Button, Input } from "antd";
import { useState } from "react";

type Props = {
  isLoading?: boolean;
  onSubmit?: (userInput: string) => void;
};

const { TextArea } = Input;

const PromptInput = ({ isLoading, onSubmit }: Props) => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };
  const handleClick = () => {
    if (onSubmit) {
      onSubmit(userInput);
    }
  };

  return (
    <div>
      <TextArea
        value={userInput}
        onChange={handleInputChange}
        placeholder="오늘 일어난 일들을 간단히 적어주세요."
      />
      <Button loading={isLoading} onClick={handleClick}>
        AI야 일기를 써줘!
      </Button>
    </div>
  );
};

export default PromptInput;
