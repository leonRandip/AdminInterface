import "@mantine/core/styles.css";
import {
  Box,
  Container,
  Paper,
  Text,
  Grid,
  Card,
  Badge,
  Button,
  Stack,
  Avatar,
  Divider,
  Modal,
  Textarea,
  NumberInput,
  TextInput,
  Select,
  Group,
} from "@mantine/core";
import {
  IconUser,
  IconBuilding,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

// Job form schema
const jobSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  jobType: z.string().min(1, "Job type is required"),
  salaryMin: z.number().min(0, "Minimum salary must be positive"),
  salaryMax: z.number().min(0, "Maximum salary must be positive"),
  jobDescription: z
    .string()
    .min(10, "Job description must be at least 10 characters"),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
});

type JobFormData = z.infer<typeof jobSchema>;

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://adminbackend-fuxg.onrender.com";

// Job interface matching backend entity
interface Job {
  id: number;
  title: string;
  company: string;
  logo?: string;
  logoColor?: string;
  experience: string;
  workType: string;
  salary: string;
  timePosted: string;
  location: string;
  description: string[];
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  jobDescription?: string;
  applicationDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

// API functions
const fetchJobs = async (): Promise<Job[]> => {
  // In development, use backup data by default
  if (
    process.env.NODE_ENV === "development" ||
    !process.env.NEXT_PUBLIC_API_URL
  ) {
    console.log("Development mode: Using backup data");
    return BACKUP_JOBS;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    const data = await response.json();
    return data.jobs || [];
  } catch (error) {
    console.error("Error fetching jobs from API, using backup data:", error);
    // Return backup data when API fails
    return BACKUP_JOBS;
  }
};

const createJob = async (jobData: JobFormData): Promise<Job | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: jobData.jobTitle,
        company: jobData.companyName,
        location: jobData.location,
        jobType: jobData.jobType,
        workType: jobData.jobType,
        salary: `${jobData.salaryMin}LPA`,
        salaryMin: jobData.salaryMin,
        salaryMax: jobData.salaryMax,
        jobDescription: jobData.jobDescription,
        applicationDeadline: jobData.applicationDeadline,
        experience: "1-3 yr Exp", // Default value
        timePosted: "24h Ago", // Default value
        description: ["Job description"], // Default value
        logo: "/default-logo.png", // Default value
        logoColor: "#6b7280", // Default value
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create job");
    }

    const newJob = await response.json();
    return newJob;
  } catch (error) {
    console.error("Error creating job:", error);
    return null;
  }
};

