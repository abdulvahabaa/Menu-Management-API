"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenuItem = exports.addMenuItem = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addMenuItem = async (req, res) => {
    const { menuId } = req.params;
    const { itemName, description, price } = req.body;
    if (!itemName || !description || !price) {
        return res
            .status(400)
            .json({ error: "itemName, description, price are required." });
    }
    try {
        const existingItem = await prisma.menuItem.findFirst({
            where: {
                itemName,
                menuId,
            },
        });
        if (existingItem) {
            return res.status(409).json({
                error: `Item with name "${itemName}" already exists in this menu.`,
            });
        }
        const menuItem = await prisma.menuItem.create({
            data: {
                itemName,
                description,
                price,
                menuId,
            },
        });
        res.json(menuItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add menu item." });
    }
};
exports.addMenuItem = addMenuItem;
const updateMenuItem = async (req, res) => {
    const { menuId, itemId } = req.params;
    const { itemName, description, price } = req.body;
    try {
        if (itemName) {
            const existingItem = await prisma.menuItem.findFirst({
                where: {
                    itemName,
                    menuId,
                    NOT: {
                        id: itemId,
                    },
                },
            });
            if (existingItem) {
                return res
                    .status(400)
                    .json({ error: "Item name already exists in this menu." });
            }
        }
        const updatedItem = await prisma.menuItem.update({
            where: { id: itemId },
            data: {
                itemName,
                description,
                price,
            },
        });
        res.json(updatedItem);
    }
    catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Menu item not found." });
        }
        res.status(500).json({ error: "Failed to update menu item." });
    }
};
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = async (req, res) => {
    const { menuId, itemId } = req.params;
    try {
        const item = await prisma.menuItem.findFirst({
            where: {
                id: itemId,
                menuId,
            },
        });
        if (!item) {
            return res.status(404).json({
                error: "Menu item not found or does not belong to the specified menu.",
            });
        }
        await prisma.menuItem.delete({
            where: { id: itemId },
        });
        res.json({ message: "Menu item deleted successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete menu item." });
    }
};
exports.deleteMenuItem = deleteMenuItem;
