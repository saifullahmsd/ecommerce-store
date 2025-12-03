import React from "react";
import { WifiSlash } from "phosphor-react";
import useNetworkStatus from "../../hooks/useNetworkStatus";

const OfflineBanner = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-0 left-0 z-[100] w-full bg-red-500 px-4 py-3 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-semibold">
        <WifiSlash size={20} />
        <span>No Internet Connection. You are currently offline.</span>
      </div>
    </div>
  );
};

export default OfflineBanner;
