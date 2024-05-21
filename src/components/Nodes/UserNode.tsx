import { FaUser } from "react-icons/fa6";
import { Handle, Position } from "reactflow";
import { StyledNode } from "../../globalStyles";
import { useChatFlow } from "../../hooks/useChatFlow";
import { NodeTypeCustom } from "../../types/globalTypes";

const UserNode = ({ data, id }: NodeTypeCustom) => {
  const { selectedNode } = useChatFlow();
  return (
    <div>
      <Handle type="target" position={Position.Left} id="target" />
      <StyledNode isSelected={selectedNode === id}>
        <div className="node-header">
          <p>User</p>
          <FaUser />
        </div>
        <div className="data">{data.label}</div>
      </StyledNode>

      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default UserNode;
