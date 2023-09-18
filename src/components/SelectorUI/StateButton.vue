<script setup lang="ts">
	import { DropdownButton, Doption } from '@arco-design/web-vue';
	import { IconDown } from '@arco-design/web-vue/es/icon';
	import { State } from 'grapesjs';

	const props = defineProps<
		Partial<{
			states: State[];
			state: any;
		}>
	>();

	const emit = defineEmits<{
		changeStateEvent: [state: string];
	}>();

	type ValueType = string | number | Record<string, any> | undefined;
	const handleSelect = (value: ValueType, _: Event): void => {
		emit('changeStateEvent', value ? value.toString() : '');
	};
</script>
<template>
	<DropdownButton
		size="small"
		@select="handleSelect">
		{{ state ? state : 'State' }}
		<template #icon>
			<IconDown />
		</template>
		<template #content>
			<Doption
				v-for="state in props.states"
				:key="state.getName()"
				>{{
					state.getLabel()
						? state.getLabel().charAt(0).toUpperCase() +
						  state.getLabel().slice(1)
						: 'No State'
				}}
			</Doption>
		</template>
	</DropdownButton>
</template>
