import React, { useEffect, useState } from "react";
import axios from "axios";

interface personsArray {
  name: string;
  national_id: string;
  phone_number: string;
  address: string;
  salary: string;
}

function UserCard() {
  const [persons, setPersons] = useState<personsArray[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const getAllPersons = async () => {
    try {
      const response = await axios.get("/api/person/getAll");
      setPersons(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPersons();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) => {
    if (searchTerm === "") {
      return true; // Return all persons if search term is empty
    }

    // Filter based on selected attribute
    if (filter === "name") {
      return person.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    } else if (filter === "national_id") {
      return person.national_id
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
    } else if (filter === "phone_number") {
      return person.phone_number
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
    } else if (filter === "address") {
      return person.address.toLowerCase().startsWith(searchTerm.toLowerCase());
    } else if (filter === "salary") {
      return person.salary.toLowerCase().startsWith(searchTerm.toLowerCase());
    }

    return true; // Return all persons if no filter is selected
  });

  return (
    <div>
      <div>
        <input
          className="text-black"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <select
          className="text-black"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="name">Name</option>
          <option value="national_id">National ID</option>
          <option value="phone_number">Phone Number</option>
          <option value="address">Address</option>
          <option value="salary">Salary</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredPersons.map((person, i) => (
            <li key={i}>
              <strong>Name:</strong> {person.name}
              <br />
              <strong>National ID:</strong> {person.national_id}
              <br />
              <strong>Phone Number:</strong> {person.phone_number}
              <br />
              <strong>Address:</strong> {person.address}
              <br />
              <strong>Salary:</strong> {person.salary}
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserCard;
