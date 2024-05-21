import { DragSourceMonitor, useDrag } from "react-dnd";
import { useChatFlow } from "../../hooks/useChatFlow";
import { Tab } from "../../types/globalTypes";

const TabItem = ({ Item }: { Item: Tab }) => {
  const { handleChangetab } = useChatFlow();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "node",
    item: { id: Item.id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      ref={drag}
      onClick={() => handleChangetab(Item.id)}
    >
      {Item.icon}
      <p>{Item.name}</p>
    </div>
  );
};

export default TabItem;
