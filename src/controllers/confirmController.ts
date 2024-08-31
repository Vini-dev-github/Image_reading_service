import { Request, Response } from 'express';

export const confirmMeasurement = (req: Request, res: Response) => {
    const { measure_uuid, confirmed_value } = req.body;

    
    if (typeof measure_uuid !== 'string' || typeof confirmed_value !== 'number') {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Dados fornecidos no corpo da requisição são inválidos.'
        });
    }

    
    const isMeasureExists = true;
    const isConfirmed = false;

    if (!isMeasureExists) {
        return res.status(404).json({
            error_code: 'MEASURE_NOT_FOUND',
            error_description: 'Leitura não encontrada.'
        });
    }

    if (isConfirmed) {
        return res.status(409).json({
            error_code: 'CONFIRMATION_DUPLICATE',
            error_description: 'Leitura já confirmada.'
        });
    }

    return res.status(200).json({ success: true });
};
