import React from 'react';

const InfoTable = ({ data }) => {
  const rowList = data ? Object.entries(data) : [];
  return (
    <table className="table table-hover mb-0">
      <thead>
        <tr>
          <th className="border-top-0">#</th>
          <th className="border-top-0">Характеристика</th>
          <th className="border-top-0">Значение</th>
        </tr>
      </thead>
      <tbody>
        {rowList.map((row, index) => 
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InfoTable;
