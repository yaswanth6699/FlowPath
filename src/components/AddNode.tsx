import { useState } from "react";
import { MessageContainer, StyledButton } from "../globalStyles";
import { useChatFlow } from "../hooks/useChatFlow";
import { Nodes } from "../types/globalTypes";

const AddNode = ({ type }: { type: Nodes }) => {
  const { handleAddNode } = useChatFlow();
  const [inputVal, toggleInputVal] = useState("");
  return (
    <MessageContainer>
      <textarea onChange={(e) => toggleInputVal(e.target.value)} />
      <StyledButton
        disabled={!inputVal}
        onClick={() => handleAddNode({ data: inputVal, type })}
      >
        Add
      </StyledButton>
    </MessageContainer>
  );
};

export default AddNode;
