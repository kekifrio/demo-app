import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";
import { z } from "zod";

const nationalIdSchema = z
  .string()
  .regex(/^(1[0-3]|[1-9]|E|N|PE)-\d{1,4}-\d{1,4}$/);

const nameSchema = z.string().regex(/^(?! )[A-Za-z]+(?: [A-Za-z]+)*$/);

const phoneNumberSchema = z.string().regex(/^6\d{7}$/);

const salarySchema = z.string().regex(/^[1-9]\d*$/);

const addressSchema = z.string().regex(/^[a-zA-Z0-9,. ']+$/);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (session)
      return res.status(401).json({
        message: "Unauthorized",
      });

    const { name, national_id, phone_number, address, salary } = req.body;

    const validationName = nameSchema.safeParse(name);
    if (!validationName.success) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    const validationNational_id = nationalIdSchema.safeParse(national_id);
    if (!validationNational_id.success) {
      return res.status(400).json({ message: "Invalid national_id format" });
    }

    const validationSalary = salarySchema.safeParse(salary);
    if (!validationSalary.success) {
      return res.status(400).json({ message: "Invalid salary format" });
    }

    const validationPhone_number = phoneNumberSchema.safeParse(phone_number);
    if (!validationPhone_number.success) {
      return res.status(400).json({ message: "Invalid phone_number format" });
    }

    const validationAddress = addressSchema.safeParse(address);
    if (!validationAddress.success) {
      return res.status(400).json({ message: "Invalid address format" });
    }

    const prisma = new PrismaClient();
    const person = await prisma.person.create({
      data: {
        name,
        national_id,
        phone_number,
        address,
        salary,
      },
    });
    await prisma.$disconnect();

    res.status(200).json(person);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
