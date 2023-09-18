export type SelectedProps = {
	attributes: Selector['defaults'];
};

export type CustomSelectorEvent = {
	container: HTMLElement;
	selected: Array<SelectedProps>;
	states: Array<State>;
};
