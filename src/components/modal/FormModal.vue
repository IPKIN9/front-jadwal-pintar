<template>
	<div class="modal fade" :id="idModal" tabindex="-1" role="dialog">
		<div class="modal-dialog" :class="modalSize" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">{{ title }}</h5>
				</div>
				<div class="modal-body">
					<slot name="body"></slot>
				</div>
				<div class="modal-footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps({
		title: String,
		idModal: String,
		modalSize: {
			type: String,
			default: ''
		}
	})
</script>