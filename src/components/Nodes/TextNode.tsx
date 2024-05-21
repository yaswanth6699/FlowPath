import { IoLogoWhatsapp } from "react-icons/io";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import { StyledNode } from "../../globalStyles";
import { useChatFlow } from "../../hooks/useChatFlow";
import { NodeTypeCustom } from "../../types/globalTypes";

const TextNode = ({ data, id }: NodeTypeCustom) => {
  const { selectedNode } = useChatFlow();
  return (
    <>
      <Handle type="target" position={Position.Left} id="target" />
      <StyledNode isSelected={selectedNode === id}>
        <div className="node-header">
          <p>Message</p>
          <IoLogoWhatsapp />
        </div>
        <div className="data">{data.label}</div>
      </StyledNode>

      <Handle type="source" position={Position.Right} isConnectable={true} />
    </>
  );
};

export default TextNode;
