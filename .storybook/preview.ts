import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../packages/styles/index.css'
import '../packages/styles/theme.css'
import './storybook-theme.css';
import type { Preview } from '@storybook/vue3-vite'

const decorators = [
  withThemeByDataAttribute({
    themes: {
      Light: 'light', // "Light" 是显示在菜单里的名字, "light" 是 data-theme 的值
      Dark: 'dark',
    },
    defaultTheme: 'Light', // 默认主题
    attributeName: 'data-theme', // 要修改的属性名
  }),
];


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators,
};

export default preview;