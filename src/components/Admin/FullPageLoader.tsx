import { memo, type FC, type PropsWithChildren } from "react";

export const FullPageLoader: FC<PropsWithChildren> = memo(function FullPageLoader({ children }) {
  return (
    <div className="grid h-full w-full place-content-center">
      <div className="flex gap-2">
        <span className="loading loading-spinner" /> {children}
      </div>
    </div>
  );
});
