import { MdDashboardCustomize } from "react-icons/md";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import { StyledNode } from "../../globalStyles";
import { useChatFlow } from "../../hooks/useChatFlow";
import { NodeTypeCustom } from "../../types/globalTypes";

const CustomNode = ({ data, id }: NodeTypeCustom) => {
  const { selectedNode, customNodeName } = useChatFlow();

  return (
    <>
      <Handle type="target" position={Position.Left} id="target" />
      <StyledNode isSelected={selectedNode === id}>
        <div className="node-header">
          <p>{customNodeName}</p>
          <MdDashboardCustomize />
        </div>
        <div className="data">{data.label}</div>
      </StyledNode>
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </>
  );
};

export default CustomNode;
