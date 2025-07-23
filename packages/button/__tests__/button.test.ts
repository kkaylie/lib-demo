// 从 vitest 导入测试 API
import { describe, it, expect } from 'vitest';

// 从 @vue/test-utils 导入 mount 方法
import { mount } from '@vue/test-utils';

// 导入你要测试的组件
import Button from '../src/button.vue';

// --- 开始编写测试 ---

// 第一个测试分组：测试 Button 组件的 Props
describe('Button.vue - Props', () => {

  // 测试用例 1: 测试 type prop
  it('should render the correct style based on the type prop', () => {
    // 1. Arrange (准备): 挂载组件，并传入 props
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
    });

    // 2. Act (行动): 这里是渲染，我们直接检查结果

    // 3. Assert (断言): 检查组件的 class 是否包含了 'my-button--primary'
    expect(wrapper.classes()).toContain('my-button--primary');
  });

  it('should render the correct style based on the type prop', () => {
    const wrapper = mount(Button, {
      props: {
      },
    });

    expect(wrapper.classes()).toContain('my-button--default');
  });

  it('should render the correct style based on the type prop', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'default',
      },
    });

    expect(wrapper.classes()).toContain('my-button--default');
  });

  it('should render the correct style based on the size prop', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'small',
      },
    });

    expect(wrapper.classes()).toContain('my-button--small');
  });

  it('should render the correct style based on the size prop', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'large',
      },
    });

    expect(wrapper.classes()).toContain('my-button--large');
  });

  it('should render the correct style based on the size prop', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'medium',
      },
    });

    expect(wrapper.classes()).toContain('my-button--medium');
  });

  // 测试用例 2: 测试 disabled prop
  it('should be disabled when the disabled prop is true', () => {
    // 1. Arrange: 挂载组件，并传入 props
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });

    // 2. Assert: 检查按钮的 disabled 属性是否存在
    // attributes() 返回一个对象，包含 DOM 元素的所有属性
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  // 测试用例 3: 测试 slot 内容
  it('should render slot content', () => {
    const slotContent = 'Click Me';
    const wrapper = mount(Button, {
      slots: {
        default: slotContent,
      },
    });

    // text() 返回组件渲染出的文本内容
    expect(wrapper.text()).toBe(slotContent);
  });
});


// 第二个测试分组：测试 Button 组件的事件 (Handler)
describe('Button.vue - Events', () => {

  // 测试用例 4: 测试点击事件
  it('should emit a click event when clicked', async () => {
    // 1. Arrange: 挂载组件
    const wrapper = mount(Button);

    // 2. Act: 找到按钮并触发它的点击事件
    // 找到内部的 <button> 元素并模拟一次点击
    // .trigger() 是一个异步操作，所以需要 await
    await wrapper.find('button').trigger('click');

    // 3. Assert: 检查 'click' 事件是否被触发了
    // .emitted() 返回一个对象，记录了所有被触发的事件
    expect(wrapper.emitted()).toHaveProperty('click');

    // 也可以检查事件被触发的次数
    expect(wrapper.emitted().click).toHaveLength(1);
  });

  // 测试用例 5: 测试禁用状态下不触发事件
  it('should not emit a click event when disabled', async () => {
    // 1. Arrange: 挂载一个被禁用的按钮
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });

    // 2. Act: 尝试点击它
    await wrapper.find('button').trigger('click');

    // 3. Assert: 检查 'click' 事件是否 **没有** 被触发
    expect(wrapper.emitted().click).toBeUndefined();
  });

  describe('Button.vue - Snapshot', () => {

    // 测试用例 1: 默认状态下的快照
    it('should match the snapshot for a default button', () => {
      // 1. Arrange: 挂载组件
      const wrapper = mount(Button, {
        slots: {
          default: 'Default Button'
        }
      });

      // 2. Assert: 断言组件的 HTML 结构与快照匹配
      // toMatchSnapshot() 是 Vitest 提供的快照断言
      expect(wrapper.html()).toMatchSnapshot();
    });

    // 测试用例 2: 带有一系列 props 状态下的快照
    it('should match the snapshot for a primary and disabled button', () => {
      // 1. Arrange: 挂载一个更复杂的组件状态
      const wrapper = mount(Button, {
        props: {
          type: 'primary',
          disabled: true,
        },
        slots: {
          default: 'Disabled Primary'
        }
      });

      // 2. Assert: 对这个状态也进行一次快照
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});