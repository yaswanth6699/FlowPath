import { TabContainer } from "../../globalStyles";
import { useChatFlow } from "../../hooks/useChatFlow";
import TabItem from "./TabItem";

const TabSelection = () => {
  const { tabs } = useChatFlow();
  return (
    <>
      <TabContainer>
        {tabs.map((item) => (
          <TabItem Item={item} />
        ))}
      </TabContainer>
    </>
  );
};

export default TabSelection;
