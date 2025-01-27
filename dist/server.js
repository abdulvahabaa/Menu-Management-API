"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const menus_routes_1 = __importDefault(require("./routes/menus.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:9000",
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, cors_1.default)(corsOptions));
app.use("/api/v1/menus", menus_routes_1.default);
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not Found" });
});
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("working");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
