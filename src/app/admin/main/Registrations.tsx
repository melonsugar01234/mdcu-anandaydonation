import { useMemo, useState } from "react";
import { useAsyncRetry } from "react-use";
import { getMiscData, queryRegistrations } from "@/app/admin/actions";
import { BatchedDeferPromise } from "@/utils/utils";
import { Input } from "@/components/Forms";
import { UI_PAGE_SIZE } from "@/config";
import { FullPageLoader } from "@/components/Admin/FullPageLoader";
import { formatNumber } from "@/utils/format";

const queryRegistrationsBatched = new BatchedDeferPromise(queryRegistrations);

const SortingOptions = {
  "ID ASC": { column: "id", desc: false },
  "ID DSC": { column: "id", desc: true },
  "Created ASC": { column: "created", desc: false },
  "Created DSC": { column: "created", desc: true },
  "Updated ASC": { column: "updated", desc: false },
  "Updated DSC": { column: "updated", desc: true },
  "Status ASC": { column: "status", desc: false },
  "Status DSC": { column: "status", desc: true },
  "Name ASC": { column: "name", desc: false },
  "Name DSC": { column: "name", desc: true },
  "Tracking Code ASC": { column: "trackingCode", desc: false },
  "Tracking Code DSC": { column: "trackingCode", desc: true },
  "isIncludedInTotal ASC": { column: "isIncludedInTotal", desc: false },
  "isIncludedInTotal DSC": { column: "isIncludedInTotal", desc: true },
  "Phone Number ASC": { column: "tel", desc: false },
  "Phone Number DSC": { column: "tel", desc: true },
  "Email ASC": { column: "email", desc: false },
  "Email DSC": { column: "email", desc: true },
  "Address ASC": { column: "address", desc: false },
  "Address DSC": { column: "address", desc: true },
  "Payment Method ASC": { column: "paymentMethod", desc: false },
  "Payment Method DSC": { column: "paymentMethod", desc: true },
  "Request Receipt ASC": { column: "requestReceipt", desc: false },
  "Request Receipt DSC": { column: "requestReceipt", desc: true },
  "Donate Amount ASC": { column: "donateAmount", desc: false },
  "Donate Amount DSC": { column: "donateAmount", desc: true },
  "National ID ASC": { column: "nationalId", desc: false },
  "National ID DSC": { column: "nationalId", desc: true },
  "Name on Receipt ASC": { column: "nameOnReceipt", desc: false },
  "Name on Receipt DSC": { column: "nameOnReceipt", desc: true },
  "Address on Receipt ASC": { column: "addressOnReceipt", desc: false },
  "Address on Receipt DSC": { column: "addressOnReceipt", desc: true },
  "Transfer Time ASC": { column: "transferDateTime", desc: false },
  "Transfer Time DSC": { column: "transferDateTime", desc: true },
  "Status Notes ASC": { column: "statusNotes", desc: false },
  "Status Notes DSC": { column: "statusNotes", desc: true },
  "InternalNotes ASC": { column: "internalNotes", desc: false },
  "InternalNotes DSC": { column: "internalNotes", desc: true },
} as const;

