import { BlockProperties } from 'grapesjs';
import { isEmpty } from 'lodash';

/**
 * @param defaultBlockId
 * @param overrideConfig = {};
 */
export const useBlock = (defaultBlockId = '', overrideConfig = {} as BlockProperties) => {
	let blockId = defaultBlockId;
	if (isEmpty(defaultBlockId)) {
		blockId = crypto.randomUUID();
	}

	const config: BlockProperties = {
		...overrideConfig,
	};

	return [blockId, config];
};
