import { Mobile } from "@prisma/client";
import prisma from "../libs/prisma";
import ApiError from "../errors/apiError";

const addMobile = async (mobile: Mobile): Promise<Mobile | null> => {
  const result = await prisma.mobile.create({
    data: mobile,
  });

  if (!result) {
    throw new ApiError(403, "Mobile not added");
  }

  return result;
};

const getAllRecentMobiles = async (): Promise<Mobile[] | null> => {
  const result = await prisma.mobile.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return result;
};

const getAllMobiles = async (): Promise<Mobile[] | null> => {
  const result = await prisma.mobile.findMany({});

  return result;
};

const getSingleMobile = async (id: string): Promise<Mobile | null> => {
  const result = await prisma.mobile.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateMobile = async (
  id: string,
  data: Partial<Mobile>
): Promise<Mobile | null> => {
  const result = await prisma.mobile.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteMobile = async (id: string): Promise<Mobile | null> => {
  const result = await prisma.mobile.delete({
    where: {
      id,
    },
  });

  return result;
};

export const mobileService = {
  addMobile,
  getAllMobiles,
  getAllRecentMobiles,
  getSingleMobile,
  updateMobile,
  deleteMobile,
};
