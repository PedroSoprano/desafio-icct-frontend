import EditIcon from '@mui/icons-material/Edit';
import { IconButton, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { table, tableContainer } from './styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { api } from '../../api';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

export function TableGrid(props) {
    let actionColumn = [
        {
            field: "history",
            headerName: " ",
            type: 'string',
            align: 'right',
            editable: false,
            renderCell: ({ row }) => (
                <>
                    {
                        props.history &&
                        <IconButton onClick={() => {
                            if (props.handleOpenHistory) {
                                props.handleOpenHistory(row.id)
                            }
                        }}>
                            <VisibilityIcon />
                        </IconButton>
                    }
                </>
            )
        },
        {
            field: 'menu',
            headerName: ' ',
            type: 'string',
            align: 'right',
            editable: false,
            renderCell: ({ row }) => (
                <>
                    {
                        props.onEdit && <IconButton
                            onClick={() => {
                                if (props.handleOpenModalEdit && props.setLivroId) {
                                    props.handleOpenModalEdit()
                                    props.setLivro(row)
                                    props.setLivroId(row.id)
                                }
                            }
                            }>
                            <EditIcon />
                        </IconButton>
                    }
                    {
                        props.onDelete &&
                        <IconButton onClick={() => {
                            api.delete(`/api/livros/${row.id}`).then((res) => {
                                toast.success(res.data.message)
                                props.handleAttReq()
                            })
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </>
            ),
        },
    ];

    if (!props.history) {
        actionColumn.shift()
    }

    if (!props.history && !props.onEdit && !props.onDelete) {
        actionColumn = []
    }

    const handleOnCellClick = (params) => {
        if (params.field !== 'menu' && props.onView) {
            props.onView(params.id.toString());
        }
    };

    const columns = [...props.columns, ...actionColumn];
    const matches = useMediaQuery('(max-width:480px)');
    return (
        <Box sx={tableContainer}>
            {props.setSkip && props.totalRows && props.isLoading ?
                <DataGrid
                    onPaginationModelChange={(e) => props.setSkip && props.setSkip(e.page * e.pageSize)}
                    rows={props.rows}
                    columns={columns.map((column) => ({
                        ...column,
                        ...(!matches ? {
                            flex: 1,
                        } : { width: 230 }),
                        sortable: false,
                        headerClassName: 'super-app-theme--header',
                    }))}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    paginationMode="server"
                    pageSizeOptions={[5]}
                    loading={props.isLoading !== undefined ? props.isLoading : false}
                    rowCount={props.totalRows && props.totalRows}
                    onCellClick={handleOnCellClick}
                    sx={table}
                />
                :
                <DataGrid
                    rows={props.rows}
                    columns={columns.map((column) => ({
                        ...column,
                        ...(!matches ? {
                            flex: 1,
                        } : { width: 230 }),
                        sortable: false,
                        headerClassName: 'super-app-theme--header',
                    }))}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    loading={props.isLoading !== undefined ? props.isLoading : false}
                    onCellClick={handleOnCellClick}
                    sx={table}
                />
            }

        </Box>
    );
}
