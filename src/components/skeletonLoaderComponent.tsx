import React, { FC } from "react";

const SkeletonLoaderChatList: FC = () => {
  return (
    <div className="flex animate-pulse flex-col space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-row">
            <div className="h-12 w-12 rounded-full bg-gray/25"></div>
            <div className="m-auto ml-4 h-2 flex-grow rounded-full bg-gray/25"></div>
          </div>
        ))}
    </div>
  );
};

const SkeletonLoaderChatMsg: FC = () => {
  return (
    <div className="flex animate-pulse flex-col space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-row py-1 px-4">
            <div className="h-12 w-12 rounded-full bg-gray/25"></div>
            <div className="ml-4 flex w-full flex-col space-y-4">
              <div className="h-4 w-32 rounded-full bg-gray/25"></div>  
              <div className="h-2 mr-4 w-full rounded-full bg-gray/25"></div>
              <div className="h-2 mr-8 w-full rounded-full bg-gray/25"></div>
              <div className="h-2 mr-12 w-full rounded-full bg-gray/25"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

const SkeletonLoaderUserList: FC = () => {
  return (
    <div className="flex animate-pulse flex-col space-y-4 py-2">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-row px-4">
            <div className="h-12 w-12 rounded-full bg-gray/25"></div>
            <div className="m-auto ml-4 h-2 flex-grow rounded-full bg-gray/25"></div>
          </div>
        ))}
    </div>
  )
}


export { SkeletonLoaderChatList, SkeletonLoaderChatMsg, SkeletonLoaderUserList };
