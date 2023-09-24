import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const session = await getSession({ req });

    if (!session || !session.user)
      return res.status(401).json({
        message: "Unauthorized",
      });

    const prisma = new PrismaClient();
    const persons = await prisma.person.findMany();
    await prisma.$disconnect();

    res.status(200).json({ data: persons });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
