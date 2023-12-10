"use client";

import React, { FC, ReactNode, useMemo } from "react";
import Header from "./Header";
import {
  Anchor,
  AppShell,
  Box,
  Breadcrumbs,
  Text,
  Paper,
  Title,
  Container,
  rem,
  useMantineTheme,
  Flex,
  Button,
  Stack,
} from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { V_SEPARATOR, capitalize } from "../utils/utils";
import { getDataFromGigSlug } from "@/domain/Gig/Gig.service";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import KofiButton from "kofi-button";

type Props = {
  children: ReactNode;
  title?: string;
  withPaper?: boolean;
};

const NAVBAR_HEIGHT = 64;

const frenchBreadcrumbDictionnary = {
  Compte: "Compte",
  "Ajout-concert": "Ajout d'un concert",
  Admin: "Administration",
  Gigs: "Concerts",
  Utilisateurs: "Utilisateurs",
  Edit: "Éditer",
  "A-propos": "À Propos",
};

const Layout: FC<Props> = ({ children, title, withPaper }: Props) => {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();
  const pinned = useHeadroom({ fixedAt: NAVBAR_HEIGHT * 2 });

  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathWithoutQuery = pathname.split("?")[0];
      const asPathNestedRoutes = asPathWithoutQuery
        .split("/")
        .filter((v) => v.length > 0);

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        let text = capitalize(subpath);
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        // Gig slug detection
        if (subpath.includes("_")) {
          const slugData = getDataFromGigSlug(decodeURIComponent(subpath));
          const { date, bandNames } = slugData;
          text = date + " - " + bandNames.join(V_SEPARATOR);
        } else {
          // TODO: quick dirty fix for french translation
          text = frenchBreadcrumbDictionnary[text] || text;
        }
        return {
          href,
          text: text,
        };
      });

      return [{ href: "/", text: "Accueil" }, ...crumblist];
    },
    [pathname],
  );

  const breadcrumbsItems = breadcrumbs.map((item, index) => (
    <Anchor href={item.href} key={index} component={Link}>
      {item.text}
    </Anchor>
  ));

  const childrenWithTitle = title ? (
    <>
      <Title order={1} mb={"sm"}>
        {title}
      </Title>
      {children}
    </>
  ) : (
    <>{children}</>
  );

  return (
    <AppShell
      header={{ height: NAVBAR_HEIGHT, collapsed: !pinned }}
      padding={{ base: "xs", sm: "md" }}
      navbar={{
        width: 120,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      withBorder={false}
      bg="#efefef"
    >
      <AppShell.Header>
        <Header navbarOpened={opened} toggleNavbar={toggle} />
      </AppShell.Header>

      <AppShell.Navbar p="xs" maw={250}>
        <Stack mt="sm">
          <Button component={Link} href="/">
            Accueil
          </Button>
          <Button component={Link} href="/a-propos">
            À Propos
          </Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main
        // Keep in sync with <AppShell> padding above
        pt={{
          base: `calc(${rem(64)} + var(--mantine-spacing-xs))`,
          sm: `calc(${rem(64)} + var(--mantine-spacing-md))`,
        }}
        style={{
          background: `#f4f4f4`,
        }}
      >
        <Container fluid px={0}>
          <Box style={{ overflowX: "clip" }}>
            <Breadcrumbs mb={4}>{breadcrumbsItems}</Breadcrumbs>
          </Box>
          {withPaper ? (
            <Paper p="md" mt="sm" bg="white" shadow="sm">
              {childrenWithTitle}
            </Paper>
          ) : (
            <Box mt={0}>{childrenWithTitle}</Box>
          )}
        </Container>
      </AppShell.Main>

      {/* Can't use AppShell.Footer because it's sticking above the content on mobile view */}
      <Paper w="100%" mt={0} p="sm" bg="white">
        <Flex
          align={{ base: "center", sm: "baseline" }}
          gap="sm"
          direction={{ base: "column", sm: "row" }}
          justify="center"
        >
          <Text size="sm">
            Développé par{" "}
            <Anchor href="https://clm-roig.github.io/" target="_blank">
              Clément ROIG
            </Anchor>{" "}
            © {new Date().getFullYear()}
            {" - "}
            <Anchor
              href="https://github.com/Clm-Roig/larsen-toulousaine"
              target="_blank"
            >
              Code source
            </Anchor>
          </Text>
          <Box>
            <KofiButton
              color={theme.colors.primary[6]}
              title="Achetez-moi un café"
              kofiID="clementroig"
            />
          </Box>
        </Flex>
      </Paper>
    </AppShell>
  );
};

export default Layout;
