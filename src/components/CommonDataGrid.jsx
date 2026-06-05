import { DataGrid } from "@mui/x-data-grid";

function CommonDataGrid({ rows, columns, loading }) {
  return (
    <div
      style={{
        height: 800,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pagination
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        density="compact"
        autoHeight
        showToolbar
      />
    </div>
  );
}

export default CommonDataGrid;
