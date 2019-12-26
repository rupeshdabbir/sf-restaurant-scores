/* Algorithm to determine what the score would be */

const risk = {
	'LOW': 'Low Risk',
	'MED': 'Moderate Risk',
	'HIGH': 'High Risk'
}


/*
 * Compute score takes an account 2 parameters while coming up with a score:
 *  A) "Inspection Score"  - This is the score officially given by sfgov/
 *  B) "Risk Category" - This identifies what kind of risk does the inspection pose.

 * Note: sfgov has given same scores for "Medium" and "low" risk factors.
 * Hence, the aim of my "Confidence Score" is to provide an accurate confidence value based on these two
 * Parameters in the big picture.

 * Algorithm:
   - If risk category is "LOW": 
      Score    :  GRADE
   	- <90-100> - A
   	- <80-99>  - A-
   	- 80 and below: B

   	and so on for other risk categories.
*/

export function computeScore(score, category) {
	if(score === 0 || category === 'unspecified') return 'F';

	/* Algorithm to compute risk analysis score */

	switch (category) {
		case risk.LOW:
			return computeLowRiskScore(score);
		case risk.MED:
			return computeMediumRiskScore(score);
		case risk.HIGH:
			return computeHighRiskScore(score);
	}
}



/* Helper Methods */
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