// Hardcoded backup job data
const BACKUP_JOBS: Job[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Amazon",
    logo: "/amazon.png",
    logoColor: "#FF9900",
    experience: "1-3 yr Exp",
    workType: "Onsite",
    salary: "12LPA",
    timePosted: "24h Ago",
    location: "Bangalore",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    jobType: "Full Time",
    salaryMin: 12,
    salaryMax: 12,
    jobDescription:
      "We are looking for a Full Stack Developer to join our team and help build scalable web applications.",
    applicationDeadline: "2024-12-31",
    createdAt: "2024-08-11T10:00:00Z",
    updatedAt: "2024-08-11T10:00:00Z",
  },
  {
    id: 2,
    title: "Node Js Developer",
    company: "Tesla",
    logo: "/tesla.png",
    logoColor: "#E31937",
    experience: "1-3 yr Exp",
    workType: "Onsite",
    salary: "10LPA",
    timePosted: "24h Ago",
    location: "Mumbai",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    jobType: "Full Time",
    salaryMin: 12,
    salaryMax: 12,
    jobDescription:
      "Join Tesla's backend team to build amazing server-side applications.",
    applicationDeadline: "2024-12-25",
    createdAt: "2024-08-11T08:00:00Z",
    updatedAt: "2024-08-11T08:00:00Z",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Swiggy",
    logo: "/swiggy.png",
    logoColor: "#FC8019",
    experience: "1-3 yr Exp",
    workType: "Onsite",
    salary: "8LPA",
    timePosted: "24h Ago",
    location: "Delhi",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    jobType: "Full Time",
    salaryMin: 12,
    salaryMax: 12,
    jobDescription:
      "Design intuitive interfaces for India's leading food delivery platform.",
    applicationDeadline: "2024-12-20",
    createdAt: "2024-08-10T10:00:00Z",
    updatedAt: "2024-08-10T10:00:00Z",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Amazon",
    logo: "/amazon.png",
    logoColor: "#FF9900",
    experience: "1-3 yr Exp",
    workType: "Onsite",
    salary: "12LPA",
    timePosted: "24h Ago",
    location: "Chennai",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    jobType: "Full Time",
    salaryMin: 12,
    salaryMax: 12,
    jobDescription:
      "Build robust full-stack applications for Amazon's services.",
    applicationDeadline: "2024-12-28",
    createdAt: "2024-08-11T09:00:00Z",
    updatedAt: "2024-08-11T09:00:00Z",
  },
  {
    id: 5,
    title: "Node Js Developer",
    company: "Tesla",
    logo: "/tesla.png",
    logoColor: "#E31937",
    experience: "1-3 yr Exp",
    workType: "Onsite",
    salary: "12LPA",
    timePosted: "24h Ago",
    location: "Hyderabad",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    jobType: "Full Time",
    salaryMin: 12,
    salaryMax: 12,
    jobDescription:
      "Develop server-side applications for Tesla's innovative solutions.",
    applicationDeadline: "2024-12-22",
    createdAt: "2024-08-11T07:00:00Z",
    updatedAt: "2024-08-11T07:00:00Z",
  },
  {
    id: 6,
    title: "UX/UI Designer",
    company: "Swiggy",
    logo: "/swiggy.png",
    logoColor: "#FC8019",
    experience: "1-3 yr Exp",
    workType: "Onsite",
    salary: "12LPA",
    timePosted: "24h Ago",
    location: "Pune",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    jobType: "Full Time",
    salaryMin: 12,
    salaryMax: 12,
    jobDescription:
      "Create amazing user experiences for food delivery platform.",
    applicationDeadline: "2024-12-26",
    createdAt: "2024-08-11T06:00:00Z",
    updatedAt: "2024-08-11T06:00:00Z",
  },
  {
    id: 7,
    title: "Full Stack Developer",
    company: "Amazon",
    logo: "/amazon.png",
    logoColor: "#FF9900",
    experience: "1-3 yr Exp",
    workType: "Onsite",
    salary: "12LPA",
    timePosted: "24h Ago",
    location: "Kolkata",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    jobType: "Full Time",
    salaryMin: 12,
    salaryMax: 12,
    jobDescription:
      "Build scalable web applications for Amazon's global services.",
    applicationDeadline: "2024-12-24",
    createdAt: "2024-08-11T04:00:00Z",
    updatedAt: "2024-08-11T04:00:00Z",
  },
  {
    id: 8,
    title: "Node Js Developer",
    company: "Tesla",
    logo: "/tesla.png",
    logoColor: "#E31937",
    experience: "1-3 yr Exp",
    workType: "Onsite",
    salary: "12LPA",
    timePosted: "24h Ago",
    location: "Ahmedabad",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    jobType: "Full Time",
    salaryMin: 12,
    salaryMax: 12,
    jobDescription:
      "Develop backend services for Tesla's automotive solutions.",
    applicationDeadline: "2024-12-30",
    createdAt: "2024-08-10T12:00:00Z",
    updatedAt: "2024-08-10T12:00:00Z",
  },
];

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

// Salary slider min/max
const SALARY_MIN = 50;
const SALARY_MAX = 100;

