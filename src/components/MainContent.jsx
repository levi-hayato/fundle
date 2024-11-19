import React, { useState, useEffect } from "react";

const MainContent = ({ setProfileData }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    photo: "",
    admitDate: "",
  });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setData(storedData);
    setFilteredData(storedData);
  }, []);

  const saveToLocalStorage = (updatedData) => {
    localStorage.setItem("formData", JSON.stringify(updatedData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString(); 

    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = {
        ...formData,
        admitDate: formData.admitDate || currentDate,
      };
      setData(updatedData);
      setFilteredData(updatedData);
      saveToLocalStorage(updatedData);
      setEditIndex(null);
    } else {
      const newData = [...data, { ...formData, admitDate: currentDate }];
      setData(newData);
      setFilteredData(newData);
      saveToLocalStorage(newData);
    }
    setFormData({ name: "", age: "", photo: "", admitDate: "" }); 
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    setFilteredData(updatedData);
    saveToLocalStorage(updatedData);
  };

  const handleEdit = (index) => {
    setFormData(data[index]);
    setEditIndex(index);
  };

  const handleRowClick = (index) => {
    setProfileData(data[index]);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.age.toString().includes(term)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="main-content">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="search-wrapper">
          <div className="search-icon">
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5556 3C19.4579 3 21 4.54213 21 6.44444V17.5556C21 19.4579 19.4579 21 17.5556 21H6.44444C4.54213 21 3 19.4579 3 17.5556V6.44444C3 4.54213 4.54213 3 6.44444 3H17.5556Z"
                stroke="#ccc"
                stroke-width="1"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.5067 7.01392C9.02527 7.01392 7.01367 9.02551 7.01367 11.5069C7.01367 13.9884 9.02527 16 11.5067 16C12.3853 16 13.205 15.7478 13.8973 15.3119L15.1658 16.5803C15.5563 16.9709 16.1895 16.9709 16.58 16.5803C16.9705 16.1898 16.9705 15.5566 16.58 15.1661L15.3116 13.8977C15.7475 13.2053 15.9997 12.3856 15.9997 11.5069C15.9997 9.02551 13.9881 7.01392 11.5067 7.01392ZM9.01367 11.5069C9.01367 10.1301 10.1298 9.01392 11.5067 9.01392C12.8836 9.01392 13.9997 10.1301 13.9997 11.5069C13.9997 12.8838 12.8836 14 11.5067 14C10.1298 14 9.01367 12.8838 9.01367 11.5069Z"
                fill="#ccc"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>
      </div>

      <div className="form-horizontal">
        <div className="total-data">
          <div className="data-string">
            <h2>Total</h2>
            <p>Patient data</p>
          </div>
          <h1>{data.length}</h1>
        </div>
        <div className="total-data">
          <div className="data-string">
            <h2>Total</h2>
            <p>Patient Discharged</p>
          </div>
          <h1>30</h1>
        </div>
        <div className="total-data">
          <div className="data-string">
            <h2>Total</h2>
            <p>Ongoing Treatments</p>
          </div>
          <h1>{data.length}</h1>
        </div>
      </div>
      <h1>Stored Data</h1>
      <div className="form-horizontal">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
        </form>
      </div>

      <div className="data-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Photo</th>
              <th>Admit Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} onClick={() => handleRowClick(index)}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="photo-thumbnail"
                  />
                </td>
                <td>{item.admitDate}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(index);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainContent;
