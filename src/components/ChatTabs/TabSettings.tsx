import { IoMdArrowBack } from "react-icons/io";
import { Fragment } from "react/jsx-runtime";
import { TabHeader } from "../../globalStyles";
import { useChatFlow } from "../../hooks/useChatFlow";
import { Nodes } from "../../types/globalTypes";
import AddNode from "../AddNode";
import EditNode from "../EditNode";
import TabSelection from "./TabSelection";

const TabSettings = () => {
  const { currentTab, handleGoBackToTabSelection, tabs } = useChatFlow();

  const renderComponent = {
    [Nodes.INITIAL]: <TabSelection />,
    [Nodes.MESSAGE]: <AddNode type={Nodes.MESSAGE} />,
    [Nodes.USER]: <AddNode type={Nodes.USER} />,
    [Nodes.CUSTOM]: <AddNode type={Nodes.CUSTOM} />,
    [Nodes.EDIT]: <EditNode />,
  };
  const tabName =
    currentTab === Nodes.EDIT
      ? "Edit"
      : tabs.filter((item) => item.id === currentTab)[0]?.name;
  return (
    <Fragment>
      <TabHeader>
        {tabName ? (
          <IoMdArrowBack onClick={handleGoBackToTabSelection} />
        ) : (
          <span></span>
        )}
        <p>{tabName || "Node Panel (Drag/Click to Add Node)"}</p>
        <span></span>
      </TabHeader>

      {renderComponent[currentTab]}
    </Fragment>
  );
};

export default TabSettings;
