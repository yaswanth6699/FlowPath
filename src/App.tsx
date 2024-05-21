import { useDrop } from "react-dnd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactFlow, { Background, Controls, MiniMap, NodeTypes } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./components/Nodes/CustomNode";
import TextNode from "./components/Nodes/TextNode";
import UserNode from "./components/Nodes/UserNode";
import Settings from "./components/Settings";
import { Container, Flow, StyledButton } from "./globalStyles";
import { useChatFlow } from "./hooks/useChatFlow";
import { Nodes } from "./types/globalTypes";

const nodeTypes: NodeTypes = {
  [Nodes.MESSAGE]: TextNode,
  [Nodes.USER]: UserNode,
  [Nodes.CUSTOM]: CustomNode,
};

function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onConnect,
    onEdgesChange,
    handleSave,
    handleSelectNode,
    handleAddNode,
    getInitialNodeType,
  } = useChatFlow();

  const [, dropRef] = useDrop({
    accept: "node",
    drop: (item: { id: Nodes }) =>
      handleAddNode({
        data: getInitialNodeType(item.id),
        type: item.id,
      }),
  });

  return (
    <Container>
      <div className="header">
        <h2>Flow Path</h2>
        <StyledButton onClick={handleSave}>Save Changes</StyledButton>
      </div>
      <Flow>
        <div className="flow">
          <ReactFlow
            ref={dropRef}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={(e, node) => handleSelectNode(node.id)}
            onPaneClick={() => handleSelectNode(null)}
          >
            <MiniMap nodeColor={"teal"} />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <Settings />
      </Flow>
      <ToastContainer />
    </Container>
  );
}

export default App;
