import React, { useState, useContext, Children } from "react";

const SwitchSectionContext = React.createContext();

export function SwitchSection({ children }) {
  const [section, setSection] = useState(0);

  console.log(section);

  return (
    <SwitchSectionContext.Provider value={{ section, setSection }}>
      {children}
    </SwitchSectionContext.Provider>
  );
}

export const useSwitchSection = () => {
  return useContext(SwitchSectionContext);
};

export default SwitchSection;
