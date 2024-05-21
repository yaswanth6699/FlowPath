import { Dispatch, ReactNode } from "react";
import { Connection, Edge, Node as FlowNode } from "reactflow";

export enum Nodes {
  INITIAL = "INITIAL",
  MESSAGE = "MESSAGE",
  USER = "USER",
  CUSTOM = "CUSTOM",
  EDIT = "EDIT",
}

export interface Tab {
  id: Nodes;
  name: string;
  icon: ReactNode;
}

export interface InitialState {
  nodes: FlowNode[];
  edges: Edge[];
  currentTab: Nodes;
  tabs: Tab[];
  selectedNode: string | null;
  customNodeName: string;
}

export interface Chatflow {
  handleAddNode: (payload: { data: string; type: Nodes }) => void;
  setEdges: Dispatch<Edge[]>;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (params: Connection) => void;
  handleChangetab: (payload: Nodes) => void;
  handleGoBackToTabSelection: () => void;
  handleSave: () => void;
  handleAddTab: (payload: Tab) => void;
  handleSelectNode: (payload: string | null) => void;
  handleEditNode: (payload: { label: string; id: string }) => void;
  getNodeDataById: (payload: string) => string;
  getInitialNodeType: (payload: Nodes) => string;
}

export interface NodeTypeCustom {
  data: { label: string } & FlowNode;
  id: string;
}

export type Action =
  | { type: "CHANGE_TAB"; payload: Nodes }
  | { type: "GO_BACK_TO_TAB_SELECTION" }
  | { type: "ADD_NEW_TAB"; payload: Tab }
  | { type: "SELECT_NODE"; payload: string }
  | { type: "CHANGE_CUSTOM_NODE_NAME"; payload: string }
  | { type: "RESET_NODE" };
