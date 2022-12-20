import React, { useEffect } from 'react';
import { Table } from "react-bootstrap";
import { useTable, useRowSelect } from 'react-table';

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

function TableComponent({ showSelectedAll, data, columns }) {
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

  useEffect(() => {
    console.log(selectedRowIds);
  }, [selectedRowIds]);

  return (
    <div className='inner-content-wrap'>
      <div className='table-wrapper'>
        <Table  {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
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
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td key={`column${i}`} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                  No Data found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default TableComponent;