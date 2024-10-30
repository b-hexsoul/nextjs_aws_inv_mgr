import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dashboardRouter from "./routes/dashboard";
import productsRouter from "./routes/productRoutes";
import userRouter from './routes/userRoutes';
import expenseRoutes from './routes/expenseRoutes';

// APP CONFIG
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTING
app.use('/dashboard', dashboardRouter)
app.use('/products', productsRouter)
app.use('/users', userRouter)
app.use('/expenses', expenseRoutes);

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log("Server is running on port ", port);
});