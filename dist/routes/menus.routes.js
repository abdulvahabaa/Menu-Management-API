"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menus_controller_1 = require("../controllers/menus.controller");
const items_controller_1 = require("../controllers/items.controller");
const menusRoutes = express_1.default.Router();
menusRoutes.post("/", menus_controller_1.createMenu);
menusRoutes.get("/", menus_controller_1.getMenus);
menusRoutes.get("/:menuId", menus_controller_1.getMenu);
menusRoutes.patch("/:menuId", menus_controller_1.updateMenu);
menusRoutes.delete("/:menuId", menus_controller_1.deleteMenu);
menusRoutes.post("/:menuId/items", items_controller_1.addMenuItem);
menusRoutes.patch("/:menuId/items/:itemId", items_controller_1.updateMenuItem);
menusRoutes.delete("/:menuId/items/:itemId", items_controller_1.deleteMenuItem);
exports.default = menusRoutes;
