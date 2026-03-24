import { Request, Response } from 'express';


export const getHealthCheck = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: 'ok',
      message: 'service is running',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error'
    });
  }
};

