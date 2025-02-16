import { useAsyncRetry } from "react-use";
import { getOverview } from "@/app/admin/actions";
import { formatNumber } from "@/utils/format";
import { FullPageLoader } from "@/components/Admin/FullPageLoader";
import { useRouter } from "next/navigation";

export const Overview: React.FC = () => {
  const router = useRouter();
  const overviews = useAsyncRetry(async () => {
    return getOverview();
  }, []);

  if (overviews.loading) {
    return <FullPageLoader>Loading...</FullPageLoader>;
  }

  if (!overviews.value) {
    return <FullPageLoader>Initializing...</FullPageLoader>;
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="mb-4 flex gap-4">
        <button type="button" className="btn btn-primary" onClick={overviews.retry}>
          Refresh
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => router.push("/admin/export")}
        >
          Export Tool
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table-sm table-zebra table whitespace-nowrap">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name TH</th>
              <th>Name EN</th>
              <th>isAvailable</th>
              <th>Price</th>
              <th>Sum</th>
              <th>Sum✕Price</th>
            </tr>
          </thead>
          <tbody>
            {overviews.value.totalItemsCount.map((i) => (
              <tr key={i.id}>
                <th>{i.id}</th>
                <th>{i.nameTH}</th>
                <th>{i.nameEN}</th>
                <th>{i.isAvailable ? "yes" : "no"}</th>
                <th>{formatNumber(i.price / 100, { useGrouping: true, isTHB: true })}</th>
                <th>{formatNumber(i.sumAmount ?? 0, { useGrouping: true })}</th>
                <th>
                  {formatNumber(((i.sumAmount ?? 0) * i.price) / 100, {
                    useGrouping: true,
                    isTHB: true,
                  })}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
