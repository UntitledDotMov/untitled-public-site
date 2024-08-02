'use client';
import { AppShell, Burger, Button, Group, NavLink, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { IconHome, IconList, IconVideo } from '@tabler/icons-react';
import Image from 'next/image';
const links = [
  {
    name: 'Home',
    path: '/',
    icon: IconHome,
  },
  {
    name: 'Videos',
    path: '/videos',
    icon: IconVideo,
  },
];
export default function Navbar({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const path = usePathname();
  const router = useRouter();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <Group justify='start' style={{ flex: 1 }}>
            <Image src='/untitled-logo.png' alt='Logo' width={40} height={40} />
            <Text size='xl'> Untitled.mov </Text>
            <Group ml='xl' gap={0} visibleFrom='sm'>
              {links.map((link) => (
                <Button
                  key={link.path}
                  variant='subtle'
                  m={'md'}
                  onClick={() => router.push(link.path)}
                >
                  {link.icon && <link.icon size={20} />}
                  <Text size='sm'>{link.name}</Text>
                </Button>
              ))}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py='md' px={4}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            active={link.path === '/' ? path === link.path : path.startsWith(link.path)}
            href={`${link.path}`}
            label={link.name}
            leftSection={<link.icon />}
          ></NavLink>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
