import { DataGrid } from "@mui/x-data-grid";

function CommonDataGrid({
  rows,
  columns,
  loading,
}) {

  return (

    <div
      style={{
        height: 600,
        width: "100%",
      }}
    >

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />

    </div>
  );
}

export default CommonDataGrid;