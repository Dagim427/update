import React, { useEffect, useState } from "react";

const LabRequestValueForm = ({ labTest, onResultsChange }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (Array.isArray(labTest)) {
      const initialRows = labTest.map((testName) => ({
        testName,
        result: ""
      }));
      setRows(initialRows);
      onResultsChange(initialRows); // send initial structure to parent
    }
  }, [labTest]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    onResultsChange(updatedRows); // update parent whenever result changes
  };

  return (
    <>
      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Lab Test Name</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.testName}</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.result}
                  onChange={(e) => handleChange(index, "result", e.target.value)}
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default LabRequestValueForm;
