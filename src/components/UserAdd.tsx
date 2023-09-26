import type { ChangeEvent, FormEvent } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { useRouter } from "next/router";

interface Person {
  name: string;
  national_id: string;
  phone_number: string;
  address: string;
  salary: string;
}

const nationalIdSchema = z
  .string()
  .regex(/^(1[0-3]|[1-9]|E|N|PE)-\d{1,4}-\d{1,4}$/);

const nameSchema = z.string().regex(/^(?! )[A-Za-z]+(?: [A-Za-z]+)*$/);

const phoneNumberSchema = z.string().regex(/^6\d{7}$/);

const salarySchema = z.string().regex(/^[1-9]\d*(\.\d{2})?$/);

const addressSchema = z.string().regex(/^[a-zA-Z0-9,. ']+$/);

const PersonForm: React.FC = () => {
  const [formData, setFormData] = useState<Person>({
    name: "",
    national_id: "",
    phone_number: "",
    address: "",
    salary: "",
  });

  const [validationResults, setValidationResults] = useState<
    Record<string, boolean>
  >({
    name: true,
    national_id: true,
    phone_number: true,
    address: true,
    salary: true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  useEffect(() => {
    const validateInputs = () => {
      const results: Record<string, boolean> = {};
      results.name = nameSchema.safeParse(formData.name).success;
      results.national_id = nationalIdSchema.safeParse(
        formData.national_id,
      ).success;
      results.phone_number = phoneNumberSchema.safeParse(
        formData.phone_number,
      ).success;
      results.address = addressSchema.safeParse(formData.address).success;
      results.salary = salarySchema.safeParse(formData.salary).success;
      setValidationResults(results);
    };

    validateInputs();
  }, [formData]);

  const router = useRouter();

  return (
    <section className="flex min-h-screen flex-row items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="m-4 flex flex-col items-center justify-center">
        <form
          className="flex flex-col justify-center text-black"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
            placeholder="Name"
            className="m-1 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <input
            type="text"
            name="national_id"
            value={formData.national_id}
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
            placeholder="National ID"
            className="m-1 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
            placeholder="Phone Number"
            className="m-1 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
            placeholder="Address"
            className="m-1 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
            placeholder="Salary"
            className="m-1 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <button
            className="m-6  rounded-md bg-indigo-500 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            type="submit"
            onClick={() => router.push("/")}
          >
            Create Person
          </button>
        </form>
      </div>
      <div className="m-4 flex flex-col items-center justify-center ">
        {/* Invalid name */}
        {!validationResults.name && formData.name.trim() !== "" && (
          <div
            className="mb-4 rounded-lg bg-red-100 px-4 py-1.5 text-center text-red-700"
            role="alert"
          >
            Invalid name
          </div>
        )}
        {/* Invalid Nationa ID */}
        {!validationResults.national_id &&
          formData.national_id.trim() !== "" && (
            <div
              className="mb-4 rounded-lg bg-red-100 px-4 py-1.5 text-center text-red-700"
              role="alert"
            >
              Invalid national ID
            </div>
          )}
        {/* Invalid Phone Number */}
        {!validationResults.phone_number &&
          formData.phone_number.trim() !== "" && (
            <div
              className="mb-4 rounded-lg bg-red-100 px-4 py-1.5 text-center text-red-700"
              role="alert"
            >
              Invalid phone number
            </div>
          )}
        {/* Invalid Address */}
        {!validationResults.address && formData.address.trim() !== "" && (
          <div
            className="mb-4 rounded-lg bg-red-100 px-4 py-1.5 text-center text-red-700"
            role="alert"
          >
            Invalid Address
          </div>
        )}
        {/* Invalid Salary */}
        {!validationResults.salary && formData.salary.trim() !== "" && (
          <div
            className="mb-4 rounded-lg bg-red-100 px-4 py-1.5 text-center text-red-700"
            role="alert"
          >
            Invalid salary
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonForm;
