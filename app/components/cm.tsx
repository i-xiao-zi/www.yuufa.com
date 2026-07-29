"use client";

import { Group } from "@mantine/core";
import { useContextMenu } from "mantine-contextmenu";


export default function ContextMenu({children}: {children: React.ReactNode}) {
  const { showContextMenu } = useContextMenu();
  return (
    <span
    onContextMenu={showContextMenu([
        {
          key: 'copy',
          title: 'Copy to clipboard',
          onClick: () => console.log('xxxxxxxxxxxxxxxxxxx'),
        },
        {
          key: 'download',
          title: 'Download to your device',
          onClick: () => console.log('xxxxxxxxxxxxxxxxxxx'),
        },
      ])}
    >
      {children}
    </span>
  );
}