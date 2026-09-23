const weekDaysET = ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'];
const folkMonthNamesET = ['näärikuu', 'küünlakuu', 'paastukuu', 'jürikuu', 'lehekuu', 'jaanikuu', 'heinakuu', 'lõikuskuu', 'mihklikuu', 'porikuu', 'talvekuu', 'jõulukuu'];
//function dateFormattedET(){

const dateFormattedET = function(monthType = 0){
	let timeNow = new Date();
	const monthNamesET = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
	let monthName = monthNamesET[timeNow.getMonth()];
	if(monthType === 1){
    monthName = monthNamesET[timeNow.getMonth()] + '(' + folkMonthNamesET[timeNow.getMonth()] + ')';
}
	return timeNow.getDate() + '. ' + monthName + ' ' + timeNow.getFullYear();
}
function addLeadZero(numValue){
	if(numValue < 10){
		numValue = '0' + numValue;
	}
	return numValue;
}

const timeFormattedET = function(){
	let timeNow = new Date();
	let hourNow = timeNow.getHours();
	let minuteNow = timeNow.getMinutes();
	let secondNow = timeNow.getSeconds();
	return hourNow + ':' + addLeadZero(minuteNow) + ':' + addLeadZero(secondNow);
}
const weekDayFormattedET = function(){
    const timeNow = new Date();
    return weekDaysET[timeNow.getDay()];
}
module.exports = {dateET: dateFormattedET, timeET: timeFormattedET, weekDayET: weekDayFormattedET}