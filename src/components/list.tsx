import { Box, Divider, Link } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";

interface NewEvent {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
  category: string;
  duration: string;
}

interface ListProps {
  events: NewEvent[];
  teamId: string;
}

const PageSize = 10;

const List = ({ events, teamId }: ListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return events.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const columns: GridColDef[] = [
    {
      field: "calendarId",
      headerName: "Space",
      width: 150,
      renderCell: (params) => (
        <Link
          href={"https://app.clickup.com/" + teamId + "/v/l/s/" + params.value}
          target="_blank"
          rel="noreferrer"
        >
          {params.value}{" "}
        </Link>
      ),
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 150,
      valueFormatter: ({ value }) =>
        new Date(parseInt(value)).toISOString().slice(11, -5),
    },
    { field: "title", headerName: "Task", flex: 1, minWidth: 350 },
    {
      field: "start",
      headerName: "Start",
      width: 250,
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      field: "end",
      headerName: "End",
      width: 250,
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        sx={{ border: 0 }}
        rows={events}
        columns={columns}
        components={{
          Toolbar: () => (
            <GridToolbarContainer
              sx={{
                pl: { xs: 8, sm: 0 },
                justifyContent: "space-between",
              }}
            >
              <Box>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
              </Box>
              <GridToolbarQuickFilter />
            </GridToolbarContainer>
          ),
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
};

export default List;
