import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createMenu = async (req: Request, res: Response): Promise<any> => {
  const { menuName, description } = req.body;

  if (!menuName || !description) {
    return res
      .status(400)
      .json({ error: "menuName and description are required." });
  }

  try {
    const existingMenu = await prisma.menu.findFirst({
      where: { menuName },
    });

    if (existingMenu) {
      return res
        .status(409)
        .json({ error: `Menu with name "${menuName}" already exists.` });
    }

    const menu = await prisma.menu.create({
      data: { menuName, description },
    });

    return res.status(201).json(menu);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create menu." });
  }
};

export const getMenus = async (req: Request, res: Response) => {
  try {
    const menus = await prisma.menu.findMany({
      include: { items: true },
    });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menus." });
  }
};

export const getMenu = async (req: any, res: any) => {
  const { menuId } = req.params;
  try {
    const menu = await prisma.menu.findUnique({
      where: { id: menuId },
      include: { items: true },
    });
    if (!menu) return res.status(404).json({ error: "Menu not found." });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu." });
  }
};

export const updateMenu = async (
  req: Request<{ menuId: string }>,
  res: Response
): Promise<any> => {
  const { menuId } = req.params;
  const { menuName, description } = req.body;

  try {
    const existingMenu = await prisma.menu.findFirst({
      where: {
        menuName,
        id: {
          not: menuId,
        },
      },
    });

    if (existingMenu) {
      return res.status(409).json({
        error: `Menu with name "${menuName}" already exists.`,
      });
    }

    const updatedMenu = await prisma.menu.update({
      where: { id: menuId },
      data: {
        menuName,
        description,
      },
    });

    return res.json(updatedMenu);
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Menu not found." });
    }
    return res.status(500).json({ error: "Failed to update menu." });
  }
};

export const deleteMenu = async (
  req: Request<{ menuId: string }>,
  res: Response
): Promise<any> => {
  const { menuId } = req.params;

  try {
    await prisma.menu.delete({
      where: { id: menuId },
    });

    res.json({ message: "Menu deleted successfully." });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete menu." });
  }
};
