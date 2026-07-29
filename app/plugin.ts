import createPlugin from "tailwindcss/plugin";

export default createPlugin(function({addUtilities, matchUtilities, theme }) {
  // addUtilities({
  //   '.mantine-Tree-root': {
  //     '.mantine-Tree-node': {
  //       '@apply relative flex flex-col': {},
  //     },
  //     '.mantine-Tree-subtree': {
  //       '@apply relative flex flex-col': {},
  //       '&:before': {
  //         content: '""',
  //         '@apply absolute w-px h-full bg-gray-900 opacity-50': {},
  //         left: 'calc(var(--level-offset) / 2)',
  //
  //       },
  //     },
  //   }
  // })
  matchUtilities({
    option: (value) => {
      console.log('relative', theme('relative'));
      return {
        '@apply relative flex flex-col': {},
        '&:after': {
          content: `"${value}"`,
        },
        '&::checkmark': {
          content: '""',
          '@apply absolute w-full h-full bg-accent -z-1': {}
        }
      }
    }
  })
})