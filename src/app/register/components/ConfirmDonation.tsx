export default function ConfirmDonation() {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>รายการ</th>
            <th>จำนวนเงิน</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ค่าบริจาค</td>
            <td>เงิน</td>
          </tr>
          <tr>
            <td>รวม</td>
            <td>เงิน</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
