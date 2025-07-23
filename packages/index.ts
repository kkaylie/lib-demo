import Button from './src/button.vue';
import type { App } from 'vue';

const components = [Button];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

export default {
  install,
};

export { Button };