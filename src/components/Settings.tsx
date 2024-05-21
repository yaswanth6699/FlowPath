import { useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { StyledButton } from "../globalStyles";
import { useChatFlow } from "../hooks/useChatFlow";
import { Nodes } from "../types/globalTypes";
import TabSettings from "./ChatTabs/TabSettings";

const Settings = () => {
  const { handleAddTab } = useChatFlow();
  const [tabVal, toggleTabVal] = useState("");
  return (
    <div className="setting">
      <div>
        <TabSettings />
      </div>

      <div className="custom-tab">
        <div className="text">
          <p>Add a Custom Node: </p>
          <input
            placeholder="node name"
            type="text"
            onChange={(e) => toggleTabVal(e.target.value)}
          />
        </div>
        <StyledButton
          className="add-node"
          onClick={() =>
            handleAddTab({
              id: Nodes.CUSTOM,
              name: tabVal,
              icon: <MdDashboardCustomize />,
            })
          }
          disabled={!tabVal.length}
        >
          Add
        </StyledButton>
      </div>
    </div>
  );
};

export default Settings;
