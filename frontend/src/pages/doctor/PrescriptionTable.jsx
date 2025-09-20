const PrescriptionTable = ({ rows, setRows }) => {
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { medicine: "", dosage: "", frequency: "", duration: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <>
      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Medicine Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.medicine}
                  onChange={(e) =>
                    handleChange(index, "medicine", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.dosage}
                  onChange={(e) =>
                    handleChange(index, "dosage", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.frequency}
                  onChange={(e) =>
                    handleChange(index, "frequency", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.duration}
                  onChange={(e) =>
                    handleChange(index, "duration", e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm d-flex justify-content-center align-items-center p-0"
                  onClick={() => handleRemoveRow(index)}
                  disabled={rows.length === 1}
                  style={{ width: "32px", height: "32px" }}
                >
                  <i
                    className="bi bi-trash-fill"
                    style={{ fontSize: "1.2rem", lineHeight: 1 }}
                  ></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn bg-button text-white" onClick={handleAddRow}>
        <i className="bi bi-plus-circle me-2"></i> Add Row
      </button>
    </>
  );
};

export default PrescriptionTable;
