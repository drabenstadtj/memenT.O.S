import { useRef } from "react";
import Draggable from "react-draggable";

export default function Window({
  title,
  children,
  defaultPosition = { x: 100, y: 100 },
  onClose,
  width = 800,
  height = 600,
}) {
  const nodeRef = useRef(null);

  return (
    <Draggable handle=".window-header" nodeRef={nodeRef}>
      <div
        className="window"
        ref={nodeRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div className="window-header">
          <span className="window-title">{title}</span>
          <button onClick={onClose} className="window-close">
            ×
          </button>
        </div>
        <div className="window-content">{children}</div>
      </div>
    </Draggable>
  );
}
