import React from "react";
import nameMap from "emoji-name-map";

interface IconWrapperProps {
  emojiName: string;
}

export const IconWrapper = ({ emojiName }: IconWrapperProps) => {
  return <div>{nameMap.get(emojiName)}</div>;
};
