import { useEffect, useState } from "react";
import { MessageContainer, StyledButton } from "../globalStyles";
import { useChatFlow } from "../hooks/useChatFlow";

const EditNode = () => {
  const { handleEditNode, getNodeDataById, selectedNode } = useChatFlow();
  const data = selectedNode && getNodeDataById(selectedNode);
  const [inputVal, toggleInputVal] = useState("");

  useEffect(() => {
    if (data) toggleInputVal(data);
  }, [data]);

  return (
    <MessageContainer>
      <textarea
        value={inputVal}
        onChange={(e) => toggleInputVal(e.target.value)}
      />
      <StyledButton
        onClick={() => handleEditNode({ label: inputVal, id: selectedNode! })}
      >
        Update
      </StyledButton>
    </MessageContainer>
  );
};

export default EditNode;
