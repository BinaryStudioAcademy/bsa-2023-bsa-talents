import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@mui/material';
import { useState } from 'react';

import styles from './styles.module.scss';

type HeadCell = {
    value: string;
    label: string;
};

type BodyRow = {
    id: string;
} & Record<string, string>;

type Properties = {
    headRow: HeadCell[];
    bodyRows: BodyRow[];
};
const ASCENDING_SORT = 1;
const DESCENDING_SORT = -1;
const Table: React.FC<Properties> = ({ headRow, bodyRows }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>('id');

    const handleSortRequest = (property: string) => () => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedRows = [...bodyRows].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
            return order === 'asc' ? DESCENDING_SORT : ASCENDING_SORT;
        }
        if (a[orderBy] > b[orderBy]) {
            return order === 'asc' ? ASCENDING_SORT : DESCENDING_SORT;
        }
        return 0;
    });

    return (
        <TableContainer>
            <MuiTable
                className={styles.table}
                aria-label="simple table"
                stickyHeader
            >
                <TableHead className={styles.tableHead}>
                    <TableRow>
                        {headRow.map((cell) => (
                            <TableCell key={cell.value}>
                                <TableSortLabel
                                    active={orderBy === cell.value}
                                    direction={
                                        orderBy === cell.value ? order : 'asc'
                                    }
                                    onClick={handleSortRequest(cell.value)}
                                >
                                    {cell.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row) => (
                        <TableRow key={row.id}>
                            {headRow.map((column) => (
                                <TableCell key={column.value}>
                                    {row[column.value]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export { type BodyRow, type HeadCell, Table };
