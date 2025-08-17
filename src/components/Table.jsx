import React, { useState } from 'react';

import {
  Pagination,
  Table,
} from 'react-bootstrap';

const CustomTable = ({
  headers = [],
  rows = [],
  renderRow,
  rowsPerPage = 5, // customizable row limit
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculations
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRows = rows.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="d-flex justify-content-center mt-3">
        <Pagination className="mb-0">
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={currentPage === idx + 1}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    );
  };

  return (
    <>
      <div className="table-responsive border border-purple rounded">
        <Table striped bordered hover variant="dark" className="table-purple m-0">
          <thead>
            <tr>
              {headers.map((head, idx) => (
                <th key={idx}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <tr key={row._id || index}>
                  {renderRow
                    ? renderRow(row)
                    : headers.map((h, i) => (
                        <td key={i}>
                          <div className="truncate-hover" title={row[h]}>
                            {row[h]}
                          </div>
                        </td>
                      ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {renderPagination()}
    </>
  );
};

export default CustomTable;
