<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';

const props = {
  content: {
    default: '',
  },
  options: {
    type: Object,
    default: () => ({}),
  }
};

export default {
  name: 'l-tooltip',
  props: props,
  data() {
    return {
    }
  },
  mounted() {
    this.mapObject = L.tooltip(this.options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.mapObject.setContent(this.content || this.$el);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindTooltip(this.mapObject);
  },
  beforeDestroy() {
    if (this.parentContainer.mapObject.getTooltip()) {
      this.parentContainer.mapObject.unbindTooltip();
    }
  },
};
</script>
