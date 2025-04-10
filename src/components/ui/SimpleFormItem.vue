<template>
  <DxSimpleItem
    :data-field="dataField"
    :editor-type="editorType"
    :label="label"
    :editor-options="editorOptions"
  />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { DxSimpleItem } from "devextreme-vue/form"; // Import DxSimpleItem

// Define props for the component
defineProps<{
  dataField: string;
  editorType: string;
  label: { text?: string; visible?: boolean };
  editorOptions: Record<string, unknown>;
}>();
</script>
