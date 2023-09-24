import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session || !session.user)
      return res.status(401).json({
        message: "Unauthorized",
      });
    const { name, national_id, phone_number, address, salary } = req.body;

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

    res.status(200).json({ message: "User created" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
