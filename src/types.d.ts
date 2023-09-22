import type * as grapesjs from 'grapesjs';

export type SelectedProps = {
	attributes: Selector['defaults'];
};

export type CustomSelectorEvent = {
	container: HTMLElement;
	selected: Array<SelectedProps>;
	states: Array<State>;
};

export declare module grapesjs {}
