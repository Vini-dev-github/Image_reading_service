// src/controllers/uploadController.ts
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const uploadImage = async (req: Request, res: Response) => {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Validação de tipos de dados
    if (typeof image !== 'string' || typeof customer_code !== 'string' ||
        !['WATER', 'GAS'].includes(measure_type)) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Dados fornecidos no corpo da requisição são inválidos.'
        });
    }

    // Verificação de leitura duplicada (mock)
    const isDuplicate = false; // Aqui você faria a lógica para verificar se já existe uma leitura no mês

    if (isDuplicate) {
        return res.status(409).json({
            error_code: 'DOUBLE_REPORT',
            error_description: 'Leitura do mês já realizada.'
        });
    }

    try {
        // Chamada à API do Google Gemini (mock)
        const measure_value = 1234; // Substituir pela chamada real e processamento do resultado

        const measure_uuid = uuidv4();
        const image_url = `https://example.com/images/${measure_uuid}`;

        return res.status(200).json({
            image_url,
            measure_value,
            measure_uuid
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao processar a imagem.' });
    }
};
