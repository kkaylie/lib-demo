// TODO: update Storybook UI theme dynamically based on global settings
// import { addons } from 'storybook/preview-api';
// import { addons as managerAddons } from 'storybook/manager-api';
// import { themes } from 'storybook/theming';
// import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

// const channel = addons.getChannel();
// console.log('Globals updated123:', global);

// channel.on(GLOBALS_UPDATED, (args) => {
//   console.log('Globals updated:', args);
//   const themeName = args.globals.theme;

//   managerAddons.setConfig({
//     theme: themeName === 'dark' ? themes.dark : themes.light,
//   });
// });