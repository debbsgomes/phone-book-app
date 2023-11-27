import express from 'express';
import cors from 'cors';
import router from './routes/route.js';
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.get('/', (req, res) => {
    res.send('Hello, ES module-enabled Express with TypeScript!');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map