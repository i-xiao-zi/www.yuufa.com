"use client";
import React from "react";
import {useMantineColorScheme, ActionIcon} from "@mantine/core";
import {IconBrightnessDownFilled, IconMoonFilled} from "@tabler/icons-react";

export default function Scheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ActionIcon onClick={() => toggleColorScheme()}>
      {colorScheme == 'light' ? <IconBrightnessDownFilled /> : <IconMoonFilled />}
    </ActionIcon>
  );
}