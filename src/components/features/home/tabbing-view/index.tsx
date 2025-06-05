import React from "react";

interface TabData {
  title: string;
  content: string | React.ReactNode;
}

interface TabbingViewProps {
  tabData: TabData[];
}

const TabbingView: React.FC<TabbingViewProps> = (props) => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  return (
    <div className="flex flex-col gap-4 border bg-blue-400 w-full max-w-[50rem] rounded-2xl p-2">
      <div className="flex gap-1 [&>div]:flex-[1_1_0%]">
        {props.tabData.map((tabItem, index) => (
          <Tab title={tabItem.title} onClick={() => setSelectedTab(index)} isSelected={index === selectedTab} key={index} />
        ))}
      </div>

      <div>
        <div className="bg-white/80 rounded-2xl p-2">{props.tabData[selectedTab].content}</div>
      </div>
    </div>
  );
};

interface TabProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  title?: string;
  isSelected?: boolean;
}

const Tab = ({ title, isSelected, ...props }: TabProps) => {
  return (
    <div {...props} className={`flex flex-row justify-center transition-colors relative cursor-pointer ${isSelected && "ring-1 ring-blue-600 bg-white/80"} hover:shadow-lg shadow-white/10 gap-4 bg-white/50 rounded-2xl p-2 min-w-24 text-right`}>
      <div className="">{title}</div>
    </div>
  );
};

export default TabbingView;
