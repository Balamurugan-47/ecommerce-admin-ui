import { DataGrid } from "@mui/x-data-grid";

function CommonDataGrid({ rows, columns, loading }) {
  return (
    <div
      style={{
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
        density="standard"
        showToolbar
        // density="compact"
        rowHeight={40}
        columnHeaderHeight={44}
      />
    </div>
  );
}

export default CommonDataGrid;
