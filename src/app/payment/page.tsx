import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52o",
      amount: 140,
      status: "pending",
      email: "m@example.com",
    },
    {
        id: "728ed52r",
        amount: 109,
        status: "success",
        email: "n@example.com",
      },
      {
        id: "728ed52f",
        amount: 200,
        status: "pending",
        email: "a@example.com",
      },
      {
        id: "728ed52a",
        amount: 101,
        status: "failed",
        email: "q@example.com",
      },{
        id: "728ed52b",
        amount: 140,
        status: "pending",
        email: "k@example.com",
      },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
