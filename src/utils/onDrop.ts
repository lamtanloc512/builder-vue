export const loop = () => {
	const loop = (
		data: any[],
		key: any,
		callback: (arg0: any, arg1: any, arg2: any) => void,
	) => {
		data.some((item, index, arr) => {
			if (item.key === key) {
				callback(item, index, arr);
				return true;
			}
			if (item.children) {
				return loop(item.children, key, callback);
			}
			return false;
		});
	};
};
