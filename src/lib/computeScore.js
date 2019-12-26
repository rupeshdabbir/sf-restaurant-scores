/* Algorithm to determine what the score would be */

const risk = {
	'LOW': 'Low Risk',
	'MED': 'Moderate Risk',
	'HIGH': 'High Risk'
}

export function computeScore(score, category) {
	if(score === 0 || category === 'unspecified') return 'F';

	/* Algorithm to compute risk analysis score */

	switch (category) {
		case risk.LOW:
			return computeLowRiskScore(score);
			// break;
		case risk.MED:
			return computeMediumRiskScore(score);
			// break;
		case risk.HIGH:
			return computeHighRiskScore(score);
			// break;
	}
}

function computeLowRiskScore(score) {
	if(isHighScore(score)) return 'A';
	if(isModerateScore(score)) return 'A-';
	if(isLowScore(score)) return 'B';
}

function computeMediumRiskScore(score) {
	if(isHighScore(score)) return 'B';
	if(isModerateScore(score)) return 'B-';
	if(isLowScore(score)) return 'C';
}

function computeHighRiskScore(score) {
	if(isHighScore(score)) return 'C';
	if(isModerateScore(score)) return 'C-';
	if(isLowScore(score)) return 'D';
}

function isHighScore(score) {
	return score >= 90;
}

function isModerateScore(score) {
	return score < 90 && score >= 80;
}

function isLowScore(score) {
	return score < 80;
}