import { computeScore } from './computeScore';

export function sanitizeData(data) {
	console.log("Inside sanitizeData", data);

	const validators = ['business_postal_code', 'business_phone_number', 'inspection_score', 'risk_category'];

	for(let i=0; i<data.length; i++) {

		validators.forEach(validator => {
			if(!data[i][validator]) {
				switch(validator) {
					case "business_postal_code":
						data[i][validator] = 'N/A';
						break;
					case "business_phone_number":
						data[i][validator] = '-';
						break;
					case "business_postal_code":
						data[i][validator] = '00000';
						break;	
					case "inspection_score":
						data[i][validator] = 0;
						break;					
					case "risk_category":
						data[i][validator] = 'unspecified';
						break;	
				}
			}
		});


		const { inspection_score, risk_category } = data[i];

		const grade = computeScore(inspection_score, risk_category);
		data[i]['grade'] = grade;
	}

	return data;
}