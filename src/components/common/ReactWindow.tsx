import React, { useRef } from "react";
import { FixedSizeGrid } from "react-window";

interface IGlobalFixedSizeGridProps extends React.ComponentProps<typeof FixedSizeGrid> {
  loadMore: (e: any) => void;
}

const ReactWindow = ({ loadMore, children, ...props }: IGlobalFixedSizeGridProps) => {
  const rwindowRef = useRef<any>(null);

  const handleListRef = (component: any) => {
    rwindowRef.current = component;
  };

  return (
    <FixedSizeGrid
      ref={handleListRef}
      columnCount={props.columnCount}
      columnWidth={props.columnWidth}
      onItemsRendered={props.onItemsRendered}
      rowCount={props.rowCount}
      rowHeight={props.rowHeight}
      width={props.width}
      height={props.height}
      className={props.className}
      overscanColumnCount={props.overscanColumnCount}
      overscanRowCount={props.overscanRowCount}
    >
      {children}
    </FixedSizeGrid>
  );
};

export default ReactWindow;


