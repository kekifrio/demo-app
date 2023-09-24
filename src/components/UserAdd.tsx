import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Person {
  name: string;
  national_id: string;
  phone_number: string;
  address: string;
  salary: string;
}

const PersonForm: React.FC = () => {
  const [formData, setFormData] = useState<Person>({
    name: "",
    national_id: "",
    phone_number: "",
    address: "",
    salary: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Person>("/api/person/create", formData);
      console.log(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  const router = useRouter();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <form className="text-black" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="national_id"
          value={formData.national_id}
          onChange={handleChange}
          placeholder="National ID"
        />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
        />
        <button
          onClick={() => router.push("/")}
          className="mt-4 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          type="submit"
        >
          Create Person
        </button>
      </form>
    </section>
  );
};

export default PersonForm;
