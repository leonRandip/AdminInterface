import "@mantine/core/styles.css";
import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  Text,
  Burger,
  Drawer,
  Stack,
  TextInput,
  Select,
  RangeSlider,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IconSearch, IconMapPin, IconUser } from "@tabler/icons-react";
import logo1 from "../../public/cmwlogo.svg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "/jobs" },
  { label: "Find Talents", href: "/talents" },
  { label: "About us", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
];

const linkStyles = (active: boolean): React.CSSProperties => ({
  textDecoration: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  backgroundColor: active ? "#f3f4f6" : "transparent",
  color: "#111827",
  display: "inline-block",
  fontWeight: 500,
  fontSize: "14px",
  transition: "all 0.2s ease",
  cursor: "pointer",
});

const JOB_TYPES = [
  { value: "fulltime", label: "Full Time" },
  { value: "parttime", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const LOCATIONS = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

export default function HeaderBar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();
  const isActive = (href: string) => router.pathname === href;

  // Filters state that live in header container per design
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 100]);

  useEffect(() => {
    // Emit current filters so jobs page can react
    window.dispatchEvent(
      new CustomEvent("filters:update", {
        detail: { searchQuery, selectedLocation, selectedJobType, salaryRange },
      })
    );
  }, [searchQuery, selectedLocation, selectedJobType, salaryRange]);

  return (
    <Box
      component="header"
      py="sm"
      bg="white"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottom: "1px solid #F2F4F7",
        backgroundColor: "white",
      }}
    >
      <Container size="lg">
        {/* Centered pill    container */}
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Paper
            shadow="sm"
            withBorder
            px={24}
            py={16}
            style={{
              width: 890,
              height: 80,
              borderRadius: 122,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#E5E7EB",
              boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
              display: "flex",
              alignItems: "center",
              background: "white",
            }}
          >
            <Group
              justify="space-between"
              align="center"
              wrap="nowrap"
              style={{ width: "100%" }}
            >
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src={logo1}
                  alt="Company logo"
                  width={48}
                  height={48}
                  priority
                />
              </Link>

              {/* Navigation Links with increased spacing */}
              <Group
                visibleFrom="sm"
                style={{ flex: 1, justifyContent: "center", gap: "24px" }}
              >
                {NAV_LINKS.map((link) => (
                  <Text
                    key={link.href}
                    component={Link}
                    href={link.href}
                    style={linkStyles(isActive(link.href))}
                    onMouseEnter={(e) => {
                      if (!isActive(link.href)) {
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(0,0,0,0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(link.href)) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    {link.label}
                  </Text>
                ))}
              </Group>

              {/* Create Jobs Button - exact spec */}
              <Group gap="11.14px" wrap="nowrap">
                <Button
                  onClick={() => {
                    const event = new CustomEvent("openCreateJobModal");
                    window.dispatchEvent(event);
                  }}
                  radius={12}
                  styles={{
                    root: {
                      width: 133,
                      height: 48,
                      padding: 5,
                      borderRadius: 25,
                      background:
                        "linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)",
                    },
                    label: { fontWeight: 600 },
                  }}
                >
                  Create Jobs
                </Button>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  aria-label="Toggle navigation"
                  hiddenFrom="sm"
                />
              </Group>
            </Group>
          </Paper>
        </Box>
      </Container>

      {/* Filters row BELOW the pill, OUTSIDE the container to start from far left */}
      <Box mt={20} style={{ width: "100%", paddingLeft: 48, paddingRight: 48 }}>
        <Group
          gap={32}
          align="center"
          wrap="nowrap"
          style={{
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "none",
          }}
        >
          {/* Search */}
          <Group gap={12} align="center" style={{ flex: 1, minWidth: 280 }}>
            <IconSearch size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Search By Job Title, Role"
              variant="unstyled"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              styles={{ input: { fontSize: 16, minWidth: 200 } }}
            />
          </Group>

          <Divider orientation="vertical" color="#E5E7EB" />

          {/* Location */}
          <Group gap={12} align="center" style={{ flex: 1, minWidth: 240 }}>
            <IconMapPin size={18} color="#9CA3AF" />
            <Select
              placeholder="Preferred Location"
              data={LOCATIONS}
              value={selectedLocation}
              onChange={setSelectedLocation}
              clearable
              variant="unstyled"
              styles={{ input: { fontSize: 16, minWidth: 180 } }}
            />
          </Group>

          <Divider orientation="vertical" color="#E5E7EB" />

          {/* Job Type */}
          <Group gap={12} align="center" style={{ flex: 1, minWidth: 200 }}>
            <IconUser size={18} color="#9CA3AF" />
            <Select
              placeholder="Job type"
              data={JOB_TYPES}
              value={selectedJobType}
              onChange={setSelectedJobType}
              clearable
              variant="unstyled"
              styles={{ input: { fontSize: 16, minWidth: 140 } }}
            />
          </Group>

          <Divider orientation="vertical" color="#E5E7EB" />

          {/* Salary slider */}
          <Box style={{ flex: 1, minWidth: 320 }}>
            <Group justify="space-between" align="center" mb={8}>
              <Text style={{ fontWeight: 600, color: "#111827" }}>
                Salary Per Month
              </Text>
              <Text style={{ color: "#6b7280" }}>
                ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
              </Text>
            </Group>
            <RangeSlider
              min={50}
              max={100}
              step={5}
              value={salaryRange}
              onChange={setSalaryRange}
              thumbSize={18}
              color="#111"
              styles={{
                track: { height: 4, backgroundColor: "#e5e7eb" },
                bar: { height: 4, backgroundColor: "#111" },
                thumb: {
                  background:
                    "radial-gradient(circle, #fff 0%, #fff 20%, #111 20%, #111 100%)",
                  border: "none",
                },
              }}
            />
          </Box>
        </Group>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        size="xs"
        title="Menu"
        hiddenFrom="sm"
      >
        <Stack gap="sm">
          {NAV_LINKS.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              variant={isActive(link.href) ? "light" : "subtle"}
              onClick={close}
            >
              {link.label}
            </Button>
          ))}
          <Button
            onClick={() => {
              const event = new CustomEvent("openCreateJobModal");
              window.dispatchEvent(event);
              close();
            }}
            radius={12}
            styles={{
              root: {
                width: 133,
                height: 48,
                padding: 5,
                borderRadius: 12,
                background:
                  "linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)",
              },
            }}
          >
            Create Jobs
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
