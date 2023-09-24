import axios from "axios";
import React, { useEffect, useState } from "react";

interface personsArray {
  name: String;
  national_id: String;
  phone_number: String;
  address: String;
  salary: String;
}
function UserCard() {
  const [persons, setPersons] = useState<personsArray[]>([]);
  const [loading, setLoading] = useState(true);

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
    console.log(persons);
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {persons.length > 1 &&
            persons.map((person, i) => (
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
