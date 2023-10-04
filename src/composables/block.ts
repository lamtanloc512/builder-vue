import { BlockProperties } from 'grapesjs';
import { isEmpty } from 'lodash';

/**
 * @param defaultBlockId
 * @param overrideConfig = {};
 */
export const useBlock = (defaultBlockId = '', overrideConfig = {} as BlockProperties) => {
	let id = defaultBlockId;
	if (isEmpty(defaultBlockId)) {
		id = crypto.randomUUID();
	}

	const config: BlockProperties = {
		...overrideConfig,
	};

	return { id, config };
};