export const Registrations: React.FC = () => {
  const [page, setPage] = useState(0);
  const [textSearch, setTextSearch] = useState("");
  const [sortingOption, setSortingOption] = useState<keyof typeof SortingOptions>("ID ASC");
  const [statusFilterOption, setStatusFilterOption] = useState<number>();

  const pageData = useAsyncRetry(async () => {
    const filters: Parameters<typeof queryRegistrations>[0]["filters"] = {};
    if (statusFilterOption !== undefined) filters["status"] = statusFilterOption;

    return queryRegistrationsBatched.call({
      page: page,
      pageSize: UI_PAGE_SIZE,
      textSearch: textSearch !== "" ? textSearch : undefined,
      sort: [SortingOptions[sortingOption]],
      filters,
    });
  }, [page, textSearch, sortingOption, statusFilterOption]);

  const miscData = useAsyncRetry(async () => {
    return getMiscData();
  }, []);

  const statusMap = useMemo(() => {
    const statusMap = new Map<number, string>();
    for (const status of miscData.value?.statuses ?? []) {
      statusMap.set(status.id, `${status.nameTH}/${status.nameEN}`);
    }
    return statusMap;
  }, [miscData]);

  if (miscData.loading) {
    return <FullPageLoader>Loading...</FullPageLoader>;
  }
  if (!miscData.value) {
    return <FullPageLoader>Initializing...</FullPageLoader>;
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex w-full flex-nowrap items-end overflow-x-auto">
        <div className="shrink grow">
          <Input
            label="Search (Name, Phone Number, Email, and Tracking Code)"
            autoComplete="off"
            value={textSearch}
            onChange={(v) => {
              setTextSearch(v);
              setPage(0);
            }}
          />
        </div>

        <select
          className="select mb-1 ml-2 w-fit"
          value={sortingOption}
          onChange={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setSortingOption(e.target.value as any);
            setPage(0);
          }}
        >
          {Object.entries(SortingOptions).map(([name, _]) => (
            <option key={"sorting-" + name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <select
          className="select mb-1 ml-2 w-40"
          value={statusFilterOption === undefined ? "unset" : statusFilterOption.toString()}
          onChange={(e) => {
            setStatusFilterOption(e.target.value === "unset" ? undefined : Number(e.target.value));
            setPage(0);
          }}
        >
          <option value="unset">Status Filter</option>
          {miscData.value.statuses.map(({ id, nameTH, nameEN }) => (
            <option key={"statusfilter-" + id} value={id}>
              {id}: {nameTH} / {nameEN}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn btn-primary mb-1 ml-2"
          onClick={() => {
            setPage((page) => page - 1);
          }}
          disabled={page <= 0}
        >
          &lt;
        </button>
        <p className="mb-3 text-nowrap">Page: {page + 1}</p>
        <button
          type="button"
          className="btn btn-primary mb-1"
          onClick={() => {
            setPage((page) => page + 1);
          }}
          disabled={!pageData.value?.hasMore}
        >
          &gt;
        </button>

        <button
          type="button"
          className="btn btn-primary mb-1 ml-2"
          onClick={() => {
            pageData.retry();
            miscData.retry();
          }}
          disabled={pageData.loading || miscData.loading}
        >
          Refresh
        </button>
      </div>

      {pageData.loading ? (
        <FullPageLoader>Loading...</FullPageLoader>
      ) : !pageData.value ? (
        <FullPageLoader>Initializing...</FullPageLoader>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="table-sm table-zebra table whitespace-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tracking Code</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Donate Amount</th>
                <th>Transfer Time</th>
                <th>Status Notes</th>
                <th>Internal Notes</th>
                <th>isIncludedInTotal</th>
              </tr>
            </thead>
            <tbody>
              {pageData.value.result.map((i) => (
                <tr key={i.id}>
                  <th>
                    <a
                      className="link link-primary"
                      href={`/admin/registrations/${i.id}`}
                      target="_blank"
                    >
                      {i.id}
                    </a>
                  </th>
                  <th>
                    <a
                      className="link link-primary"
                      href={`/admin/registrations/${i.id}`}
                      target="_blank"
                    >
                      {i.trackingCode}
                    </a>
                  </th>
                  <th>
                    {i.status} ({statusMap.get(i.status)})
                  </th>
                  <th>{i.created.toLocaleString()}</th>
                  <th>{i.updated.toLocaleString()}</th>
                  <th>{i.name}</th>
                  <th>{i.tel}</th>
                  <th>{i.email}</th>
                  <th>
                    {formatNumber((i.donateAmount ?? 0) / 100, { useGrouping: true, isTHB: true })}
                  </th>
                  <th>{i.transferDateTime?.toLocaleString()}</th>
                  <th>{i.statusNotes}</th>
                  <th>{i.internalNotes}</th>
                  <th>{i.isIncludedInTotal ? "yes" : "no"}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
