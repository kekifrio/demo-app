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
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <select
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        <table className="mt-4 min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">National ID</th>
              <th className="px-6 py-4">Phone Number</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredPersons.map((person, i) => (
              <tr key={i} className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4">{person.name}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {person.national_id}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {person.phone_number}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {person.address}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{person.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserCard;
