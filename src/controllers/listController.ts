import { Request, Response } from 'express';

export const listMeasurements = (req: Request, res: Response) => {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    
    if (measure_type && !['WATER', 'GAS'].includes(measure_type as string)) {
        return res.status(400).json({
            error_code: 'INVALID_TYPE',
            error_description: 'Tipo de medição não permitida.'
        });
    }

    
    const measures = [
        {
            measure_uuid: 'uuid1',
            measure_datetime: '2024-08-30T12:34:56Z',
            measure_type: 'WATER',
            has_confirmed: true,
            image_url: 'https://example.com/images/uuid1'
        },
        {
            measure_uuid: 'uuid2',
            measure_datetime: '2024-08-29T11:22:33Z',
            measure_type: 'GAS',
            has_confirmed: false,
            image_url: 'https://example.com/images/uuid2'
        }
    ];

    const filteredMeasures = measure_type
        ? measures.filter(m => m.measure_type === measure_type)
        : measures;

    if (filteredMeasures.length === 0) {
        return res.status(404).json({
            error_code: 'MEASURES_NOT_FOUND',
            error_description: 'Nenhuma leitura encontrada.'
        });
    }

    return res.status(200).json({
        customer_code,
        measures: filteredMeasures
    });
};
