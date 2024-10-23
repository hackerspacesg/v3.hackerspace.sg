export const site = {
  title: 'HackerspaceSG',
  description: "The Singapore tech scene's community centre.",
  tagline: "the Singapore tech scene's community centre",
};

export const header = {
  navbar: [
    { label: 'About', href: '/about', icon: 'fa:info-circle' },
    { label: 'Visit', href: '/visit', icon: 'fa:map-marker' },
    { label: 'Membership', href: '/membership', icon: 'fa:users' },
    { label: 'Events', href: '/events', icon: 'fa:calendar' },
  ],
  navcta: { label: 'Join Us', href: '/membership', icon: 'lucide:user-plus' },
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} HackerspaceSG and <a href="https://github.com/hackerspacesg/v3.hackerspace.sg/graphs/contributors">contributors</a>. <a href="https://github.com/hackerspacesg/v3.hackerspace.sg/?tab=readme-ov-file#licences">Some rights reserved</a>.`,
  madein: 'Made with ❤️, mostly in Singapore.',
  oldschool: 'Visitor Count: 1,337 • Best viewed with Netscape Navigator',
  links: [
    {
      label: 'Terms of Use',
      href: '/terms',
    },
  ],
  cols: [
    {
      heading: 'Contribute',
      links: [
        {
          label: 'Support Us',
          href: '/support',
          icon: 'fa:heart',
        },
        {
          label: 'Sponsor Us',
          href: '/sponsor',
          icon: 'fa:handshake-o',
        },
        {
          label: 'Volunteer',
          href: '/volunteer',
          icon: 'fa:star',
        },
        {
          label: 'Open Collective',
          href: 'https://opencollective.com/hackerspacesg',
          icon: 'simple-icons:opencollective',
        },
        {
          label: 'GitHub Sponsors',
          href: 'https://github.com/sponsors/hackerspacesg/',
          icon: 'fa:github',
        },
      ],
    },
    {
      heading: 'Interact',
      links: [
        {
          label: 'Telegram Chat',
          href: 'https://t.me/HackerspaceSG',
          icon: 'fa:paper-plane',
        },
        {
          label: 'Google Group',
          href: 'https://groups.google.com/g/hackerspacesg',
          icon: 'fa:envelope',
        },
        {
          label: 'Facebook Group',
          href: 'https://facebook.com/groups/hackerspacesg/',
          icon: 'fa:facebook',
        },
        {
          label: 'GitHub',
          href: 'https://github.com/hackerspacesg/',
          icon: 'fa:github',
        },
      ],
    },
    {
      heading: 'Follow',
      links: [
        {
          label: 'Facebook',
          href: 'https://facebook.com/HackerspaceSG',
          icon: 'fa:facebook',
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com/hackerspacesg',
          icon: 'fa:twitter',
        },
        {
          label: 'Instagram',
          href: 'https://instagram.com/hackerspacesg',
          icon: 'fa:instagram',
        },
        {
          label: 'LinkedIn',
          href: 'https://linkedin.com/company/hackerspacesg/',
          icon: 'fa:linkedin',
        },
        {
          label: 'and more!',
          href: 'https://docs.hackerspace.sg/handbook/connect/',
          icon: 'lucide:ellipsis',
        },
      ],
    },
  ],
};
