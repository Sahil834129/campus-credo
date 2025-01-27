import React from 'react';
import { Pagination, Table } from "react-bootstrap";
import { useMountedLayoutEffect, useRowSelect, useTable } from 'react-table';

const CheckboxRender = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function TableComponent({
  showSelectedAll,
  data,
  columns,
  selectedRows,
  onSelectedRowsChange,
  isPagination = false,
  setActivePage,
  activePage,
  totalRows,
  manageModules = [],
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        selectedRowIds: selectedRows,
        hiddenColumns: ['Manage Fee', 'Manage Application', 'Manage Admission', 'Manage User'].filter(val => !manageModules.includes(val))
      }
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        showSelectedAll ? {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <CheckboxRender {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <CheckboxRender {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        } : {},
        ...columns,
      ]);
    }
  );

  const getPaginationItems = () => {
    const totalItems = Math.ceil(totalRows / 10);
    let items = [];
    if (totalItems > 1) {
      for (let number = 1; number <= totalItems; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === activePage}
            onClick={() => setActivePage(number)}
          >
            {number}
          </Pagination.Item>,
        );
      }
    }
    return items;
  }
  useMountedLayoutEffect(() => {
    onSelectedRowsChange && onSelectedRowsChange(selectedRowIds);
  }, [onSelectedRowsChange, selectedRowIds]);

  return (
    <>
      <Table striped {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr valign="middle" {...headerGroup.getHeaderGroupProps()} style={{ background: 'rgba(65, 40, 95, 0.06)', height: '60px' }}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr valign="middle" {...row.getRowProps()} style={{ height: '60px' }}>
                {row.cells.map(cell => {
                  return <td key={`column${i}`} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr valign="middle">
              <td colSpan={columns.length + 1} style={{ textAlign: 'center' }}>
                No Data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {isPagination && (
        <Pagination>
          {
            getPaginationItems()
          }
        </Pagination>
      )}
    </>
  );
}
export default TableComponent;