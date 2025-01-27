"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenu = exports.updateMenu = exports.getMenu = exports.getMenus = exports.createMenu = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMenu = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create menu." });
    }
};
exports.createMenu = createMenu;
const getMenus = async (req, res) => {
    try {
        const menus = await prisma.menu.findMany({
            include: { items: true },
        });
        res.json(menus);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch menus." });
    }
};
exports.getMenus = getMenus;
const getMenu = async (req, res) => {
    const { menuId } = req.params;
    try {
        const menu = await prisma.menu.findUnique({
            where: { id: menuId },
            include: { items: true },
        });
        if (!menu)
            return res.status(404).json({ error: "Menu not found." });
        res.json(menu);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch menu." });
    }
};
exports.getMenu = getMenu;
const updateMenu = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Menu not found." });
        }
        return res.status(500).json({ error: "Failed to update menu." });
    }
};
exports.updateMenu = updateMenu;
const deleteMenu = async (req, res) => {
    const { menuId } = req.params;
    try {
        await prisma.menu.delete({
            where: { id: menuId },
        });
        res.json({ message: "Menu deleted successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete menu." });
    }
};
exports.deleteMenu = deleteMenu;
