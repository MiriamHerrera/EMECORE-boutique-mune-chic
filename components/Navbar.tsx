'use client';

import React from 'react';
import { Navbar as FlowbiteNavbar, Button, Dropdown, Avatar } from 'flowbite-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <FlowbiteNavbar fluid rounded>
      <FlowbiteNavbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Mune Chic
        </span>
      </FlowbiteNavbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <FlowbiteNavbar.Toggle />
      </div>
      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link href="/" active>
          Home
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/products">
          Products
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/categories">
          Categories
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/about">
          About
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/contact">
          Contact
        </FlowbiteNavbar.Link>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
} 