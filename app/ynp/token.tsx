"use client";

import React from "react";
import {Input, SegmentedControl, SegmentedControlItem} from "@mantine/core";
import api from "@/api";
import YouNongPaiInfo from "@/ynp/info";


export default function YouNongPaiToken() {
  const [tokens, setTokens] = React.useState<SegmentedControlItem[]>([]);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    api.ynp.tokens().then(({data}) => {
      setTokens((data??[]).map(token => ({
        label: token.name,
        value: token.token,
      })));
      data?.length && setValue(data[0].token);
    });
  }, [])
  return (
    <>
      <div className="flex justify-center my-5">
        <SegmentedControl className="" value={value} data={tokens} onChange={setValue} />
      </div>
      { tokens.map(token => <YouNongPaiInfo key={token.value} active={token.value == value} token={token} /> ) }
    </>
  );
}