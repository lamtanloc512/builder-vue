export function translateChinese() {
	const colorPickerLabel = document.querySelectorAll('.t-radio-button__label');
	if (colorPickerLabel.length > 0) {
		colorPickerLabel.forEach((el: any) => {
			if (el.innerHTML == '单色' || el.innerText == '单色') {
				el.innerHTML = 'Monochrome';
			}
			if (el.innerHTML == '渐变' || el.innerText == '渐变') {
				el.innerHTML = 'Linear';
			}
		});
	}
	const colorPickerSwactchTitle = document.querySelectorAll(
		'.t-color-picker__swatches-wrap .t-color-picker__swatches--title span',
	);
	if (colorPickerSwactchTitle.length > 0) {
		colorPickerSwactchTitle.forEach((el: any) => {
			if (el.innerHTML == '最近使用颜色' || el.innerText == '最近使用颜色') {
				el.innerHTML = 'Recent';
			}
			if (el.innerHTML == '系统预设颜色' || el.innerText == '系统预设颜色') {
				el.innerHTML = 'Default';
			}
		});
	}
}
