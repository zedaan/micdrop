import { Preview } from '@storybook/svelte';
import '../src/app.css'; // Include your global styles

const preview:Preview = {
  parameters: {
    
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  argTypes: {
    slot: {
      control: 'text',
      description: 'Slot content'
    }
  }
};

export default preview;