export default function JobListPage() {
  // State for jobs from API
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingBackupData, setUsingBackupData] = useState(false);

  // Header-driven filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([
    SALARY_MIN,
    SALARY_MAX,
  ]);

  const [createJobModalOpened, setCreateJobModalOpened] = useState(false);

  // Fetch jobs from API on component mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const fetchedJobs = await fetchJobs();

        // Check if we're using backup data (when API fails, fetchJobs returns BACKUP_JOBS)
        const isBackupData =
          fetchedJobs.length > 0 &&
          fetchedJobs[0].id === BACKUP_JOBS[0].id &&
          fetchedJobs[0].title === BACKUP_JOBS[0].title;

        setUsingBackupData(isBackupData);
        setJobs(fetchedJobs);
        setError(null);
      } catch (err) {
        setError("Failed to load jobs");
        console.error("Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: "Full Stack Developer",
      companyName: "Amazon",
      location: "Chennai",
      jobType: "fulltime",
      salaryMin: 0,
      salaryMax: 1200000,
      jobDescription: "",
      applicationDeadline: "",
    },
  });

  // Listen for header events
  useEffect(() => {
    const handleOpenModal = () => setCreateJobModalOpened(true);
    const handleFiltersUpdate = (ev: Event) => {
      const e = ev as CustomEvent<{
        searchQuery: string;
        selectedLocation: string | null;
        selectedJobType: string | null;
        salaryRange: [number, number];
      }>;
      if (e.detail) {
        setSearchQuery(e.detail.searchQuery || "");
        setSelectedLocation(e.detail.selectedLocation || null);
        setSelectedJobType(e.detail.selectedJobType || null);
        setSalaryRange(e.detail.salaryRange || [SALARY_MIN, SALARY_MAX]);
      }
    };

    window.addEventListener(
      "openCreateJobModal",
      handleOpenModal as EventListener
    );
    window.addEventListener(
      "filters:update",
      handleFiltersUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "openCreateJobModal",
        handleOpenModal as EventListener
      );
      window.removeEventListener(
        "filters:update",
        handleFiltersUpdate as EventListener
      );
    };
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      !selectedLocation || job.location === selectedLocation;
    const matchesJobType = !selectedJobType || job.workType === selectedJobType;

    // Convert LPA to monthly salary (LPA * 100000 / 12)
    const salaryMatch = job.salary.match(/(\d+)LPA/);
    if (salaryMatch) {
      const lpaValue = parseInt(salaryMatch[1]);
      const monthlySalary = (lpaValue * 100000) / 12; // Convert to monthly in thousands
      const monthlySalaryInK = monthlySalary / 1000; // Convert to K format

      // If upper range is 100k, show all jobs >= lower range (100k+ behavior)
      const matchesSalary =
        salaryRange[1] === 100
          ? monthlySalaryInK >= salaryRange[0]
          : monthlySalaryInK >= salaryRange[0] &&
            monthlySalaryInK <= salaryRange[1];

      return (
        matchesSearch && matchesLocation && matchesJobType && matchesSalary
      );
    }

    // Fallback if salary format doesn't match
    return matchesSearch && matchesLocation && matchesJobType;
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      console.log("Job data:", data);

      // Create job using API
      const newJob = await createJob(data);

      if (newJob) {
        // Refresh the job list
        const updatedJobs = await fetchJobs();
        setJobs(updatedJobs);

        // Close modal and reset form
        setCreateJobModalOpened(false);
        reset();
      } else {
        throw new Error("Failed to create job");
      }
    } catch (error) {
      console.error("Error creating job:", error);
      // You could add error handling UI here
    }
  };

  const onSaveDraft = () => {
    // Handle saving as draft
    console.log("Saving as draft...");
  };

  const SLIDER_FONT = {
    color: "#111827",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Inter, sans-serif",
  };
  const SLIDER_VALUE_FONT = {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
  };

  return (
    <Box bg="#f8fafc" h="100vh" pb={40}>
      <Box pt={24} px={48}>
        {/* Filters are now controlled by the header. No local filter UI here. */}

        {/* Loading State */}
        {loading && (
          <Box ta="center" py={40}>
            <Text size="lg" c="dimmed">
              Loading jobs...
            </Text>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box ta="center" py={40}>
            <Text size="lg" c="red">
              {error}
            </Text>
            <Button
              mt={16}
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Backup Data Notice */}
        {usingBackupData && (
          <Box
            ta="center"
            py={16}
            px={20}
            style={{
              backgroundColor: "#fef3c7",
              border: "1px solid #f59e0b",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            <Text size="sm" c="orange" fw={500}>
              {process.env.NODE_ENV === "development"
                ? "🔄 Development Mode - Using Sample Data"
                : "⚠️ Using backup data - Backend connection unavailable"}
            </Text>
            <Text size="xs" c="dimmed" mt={4}>
              {process.env.NODE_ENV === "development"
                ? "Showing sample jobs for development and testing"
                : "Showing sample jobs while we restore the backend service"}
            </Text>
          </Box>
        )}

        {/* Job Listings Grid */}
        {!loading && !error && (
          <Grid gutter={32} style={{ maxWidth: "none", margin: 0 }}>
            {filteredJobs.length === 0 ? (
              <Grid.Col span={12}>
                <Box ta="center" py={40}>
                  <Text size="lg" c="dimmed">
                    No jobs found matching your criteria
                  </Text>
                </Box>
              </Grid.Col>
            ) : (
              filteredJobs.map((job) => (
                <Grid.Col key={job.id} span={{ base: 12, sm: 6, lg: 3 }}>
                  <Card
                    shadow="sm"
                    radius="lg"
                    p={0}
                    withBorder
                    style={{
                      width: 316,
                      height: 360,
                      boxShadow: "0 2px 8px 0 rgba(16,24,40,0.08)",
                      border: "1px solid #f3f4f6",
                      backgroundColor: "#fff",
                      borderRadius: 12,
                    }}
                  >
                    <Group
                      justify="space-between"
                      align="flex-start"
                      style={{ padding: "16px 16px 0 16px" }}
                    >
                      {job.logo && job.logo.startsWith("/") ? (
                        <Box
                          style={{
                            width: 83.46428680419922,
                            height: 82,
                            borderRadius: "13.18px",
                            overflow: "hidden",
                            boxShadow: "0 2px 8px rgba(16,24,40,0.10)",
                            border: "1px solid #f3f4f6",
                            backgroundColor: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            src={job.logo}
                            alt={`${job.company} logo`}
                            width={60}
                            height={60}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                      ) : (
                        <Avatar
                          size={82}
                          radius={13.18}
                          style={{
                            backgroundColor: job.logoColor || "#6b7280",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "22px",
                            boxShadow: "0 2px 8px rgba(16,24,40,0.10)",
                            border: "1px solid #f3f4f6",
                          }}
                        >
                          {job.company.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                      <Badge
                        color="#afd9ff"
                        variant="filled"
                        size="md"
                        style={{
                          backgroundColor: "#afd9ff",
                          color: "#111",
                          fontWeight: 500,
                          fontSize: "14px",
                          padding: "12px 10px",
                          borderRadius: "7px",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.08)",
                          fontFamily: "Inter, sans-serif",
                          textTransform: "none",
                        }}
                      >
                        {job.timePosted}
                      </Badge>
                    </Group>
                    <Text
                      fw={700}
                      size="md"
                      mb={10}
                      style={{
                        fontSize: "16px",
                        lineHeight: "22px",
                        color: "#111827",
                        fontFamily:
                          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        padding: "0 16px",
                        marginTop: "12px",
                      }}
                    >
                      {job.title}
                    </Text>
                    {/* Job details in same line, icons and text perfectly aligned */}
                    <Group
                      gap={10}
                      mb={12}
                      align="center"
                      wrap="nowrap"
                      style={{ padding: "0 16px" }}
                    >
                      <Group gap={4} align="center">
                        <IconUser
                          size={16}
                          color="#6b7280"
                          style={{ verticalAlign: "middle" }}
                        />
                        <Text
                          size="sm"
                          c="#6b7280"
                          style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            fontFamily:
                              "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          }}
                        >
                          {job.experience}
                        </Text>
                      </Group>
                      <Group gap={4} align="center">
                        <IconBuilding
                          size={16}
                          color="#6b7280"
                          style={{ verticalAlign: "middle" }}
                        />
                        <Text
                          size="sm"
                          c="#6b7280"
                          style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            fontFamily:
                              "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          }}
                        >
                          {job.workType}
                        </Text>
                      </Group>
                      <Group gap={4} align="center">
                        <IconCurrencyDollar
                          size={16}
                          color="#6b7280"
                          style={{ verticalAlign: "middle" }}
                        />
                        <Text
                          size="sm"
                          c="#6b7280"
                          style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            fontFamily:
                              "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          }}
                        >
                          {job.salary}
                        </Text>
                      </Group>
                    </Group>
                    <Divider
                      my={16}
                      style={{
                        borderColor: "#f3f4f6",
                        margin: "0 16px 16px 16px",
                      }}
                    />
                    <Stack
                      gap={8}
                      style={{ padding: "0 16px", marginBottom: "16px" }}
                    >
                      {job.description.map((desc, index) => (
                        <Text
                          key={index}
                          size="sm"
                          c="#6b7280"
                          style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            fontFamily:
                              "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          }}
                        >
                          • {desc}
                        </Text>
                      ))}
                    </Stack>
                    <Button
                      variant="filled"
                      size="md"
                      radius="lg"
                      style={{
                        backgroundColor: "#00aaff",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "14px",
                        padding: "5px 24px",
                        margin: "0 16px 16px 16px",
                        width: "calc(100% - 32px)",
                      }}
                    >
                      Apply Now
                    </Button>
                  </Card>
                </Grid.Col>
              ))
            )}
          </Grid>
        )}
      </Box>

      {/* Create Job Modal */}
      <Modal
        opened={createJobModalOpened}
        onClose={() => setCreateJobModalOpened(false)}
        size="xl"
        title="Create Job Opening"
        centered
        styles={{
          title: {
            fontSize: "28px",
            fontWeight: 700,
            color: "#111827",
            textAlign: "center",
            marginBottom: "8px",
            width: "100%",
          },
          header: {
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "24px",
            textAlign: "center",
            marginBottom: "16px",
          },
          body: {
            padding: "0 32px 32px 32px",
            maxHeight: "70vh",
            overflowY: "auto",
          },
          content: {
            borderRadius: "16px",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            maxHeight: "85vh",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid gutter={24}>
            {/* Left Column */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={20}>
                {/* Job Title */}
                <TextInput
                  label="Job Title"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                  error={errors.jobTitle?.message}
                  size="md"
                  radius="lg"
                  styles={{
                    label: {
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    },
                    input: {
                      borderColor: "#d1d5db",
                      borderRadius: "12px",
                      fontSize: "14px",
                      padding: "12px 16px",
                    },
                  }}
                />

                {/* Location */}
                <Select
                  label="Location"
                  placeholder="Select location"
                  data={LOCATIONS}
                  value={watch("location")}
                  onChange={(value) => setValue("location", value || "")}
                  error={errors.location?.message}
                  size="md"
                  radius="lg"
                  styles={{
                    label: {
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    },
                    input: {
                      borderColor: "#d1d5db",
                      borderRadius: "12px",
                      fontSize: "14px",
                      padding: "12px 16px",
                    },
                  }}
                />

                {/* Salary Range */}
                <Box>
                  <Text
                    size="sm"
                    fw={600}
                    mb={12}
                    style={{ color: "#374151", fontSize: "14px" }}
                  >
                    Salary Range
                  </Text>
                  <Group gap={16}>
                    <NumberInput
                      placeholder="0"
                      value={watch("salaryMin")}
                      onChange={(value) =>
                        setValue(
                          "salaryMin",
                          typeof value === "number" ? value : 0
                        )
                      }
                      error={errors.salaryMin?.message}
                      size="md"
                      radius="lg"
                      style={{ flex: 1, minWidth: "120px" }}
                      min={0}
                      leftSection="₹"
                      styles={{
                        input: {
                          borderColor: "#d1d5db",
                          borderRadius: "12px",
                          fontSize: "14px",
                          padding: "12px 16px",
                          paddingLeft: "40px",
                        },
                      }}
                    />
                    <NumberInput
                      placeholder="12,00,000"
                      value={watch("salaryMax")}
                      onChange={(value) =>
                        setValue(
                          "salaryMax",
                          typeof value === "number" ? value : 0
                        )
                      }
                      error={errors.salaryMax?.message}
                      radius="lg"
                      style={{ flex: 1, minWidth: "140px" }}
                      min={0}
                      leftSection="₹"
                      styles={{
                        input: {
                          borderColor: "#d1d5db",
                          borderRadius: "12px",
                          fontSize: "14px",
                          padding: "12px 16px",
                          paddingLeft: "40px",
                        },
                      }}
                    />
                  </Group>
                </Box>
              </Stack>
            </Grid.Col>

            {/* Right Column */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={20}>
                {/* Company Name */}
                <TextInput
                  label="Company Name"
                  placeholder="Enter company name"
                  {...register("companyName")}
                  error={errors.companyName?.message}
                  size="md"
                  radius="lg"
                  styles={{
                    label: {
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    },
                    input: {
                      borderColor: "#d1d5db",
                      borderRadius: "12px",
                      fontSize: "14px",
                      padding: "12px 16px",
                    },
                  }}
                />

                {/* Job Type */}
                <Select
                  label="Job Type"
                  placeholder="Select job type"
                  data={JOB_TYPES}
                  value={watch("jobType")}
                  onChange={(value) => setValue("jobType", value || "")}
                  error={errors.jobType?.message}
                  size="md"
                  radius="lg"
                  styles={{
                    label: {
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    },
                    input: {
                      borderColor: "#d1d5db",
                      borderRadius: "12px",
                      fontSize: "14px",
                      padding: "12px 16px",
                    },
                  }}
                />

                {/* Application Deadline */}
                <TextInput
                  label="Application Deadline"
                  placeholder="dd/mm/yyyy"
                  type="date"
                  {...register("applicationDeadline")}
                  error={errors.applicationDeadline?.message}
                  size="md"
                  radius="lg"
                  min={new Date().toISOString().split("T")[0]}
                  styles={{
                    label: {
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    },
                    input: {
                      borderColor: "#d1d5db",
                      borderRadius: "12px",
                      fontSize: "14px",
                      padding: "12px 16px",
                    },
                  }}
                />
              </Stack>
            </Grid.Col>
          </Grid>

          {/* Job Description - Full Width */}
          <Box mt={24}>
            <Textarea
              label="Job Description"
              placeholder="Please share a description to let the candidate know more about the job role"
              {...register("jobDescription")}
              error={errors.jobDescription?.message}
              size="md"
              radius="lg"
              rows={4}
              styles={{
                label: {
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "8px",
                },
                input: {
                  borderColor: "#d1d5db",
                  borderRadius: "12px",
                  fontSize: "14px",
                  padding: "12px 16px",
                },
              }}
            />
          </Box>

          <Divider my={24} style={{ borderColor: "#e5e7eb" }} />

          {/* Action Buttons */}
          <Group justify="space-between" gap={24}>
            <Button
              type="button"
              variant="outline"
              size="lg"
              radius="lg"
              px={40}
              py={16}
              onClick={onSaveDraft}
              style={{
                borderColor: "#d1d5db",
                color: "#374151",
                fontWeight: 600,
                fontSize: "16px",
                backgroundColor: "white",
                borderWidth: "1px",
              }}
            >
              Save Draft
            </Button>

            <Button
              type="submit"
              size="lg"
              radius="lg"
              px={40}
              py={16}
              loading={isSubmitting}
              style={{
                backgroundColor: "#3b82f6",
                border: "none",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              Publish &gt;&gt;
            </Button>
          </Group>
        </form>
      </Modal>
    </Box>
  );
}
