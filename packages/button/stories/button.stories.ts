// packages/my-button/button.stories.ts

import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '../src/button.vue';

// 1. Meta: 组件的元数据
// 这个对象定义了故事在 Storybook UI 中的分组、标题等信息
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // 故事在侧边栏中的路径
  component: Button, // 关联的组件
  tags: ['autodocs'], // 启用自动文档生成
  // argTypes 用于配置 "Controls" 面板中每个 prop 的交互方式
  argTypes: {
    type: {
      control: 'select', // 使用下拉选择框
      options: ['default', 'primary'], // 可选项
    },
  },
};

export default meta;

// 2. Story: 组件的具体故事
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // 添加 render 函数来正确处理 slot
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">{{ args.default }}</Button>',
  }),
  args: {
    // args 用于设置组件的 props 和 slot 内容
    default: 'Default Button', // 这个值现在会被 template 使用
    disabled: false,
    type: 'default',
  },
};

export const Primary: Story = {
  // 对其他故事也应用相同的模式
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">{{ args.default }}</Button>',
  }),
  args: {
    default: 'Primary Button',
    disabled: false,
    type: 'primary',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">{{ args.default }}</Button>',
  }),
  args: {
    ...Primary.args, // 复用 Primary 故事的 props
    default: 'Disabled Button',
    disabled: true,
  },
};