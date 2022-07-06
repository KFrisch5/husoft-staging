import {Tab, Tabs} from "react-bootstrap";

const TabsForDaysOfWeek = (props) => {
  return (
    <Tabs
      onSelect={(key) => props.setActiveDay(key)}
      activeKey={props.activeTabKey}
      className="mb-3"
    >
      <Tab
        eventKey="0"
        title="SUN"
        tabClassName={props.activeTabKey === "0" ? "activeTab" : "defaultTab"}
      />
      <Tab
        eventKey="1"
        title="MON"
        tabClassName={props.activeTabKey === "1" ? "activeTab" : "defaultTab"}
      />
      <Tab
        eventKey="2"
        title="TUE"
        tabClassName={props.activeTabKey === "2" ? "activeTab" : "defaultTab"}
      />
      <Tab
        eventKey="3"
        title="WED"
        tabClassName={props.activeTabKey === "3" ? "activeTab" : "defaultTab"}
      />
      <Tab
        eventKey="4"
        title="THU"
        tabClassName={props.activeTabKey === "4" ? "activeTab" : "defaultTab"}
      />
      <Tab
        eventKey="5"
        title="FRI"
        tabClassName={props.activeTabKey === "5" ? "activeTab" : "defaultTab"}
      />
      <Tab
        eventKey="6"
        title="SAT"
        tabClassName={props.activeTabKey === "6" ? "activeTab" : "defaultTab"}
      />
    </Tabs>
  );
};

export default TabsForDaysOfWeek;
