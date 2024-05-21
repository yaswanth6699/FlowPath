import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { FaUser } from "react-icons/fa6";
import { IoChatboxEllipses } from "react-icons/io5";
import { toast } from "react-toastify";
import { Connection, addEdge, useEdgesState, useNodesState } from "reactflow";
import {
  INITIAL_CUSTOM,
  INITIAL_TEXT_MESSAGE,
  INITIAL_USER,
} from "../constants";
import {
  Action,
  Chatflow,
  InitialState,
  Nodes,
  Tab,
} from "../types/globalTypes";

const initialState: InitialState = {
  nodes: [
    {
      id: "1",
      position: { x: 50, y: 300 },
      data: { label: "Yaswanth" },
      type: Nodes.USER,
    },
    {
      id: "2",
      position: { x: 300, y: 200 },
      data: { label: "Hello" },
      type: Nodes.MESSAGE,
    },
    {
      id: "3",
      position: { x: 300, y: 400 },
      data: { label: "Lets Play Cricket!" },
      type: Nodes.MESSAGE,
    },
    {
      id: "4",
      position: { x: 600, y: 300 },
      data: { label: "Cricket Image" },
      type: Nodes.CUSTOM,
    },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e2-4", source: "2", target: "4" },
    { id: "e3-4", source: "3", target: "4" },
  ],
  currentTab: Nodes.INITIAL,
  tabs: [
    { id: Nodes.MESSAGE, name: "Message", icon: <IoChatboxEllipses /> },
    { id: Nodes.USER, name: "User", icon: <FaUser /> },
  ],
  selectedNode: null,
  customNodeName: "Image",
};
type ChatFlowState = typeof initialState;

const ChatFlowContext = createContext<Chatflow & InitialState>({
  ...initialState,
  handleAddNode: () => {},
  setEdges: () => {},
  onNodesChange: () => {},
  onEdgesChange: () => {},
  onConnect: () => {},
  handleChangetab: () => {},
  handleGoBackToTabSelection: () => {},
  handleSave: () => {},
  handleAddTab: () => {},
  handleSelectNode: () => {},
  handleEditNode: () => {},
  getNodeDataById: () => "",
  getInitialNodeType: () => "",
});

function reducer(state: ChatFlowState, action: Action): ChatFlowState {
  switch (action.type) {
    case "CHANGE_TAB":
      return { ...state, currentTab: action.payload };
    case "GO_BACK_TO_TAB_SELECTION":
      return { ...state, currentTab: Nodes.INITIAL };
    case "ADD_NEW_TAB":
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
      };
    case "SELECT_NODE":
      return {
        ...state,
        currentTab: Nodes.EDIT,
        selectedNode: action.payload,
      };
    case "RESET_NODE":
      return {
        ...state,
        selectedNode: null,
        currentTab: Nodes.INITIAL,
      };
    case "CHANGE_CUSTOM_NODE_NAME":
      return {
        ...state,
        customNodeName: action.payload,
      };
    default:
      return state;
  }
}

export const ChatFlowProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialState.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialState.edges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleChangetab = (payload: Nodes) => {
    dispatch({ type: "CHANGE_TAB", payload: payload });
  };

  const handleGoBackToTabSelection = () => {
    dispatch({ type: "GO_BACK_TO_TAB_SELECTION" });
  };

  const handleAddNode = (payload: { data: string; type: Nodes }) => {
    setNodes((prev) => {
      const id = Number(prev[prev.length - 1].id) + 1;
      const ele = prev[prev.length - 1].position;
      const position = {
        x: ele.x + 100,
        y: ele.y + 100,
      };
      dispatch({ type: "CHANGE_TAB", payload: Nodes.INITIAL });
      return [
        ...prev,
        {
          id: id.toString(),
          position,
          data: { label: payload.data },
          type: payload.type,
        },
      ];
    });
  };

  const resetTab = () => {
    return dispatch({ type: "CHANGE_TAB", payload: Nodes.INITIAL });
  };

  const handleAddTab = (payload: Tab) => {
    dispatch({ type: "ADD_NEW_TAB", payload: payload });
    trackCustomNodeName(payload.name);
    resetTab();
  };

  const save = () => {
    const nodeHash = new Map();
    nodes.forEach((node) => {
      nodeHash.set(node.id, (nodeHash.get(node.id) || 0) + 1);
    });
    edges.forEach((edge) => {
      [edge.source, edge.target].forEach((nodeId) => {
        if (nodeHash.has(nodeId)) {
          const count = nodeHash.get(nodeId);
          if (count > 1) nodeHash.set(nodeId, count - 1);
          else nodeHash.delete(nodeId);
        }
      });
    });

    if (nodeHash.size > 0) {
      toast("Looks Like one of the Node target is missing");
    } else {
      toast("Chat Flow Saved");
    }
  };

  const handleSelectNode = (payload: string | null) => {
    if (!payload) {
      return dispatch({ type: "RESET_NODE" });
    }
    dispatch({ type: "SELECT_NODE", payload: payload });
  };

  const handleSave = () => {
    save();
  };

  const handleEditNode = (payload: { id: string; label: string }) => {
    resetTab();
    setNodes((prev) =>
      prev.map((node) =>
        node.id === payload.id
          ? { ...node, data: { label: payload.label } }
          : node
      )
    );
  };

  const getNodeDataById = (id: string) => {
    return nodes.filter((item) => item.id === id)[0]?.data?.label || "";
  };

  const getInitialNodeType = (payload: Nodes) => {
    switch (payload) {
      case Nodes.MESSAGE:
        return INITIAL_TEXT_MESSAGE;
      case Nodes.USER:
        return INITIAL_USER;
      case Nodes.CUSTOM:
        return INITIAL_CUSTOM;
      default:
        return INITIAL_CUSTOM;
    }
  };
  const trackCustomNodeName = (payload: string) => {
    return dispatch({ type: "CHANGE_CUSTOM_NODE_NAME", payload: payload });
  };

  const values: Chatflow & InitialState = {
    ...state,
    nodes,
    edges,
    handleAddNode,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleChangetab,
    handleGoBackToTabSelection,
    handleSave,
    handleAddTab,
    handleSelectNode,
    handleEditNode,
    getNodeDataById,
    getInitialNodeType,
  };
  return (
    <ChatFlowContext.Provider value={{ ...values }}>
      {children}
    </ChatFlowContext.Provider>
  );
};

export const useChatFlow = () => useContext(ChatFlowContext);
