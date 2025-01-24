import exress, { Router } from "express";
import {
  createMenu,
  getMenus,
  getMenu,
  updateMenu,
  deleteMenu,
} from "../controllers/menus.controller";
import {
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
} from "../controllers/items.controller";

const menusRoutes: Router = exress.Router();

menusRoutes.post("/", createMenu);
menusRoutes.get("/", getMenus);
menusRoutes.get("/:menuId", getMenu);
menusRoutes.patch("/:menuId", updateMenu);
menusRoutes.delete("/:menuId", deleteMenu);
menusRoutes.post("/:menuId/items", addMenuItem);
menusRoutes.patch("/:menuId/items/:itemId", updateMenuItem);
menusRoutes.delete("/:menuId/items/:itemId", deleteMenuItem);

export default menusRoutes;
