/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAsyncRetry } from "react-use";
import {
  getItemTable,
  removeItemTable,
  removeStatusTable,
  getStatusTable,
  updateItemTable,
  updateStatusTable,
} from "../actions";
import { FullPageLoader } from "@/components/Admin/FullPageLoader";
import { useContext, useMemo, useState } from "react";
import { ConfirmationDialogContext } from "@/components/ConfirmationDialog";

const AdvancedTableEditor: React.FC<
  | {
      get: typeof getItemTable;
      update: typeof updateItemTable;
      remove: typeof removeItemTable;
    }
  | {
      get: typeof getStatusTable;
      update: typeof updateStatusTable;
      remove: typeof removeStatusTable;
    }
> = ({ get, update, remove }) => {
  const { withConfirmationDialog } = useContext(ConfirmationDialogContext);
  const [lock, setLock] = useState(false);
  const [editor, setEditor] = useState("");

  const data = useAsyncRetry(get as any, []);

  const rawJson = useMemo(() => JSON.stringify(data.value, undefined, 2), [data.value]);

  if (data.loading) {
    return <FullPageLoader>Loading...</FullPageLoader>;
  }
  if (!data.value) {
    return <FullPageLoader>Initializing...</FullPageLoader>;
  }

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[auto_auto_1fr] gap-x-1">
      <div className="col-span-2 flex flex-nowrap items-center gap-2 overflow-x-auto">
        <button type="button" className="btn btn-primary" disabled={lock} onClick={data.retry}>
          Refresh
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={lock}
          onClick={withConfirmationDialog("Confirm add/update?", async () => {
            setLock(true);
            try {
              const editorParsed = JSON.parse(editor);
              const result = await update(editorParsed);
              window.alert(JSON.stringify(result, undefined, 2));
            } catch (e) {
              window.alert(e);
            } finally {
              data.retry();
              setLock(false);
            }
          })}
        >
          Add/Update
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={lock}
          onClick={withConfirmationDialog("Confirm remove?", async () => {
            setLock(true);
            try {
              const editorParsed = JSON.parse(editor);
              if (typeof editorParsed["id"] !== "number")
                throw new Error(
                  `Expected 'id' field to be number, received: ${typeof editorParsed["id"]}`,
                );
              const result = await remove(editorParsed["id"]);
              window.alert(JSON.stringify(result, undefined, 2));
            } catch (e) {
              window.alert(e);
            } finally {
              data.retry();
              setLock(false);
            }
          })}
        >
          Remove
        </button>

        <p>
          <b className="bg-primary text-primary-content">WARNING:</b> This editor directly modifies
          the database. Improper use may break the database, be careful.
        </p>
      </div>

      <p className="mt-2 font-bold">Editor</p>
      <p className="mt-2 font-bold">Table</p>

      <textarea
        className="textarea border-primary h-full w-full resize-none overflow-auto border-2 font-mono whitespace-nowrap"
        value={editor}
        onChange={(e) => setEditor(e.target.value)}
      />
      <pre className="border-primary h-full w-full overflow-auto border-2">{rawJson}</pre>
    </div>
  );
};

export const AdvancedItemsTableEditor = () => (
  <AdvancedTableEditor get={getItemTable} update={updateItemTable} remove={removeItemTable} />
);
export const AdvancedStatusTableEditor = () => (
  <AdvancedTableEditor get={getStatusTable} update={updateStatusTable} remove={removeStatusTable} />
);
