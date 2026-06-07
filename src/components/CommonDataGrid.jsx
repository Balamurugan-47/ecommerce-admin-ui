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
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #e0e0e0",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
            color: "#363434", // dark text
            fontSize: "0.875rem",
          },
        }}
      />
    </div>
  );
}

export default CommonDataGrid;
