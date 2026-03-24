import express from 'express';
import { getHealthCheck } from '../controllers/healthController';

const router = express.Router();


router.get('/health', getHealthCheck);


export default router;