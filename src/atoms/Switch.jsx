import { useState } from "react";

export default function Switch({ action, activated }) {
  const [active, setActive] = useState(activated);

  const handleClick = () => {
    action(!active);
    setActive(!active);
  };

  return (
    <div className={`switch ${active ? "active" : ""}`} onClick={handleClick}>
      <div className="switch__circle"></div>
    </div>
  );
}
