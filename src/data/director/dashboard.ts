import type { BusinessUnitKey } from "@/types";

export const directorFilterOptions = {
  dateRanges: [
    { id: "all", label: "All Dates" },
    { id: "30d", label: "Last 30 days" },
    { id: "90d", label: "Last 90 days" },
    { id: "ytd", label: "Year to date" },
  ],
  streams: [
    { id: "all", label: "All streams" },
    { id: "seed", label: "Seed Inspection" },
    { id: "slaughterhouse", label: "Slaughterhouse" },
    { id: "agrochemical", label: "Agrochemical" },
    { id: "seed-producer", label: "Seed Producer" },
  ],
  categories: [
    { id: "all", label: "All categories" },
    { id: "seed-producers", label: "Seed Producers" },
    { id: "agrochemical", label: "Agrochemical Dealers" },
    { id: "butcheries", label: "Butcheries" },
    { id: "meat-carriers", label: "Meat Carriers" },
    { id: "electronics", label: "Used Electronics" },
  ],
  businessCategories: [
    { id: "all", label: "All business categories" },
    { id: "retail", label: "Retail" },
    { id: "wholesale", label: "Wholesale" },
    { id: "manufacturing", label: "Manufacturing" },
    { id: "hospitality", label: "Hospitality" },
  ],
  outletTypes: [
    { id: "all", label: "All outlet types" },
    { id: "shop", label: "Shop" },
    { id: "supermarket", label: "Supermarket" },
    { id: "warehouse", label: "Warehouse" },
    { id: "factory", label: "Factory" },
  ],
  productCategories: [
    { id: "all", label: "All product categories" },
    { id: "food", label: "Food" },
    { id: "cosmetics", label: "Cosmetics" },
    { id: "chemicals", label: "Chemicals" },
    { id: "electronics", label: "Electronics" },
  ],
  productNames: [
    { id: "all", label: "All products" },
    { id: "rice", label: "Rice" },
    { id: "cooking-oil", label: "Cooking oil" },
    { id: "sugar", label: "Sugar" },
    { id: "flour", label: "Flour" },
    { id: "lotion", label: "Lotion" },
    { id: "soap", label: "Soap" },
    { id: "perfume", label: "Perfume" },
    { id: "fertilizer", label: "Fertilizer" },
    { id: "pesticide", label: "Pesticide" },
    { id: "detergent", label: "Detergent" },
    { id: "phone", label: "Phone" },
    { id: "laptop", label: "Laptop" },
    { id: "charger", label: "Charger" },
  ],
  countries: [
    { id: "all", label: "All countries of origin" },
    { id: "china", label: "China" },
    { id: "india", label: "India" },
    { id: "uae", label: "UAE" },
    { id: "kenya", label: "Kenya" },
    { id: "eu", label: "EU" },
  ],
  provinces: [
    { id: "all", label: "All provinces" },
    { id: "kigali", label: "Kigali City" },
    { id: "northern", label: "Northern" },
    { id: "southern", label: "Southern" },
    { id: "eastern", label: "Eastern" },
    { id: "western", label: "Western" },
  ],
  districts: [
    { id: "all", label: "All districts" },
    { id: "gasabo", label: "Gasabo" },
    { id: "nyarugenge", label: "Nyarugenge" },
    { id: "kicukiro", label: "Kicukiro" },
    { id: "musanze", label: "Musanze" },
    { id: "huye", label: "Huye" },
  ],
} as const;

export type TeamMemberRow = {
  name: string;
  assigned: number;
  completed: number;
  pending: number;
  completionRate: number;
};

export type NamedValue = { name: string; value: number };
export type StackedRow = { name: string; [key: string]: string | number };
export type TrendPoint = { month: string; value: number; previous?: number };
export type KpiItem = {
  id: string;
  label: string;
  value: string;
  hint?: string;
  tone?: "seed" | "slaughterhouse" | "agrochemical" | "seed-producer";
};

export type DirectorUnitDashboard = {
  unitKey: BusinessUnitKey;
  filterMode: "streams" | "categories" | "imu" | "iiu" | "basic";
  /** Province values for map / geographic distribution (IMU §3.2). */
  mapProvinces?: NamedValue[];
  /** Spec: FPU/RLU use donut for outcomes; IMU/IIU use bar (multi-select decisions). */
  outcomesChart: "donut" | "bar";
  /** When false, regulatory outcomes are pending per the framework (e.g. CCPU). */
  showOutcomes: boolean;
  team: TeamMemberRow[];
  completionTrend: TrendPoint[];
  outcomes: NamedValue[];
  outcomesByProvince: StackedRow[];
  outcomesByStream?: StackedRow[];
  complianceTrend: TrendPoint[];
  yoyTrend: TrendPoint[];
  /** KPIs that belong on the unit deep-dive page (Licensing/Inspection overview, etc.). */
  sectionOverviewKpis: KpiItem[];
  sectionCharts: {
    id: string;
    title: string;
    description: string;
    kpis?: KpiItem[];
    bars?: NamedValue[];
    donut?: NamedValue[];
    /** Line series when the framework specifies a line chart. */
    line?: TrendPoint[];
    stacked?: StackedRow[];
    stackedKeys?: { key: string; label: string; color: string }[];
  }[];
};

const outcomeColors = {
  cleared: "var(--stream-seed)",
  corrective: "var(--stream-seed-producer)",
  rejected: "var(--danger)",
};

export const directorDashboards: Record<BusinessUnitKey, DirectorUnitDashboard> =
  {
    fpu: {
      unitKey: "fpu",
      filterMode: "streams",
      outcomesChart: "donut",
      showOutcomes: true,
      team: [
        {
          name: "Jean d'Amour",
          assigned: 42,
          completed: 31,
          pending: 11,
          completionRate: 74,
        },
        {
          name: "Uwase Claire",
          assigned: 38,
          completed: 29,
          pending: 9,
          completionRate: 76,
        },
        {
          name: "Habimana Eric",
          assigned: 35,
          completed: 22,
          pending: 13,
          completionRate: 63,
        },
        {
          name: "Mukamana Aline",
          assigned: 40,
          completed: 34,
          pending: 6,
          completionRate: 85,
        },
        {
          name: "Niyonzima Patrick",
          assigned: 28,
          completed: 18,
          pending: 10,
          completionRate: 64,
        },
        {
          name: "Ingabire Diane",
          assigned: 33,
          completed: 27,
          pending: 6,
          completionRate: 82,
        },
        {
          name: "Bizimana Samuel",
          assigned: 30,
          completed: 21,
          pending: 9,
          completionRate: 70,
        },
        {
          name: "Uwimana Grace",
          assigned: 36,
          completed: 30,
          pending: 6,
          completionRate: 83,
        },
        {
          name: "Nsengimana Yves",
          assigned: 25,
          completed: 16,
          pending: 9,
          completionRate: 64,
        },
        {
          name: "Mukeshimana Ruth",
          assigned: 31,
          completed: 24,
          pending: 7,
          completionRate: 77,
        },
        {
          name: "Kagame Louis",
          assigned: 29,
          completed: 20,
          pending: 9,
          completionRate: 69,
        },
      ],
      completionTrend: [
        { month: "Jan", value: 48 },
        { month: "Feb", value: 52 },
        { month: "Mar", value: 61 },
        { month: "Apr", value: 58 },
        { month: "May", value: 67 },
        { month: "Jun", value: 72 },
        { month: "Jul", value: 69 },
        { month: "Aug", value: 74 },
      ],
      outcomes: [
        { name: "Cleared", value: 148 },
        { name: "Requires Corrective Action", value: 62 },
        { name: "Rejected / Closed", value: 31 },
      ],
      outcomesByProvince: [
        { name: "Kigali", cleared: 42, corrective: 14, rejected: 6 },
        { name: "Northern", cleared: 28, corrective: 12, rejected: 7 },
        { name: "Southern", cleared: 31, corrective: 15, rejected: 8 },
        { name: "Eastern", cleared: 27, corrective: 11, rejected: 5 },
        { name: "Western", cleared: 20, corrective: 10, rejected: 5 },
      ],
      outcomesByStream: [
        { name: "Seed", cleared: 58, corrective: 22, rejected: 9 },
        { name: "Slaughterhouse", cleared: 36, corrective: 18, rejected: 11 },
        { name: "Agrochemical", cleared: 30, corrective: 12, rejected: 6 },
        { name: "Seed Producer", cleared: 24, corrective: 10, rejected: 5 },
      ],
      complianceTrend: [
        { month: "Jan", value: 78 },
        { month: "Feb", value: 80 },
        { month: "Mar", value: 79 },
        { month: "Apr", value: 82 },
        { month: "May", value: 83 },
        { month: "Jun", value: 84 },
        { month: "Jul", value: 83 },
        { month: "Aug", value: 85 },
      ],
      yoyTrend: [
        { month: "Jan", value: 48, previous: 41 },
        { month: "Feb", value: 52, previous: 44 },
        { month: "Mar", value: 61, previous: 50 },
        { month: "Apr", value: 58, previous: 53 },
        { month: "May", value: 67, previous: 55 },
        { month: "Jun", value: 72, previous: 60 },
        { month: "Jul", value: 69, previous: 62 },
        { month: "Aug", value: 74, previous: 65 },
      ],
      sectionOverviewKpis: [],
      sectionCharts: [
        {
          id: "seed",
          title: "Seed Inspection & Certification",
          description: "How is the seed certification process performing?",
          kpis: [
            {
              id: "apps",
              label: "Applications submitted",
              value: "214",
              tone: "seed",
            },
            {
              id: "approval",
              label: "Approval rate",
              value: "68%",
              tone: "agrochemical",
            },
            {
              id: "pending",
              label: "Pending applications",
              value: "47",
              tone: "slaughterhouse",
            },
            {
              id: "review",
              label: "Declaration review pass rate",
              value: "81%",
              tone: "seed-producer",
            },
            {
              id: "lab-time",
              label: "Avg. time, collection to lab reception",
              value: "4.2 days",
              tone: "seed",
            },
          ],
          bars: [
            { name: "Approved", value: 112 },
            { name: "Downgraded", value: 48 },
            { name: "Rejected", value: 27 },
          ],
        },
        {
          id: "slaughterhouse",
          title: "Slaughterhouse Inspection",
          description: "What is the compliance status of slaughterhouses?",
          kpis: [
            {
              id: "compliance",
              label: "Unit compliance rate",
              value: "76%",
              tone: "slaughterhouse",
            },
            {
              id: "carrier",
              label: "Meat carrier compliance rate",
              value: "71%",
              tone: "seed",
            },
          ],
          bars: [
            { name: "Small", value: 72 },
            { name: "Medium", value: 81 },
            { name: "Large", value: 88 },
          ],
          donut: [
            { name: "Quick registration", value: 54 },
            { name: "Continue & correct", value: 38 },
            { name: "Temporary closure", value: 12 },
            { name: "Closure & relocation", value: 7 },
          ],
        },
        {
          id: "slaughterhouse-registration",
          title: "Slaughterhouse registration status",
          description: "Registration Status Distribution",
          donut: [
            { name: "Registered", value: 62 },
            { name: "Pending", value: 28 },
            { name: "Informal", value: 14 },
          ],
        },
        {
          id: "slaughterhouse-geo",
          title: "Slaughterhouse distribution",
          description: "Distribution by Province/District",
          bars: [
            { name: "Kigali", value: 38 },
            { name: "Northern", value: 22 },
            { name: "Southern", value: 26 },
            { name: "Eastern", value: 19 },
            { name: "Western", value: 16 },
          ],
        },
        {
          id: "agrochemical",
          title: "Agrochemical Dealership Licensing",
          description: "How are licensing applications performing?",
          kpis: [
            {
              id: "agrochemical-pass",
              label: "Application pass rate",
              value: "79%",
              tone: "agrochemical",
            },
          ],
          bars: [
            { name: "Retail", value: 82 },
            { name: "Wholesale", value: 76 },
            { name: "Importer", value: 71 },
          ],
        },
        {
          id: "agrochemical-product",
          title: "Agrochemical pass rate by product category",
          description: "Pass Rate by Product Category",
          bars: [
            { name: "Pesticides", value: 81 },
            { name: "Fertilizers", value: 77 },
            { name: "Seeds treatment", value: 74 },
            { name: "Other", value: 69 },
          ],
        },
        {
          id: "seed-producer",
          title: "Seed Producer Onsite Verification",
          description: "What is the status of onsite verification?",
          kpis: [
            {
              id: "seed-producer-pass",
              label: "Verification pass rate",
              value: "74%",
              tone: "seed-producer",
            },
            {
              id: "storage",
              label: "Storage facility adequacy rate",
              value: "68%",
              tone: "seed",
            },
          ],
          bars: [
            { name: "Maize", value: 420 },
            { name: "Beans", value: 280 },
            { name: "Rice", value: 190 },
            { name: "Potato", value: 150 },
          ],
        },
        {
          id: "seed-producer-tenure",
          title: "Seed producer pass rate by land tenure",
          description: "Pass Rate by Land Tenure",
          bars: [
            { name: "Owned", value: 78 },
            { name: "Leased", value: 71 },
            { name: "Communal", value: 66 },
            { name: "Other", value: 62 },
          ],
        },
      ],
    },

    rlu: {
      unitKey: "rlu",
      filterMode: "categories",
      outcomesChart: "donut",
      showOutcomes: true,
      team: [
        {
          name: "Licensing Off. Amina",
          assigned: 54,
          completed: 41,
          pending: 13,
          completionRate: 76,
        },
        {
          name: "Licensing Off. Bosco",
          assigned: 49,
          completed: 36,
          pending: 13,
          completionRate: 73,
        },
        {
          name: "Licensing Off. Chantal",
          assigned: 46,
          completed: 39,
          pending: 7,
          completionRate: 85,
        },
        {
          name: "Licensing Off. David",
          assigned: 51,
          completed: 34,
          pending: 17,
          completionRate: 67,
        },
        {
          name: "Licensing Off. Esther",
          assigned: 44,
          completed: 32,
          pending: 12,
          completionRate: 73,
        },
        {
          name: "Licensing Off. Felix",
          assigned: 40,
          completed: 28,
          pending: 12,
          completionRate: 70,
        },
        {
          name: "Licensing Off. Gloria",
          assigned: 47,
          completed: 38,
          pending: 9,
          completionRate: 81,
        },
        {
          name: "Licensing Off. Henry",
          assigned: 43,
          completed: 30,
          pending: 13,
          completionRate: 70,
        },
        {
          name: "Licensing Off. Irene",
          assigned: 39,
          completed: 31,
          pending: 8,
          completionRate: 79,
        },
        {
          name: "Licensing Off. Jacques",
          assigned: 45,
          completed: 33,
          pending: 12,
          completionRate: 73,
        },
      ],
      completionTrend: [
        { month: "Jan", value: 62 },
        { month: "Feb", value: 68 },
        { month: "Mar", value: 71 },
        { month: "Apr", value: 66 },
        { month: "May", value: 74 },
        { month: "Jun", value: 79 },
        { month: "Jul", value: 77 },
        { month: "Aug", value: 82 },
      ],
      outcomes: [
        { name: "Approved", value: 286 },
        { name: "Rejected", value: 64 },
      ],
      outcomesByProvince: [
        { name: "Kigali", cleared: 88, corrective: 0, rejected: 18 },
        { name: "Northern", cleared: 52, corrective: 0, rejected: 12 },
        { name: "Southern", cleared: 61, corrective: 0, rejected: 14 },
        { name: "Eastern", cleared: 49, corrective: 0, rejected: 11 },
        { name: "Western", cleared: 36, corrective: 0, rejected: 9 },
      ],
      complianceTrend: [
        { month: "Jan", value: 74 },
        { month: "Feb", value: 76 },
        { month: "Mar", value: 75 },
        { month: "Apr", value: 78 },
        { month: "May", value: 79 },
        { month: "Jun", value: 80 },
        { month: "Jul", value: 81 },
        { month: "Aug", value: 82 },
      ],
      yoyTrend: [
        { month: "Jan", value: 62, previous: 55 },
        { month: "Feb", value: 68, previous: 58 },
        { month: "Mar", value: 71, previous: 60 },
        { month: "Apr", value: 66, previous: 61 },
        { month: "May", value: 74, previous: 64 },
        { month: "Jun", value: 79, previous: 68 },
        { month: "Jul", value: 77, previous: 70 },
        { month: "Aug", value: 82, previous: 72 },
      ],
      sectionOverviewKpis: [
        {
          id: "licensed",
          label: "Total licensed operators",
          value: "1,248",
          tone: "seed",
        },
        {
          id: "received",
          label: "Applications received",
          value: "350",
          tone: "slaughterhouse",
        },
        {
          id: "approval",
          label: "Approval rate",
          value: "82%",
          tone: "agrochemical",
        },
        {
          id: "turnaround",
          label: "Average processing turnaround time",
          value: "N/A",
          tone: "seed-producer",
        },
      ],
      sectionCharts: [
        {
          id: "application-trends",
          title: "Application trends",
          description: "Applications received over time",
          line: [
            { month: "Jan", value: 38 },
            { month: "Feb", value: 42 },
            { month: "Mar", value: 45 },
            { month: "Apr", value: 40 },
            { month: "May", value: 48 },
            { month: "Jun", value: 52 },
            { month: "Jul", value: 49 },
            { month: "Aug", value: 55 },
          ],
        },
        {
          id: "operators",
          title: "Licensed operators by category",
          description: "How many operators are licensed, by category?",
          kpis: [
            {
              id: "op-seed",
              label: "Seed Producers",
              value: "312",
              tone: "seed",
            },
            {
              id: "op-agro",
              label: "Agrochemical Dealers",
              value: "268",
              tone: "agrochemical",
            },
            {
              id: "op-butchery",
              label: "Butcheries",
              value: "294",
              tone: "slaughterhouse",
            },
            {
              id: "op-carrier",
              label: "Meat Carriers",
              value: "186",
              tone: "seed-producer",
            },
            {
              id: "op-electronics",
              label: "Used Electronics Traders",
              value: "188",
              tone: "seed",
            },
          ],
          bars: [
            { name: "Seed Producers", value: 312 },
            { name: "Agrochemical", value: 268 },
            { name: "Butcheries", value: 294 },
            { name: "Meat Carriers", value: 186 },
            { name: "Electronics", value: 188 },
          ],
        },
        {
          id: "renewals",
          title: "Application types",
          description: "First-time vs renewal applications",
          donut: [
            { name: "First-time", value: 198 },
            { name: "Renewal", value: 152 },
          ],
        },
        {
          id: "renewals-by-category",
          title: "Application types by category",
          description: "First-time vs renewal applications, per category",
          stacked: [
            { name: "Seed Producers", firstTime: 88, renewal: 72 },
            { name: "Agrochemical", firstTime: 70, renewal: 0 },
            { name: "Butcheries", firstTime: 76, renewal: 64 },
            { name: "Meat Carriers", firstTime: 52, renewal: 48 },
            { name: "Electronics", firstTime: 58, renewal: 44 },
          ],
          stackedKeys: [
            {
              key: "firstTime",
              label: "First-time",
              color: "var(--stream-seed)",
            },
            {
              key: "renewal",
              label: "Renewal",
              color: "var(--stream-slaughterhouse)",
            },
          ],
        },
        {
          id: "approval-by-cat",
          title: "Licensing outcomes",
          description: "Approval rate by category",
          bars: [
            { name: "Seed Producers", value: 84 },
            { name: "Agrochemical", value: 78 },
            { name: "Butcheries", value: 86 },
            { name: "Meat Carriers", value: 81 },
            { name: "Electronics", value: 73 },
          ],
        },
        {
          id: "geo-operators",
          title: "Geographic distribution",
          description: "Distribution by Province/District, filterable by category",
          bars: [
            { name: "Kigali", value: 320 },
            { name: "Northern", value: 210 },
            { name: "Southern", value: 245 },
            { name: "Eastern", value: 198 },
            { name: "Western", value: 175 },
          ],
        },
      ],
      mapProvinces: [
        { name: "Kigali", value: 320 },
        { name: "Northern", value: 210 },
        { name: "Southern", value: 245 },
        { name: "Eastern", value: 198 },
        { name: "Western", value: 175 },
      ],
    },

    imu: {
      unitKey: "imu",
      filterMode: "imu",
      outcomesChart: "bar",
      showOutcomes: true,
      team: [
        {
          name: "Inspector Keza",
          assigned: 58,
          completed: 44,
          pending: 14,
          completionRate: 76,
        },
        {
          name: "Inspector Lionel",
          assigned: 52,
          completed: 39,
          pending: 13,
          completionRate: 75,
        },
        {
          name: "Inspector Martine",
          assigned: 49,
          completed: 41,
          pending: 8,
          completionRate: 84,
        },
        {
          name: "Inspector Octave",
          assigned: 55,
          completed: 37,
          pending: 18,
          completionRate: 67,
        },
        {
          name: "Inspector Pacifique",
          assigned: 46,
          completed: 35,
          pending: 11,
          completionRate: 76,
        },
        {
          name: "Inspector Queen",
          assigned: 50,
          completed: 42,
          pending: 8,
          completionRate: 84,
        },
        {
          name: "Inspector Roger",
          assigned: 47,
          completed: 33,
          pending: 14,
          completionRate: 70,
        },
        {
          name: "Inspector Solange",
          assigned: 53,
          completed: 40,
          pending: 13,
          completionRate: 75,
        },
        {
          name: "Inspector Thierry",
          assigned: 44,
          completed: 31,
          pending: 13,
          completionRate: 70,
        },
        {
          name: "Inspector Uwera",
          assigned: 48,
          completed: 36,
          pending: 12,
          completionRate: 75,
        },
      ],
      completionTrend: [
        { month: "Jan", value: 70 },
        { month: "Feb", value: 74 },
        { month: "Mar", value: 78 },
        { month: "Apr", value: 72 },
        { month: "May", value: 81 },
        { month: "Jun", value: 85 },
        { month: "Jul", value: 83 },
        { month: "Aug", value: 88 },
      ],
      outcomes: [
        { name: "Warned", value: 96 },
        { name: "Seizure", value: 28 },
        { name: "Rejected", value: 41 },
        { name: "Control sample", value: 53 },
        { name: "Further verification", value: 37 },
        { name: "Other", value: 22 },
      ],
      outcomesByProvince: [
        { name: "Kigali", cleared: 54, corrective: 28, rejected: 12 },
        { name: "Northern", cleared: 32, corrective: 18, rejected: 8 },
        { name: "Southern", cleared: 38, corrective: 20, rejected: 9 },
        { name: "Eastern", cleared: 29, corrective: 16, rejected: 7 },
        { name: "Western", cleared: 24, corrective: 14, rejected: 5 },
      ],
      complianceTrend: [
        { month: "Jan", value: 71 },
        { month: "Feb", value: 73 },
        { month: "Mar", value: 72 },
        { month: "Apr", value: 75 },
        { month: "May", value: 76 },
        { month: "Jun", value: 77 },
        { month: "Jul", value: 78 },
        { month: "Aug", value: 79 },
      ],
      yoyTrend: [
        { month: "Jan", value: 70, previous: 61 },
        { month: "Feb", value: 74, previous: 64 },
        { month: "Mar", value: 78, previous: 66 },
        { month: "Apr", value: 72, previous: 68 },
        { month: "May", value: 81, previous: 70 },
        { month: "Jun", value: 85, previous: 73 },
        { month: "Jul", value: 83, previous: 75 },
        { month: "Aug", value: 88, previous: 78 },
      ],
      sectionOverviewKpis: [
        {
          id: "outlets",
          label: "Outlets inspected",
          value: "502",
          tone: "seed",
        },
        {
          id: "products",
          label: "Products inspected",
          value: "1,184",
          tone: "slaughterhouse",
        },
        {
          id: "premise",
          label: "Overall premise compliance rate",
          value: "77%",
          tone: "agrochemical",
        },
      ],
      sectionCharts: [
        {
          id: "business",
          title: "Business categories inspected",
          description: "How is the unit performing?",
          bars: [
            { name: "Retail", value: 168 },
            { name: "Wholesale", value: 94 },
            { name: "Manufacturing", value: 72 },
            { name: "Hospitality", value: 88 },
            { name: "Other", value: 80 },
          ],
        },
        {
          id: "assessment",
          title: "Premise compliance",
          description: "Which inspection areas require attention?",
          bars: [
            { name: "Hygiene", value: 72 },
            { name: "Labelling", value: 68 },
            { name: "Storage", value: 81 },
            { name: "Documentation", value: 64 },
            { name: "Safety", value: 77 },
          ],
        },
        {
          id: "product-surveillance",
          title: "Product market surveillance",
          description: "Which products present the greatest compliance concerns?",
          kpis: [
            {
              id: "avg-product",
              label: "Average product compliance",
              value: "74%",
              tone: "seed",
            },
            {
              id: "avg-cross",
              label: "Average cross-cutting compliance",
              value: "71%",
              tone: "slaughterhouse",
            },
            {
              id: "overall",
              label: "Overall compliance",
              value: "73%",
              tone: "agrochemical",
            },
          ],
          bars: [
            { name: "Food", value: 210 },
            { name: "Cosmetics", value: 96 },
            { name: "Chemicals", value: 88 },
            { name: "Electronics", value: 74 },
            { name: "Other", value: 62 },
          ],
        },
        {
          id: "decisions-by-product",
          title: "Decision instances by product category",
          description: "Product market surveillance — decision instances",
          stacked: [
            {
              name: "Food",
              seizure: 18,
              warned: 42,
              rejected: 16,
              control: 28,
              further: 22,
              other: 10,
            },
            {
              name: "Cosmetics",
              seizure: 8,
              warned: 24,
              rejected: 9,
              control: 14,
              further: 11,
              other: 6,
            },
            {
              name: "Chemicals",
              seizure: 12,
              warned: 20,
              rejected: 11,
              control: 16,
              further: 12,
              other: 5,
            },
            {
              name: "Electronics",
              seizure: 6,
              warned: 18,
              rejected: 8,
              control: 12,
              further: 9,
              other: 4,
            },
          ],
          stackedKeys: [
            { key: "seizure", label: "Seizure", color: "var(--danger)" },
            {
              key: "warned",
              label: "Warned",
              color: "var(--stream-seed-producer)",
            },
            {
              key: "rejected",
              label: "Rejected",
              color: "var(--stream-agrochemical)",
            },
            {
              key: "control",
              label: "Control sample",
              color: "var(--stream-slaughterhouse)",
            },
            {
              key: "further",
              label: "Further verification",
              color: "var(--stream-seed)",
            },
            { key: "other", label: "Other", color: "var(--muted)" },
          ],
        },
        {
          id: "crosscut",
          title: "Cross-cutting compliance",
          description:
            "Weights & Measures, Occupational Health & Safety, Consumer Rights",
          bars: [
            { name: "Weights & Measures", value: 74 },
            { name: "Occupational H&S", value: 69 },
            { name: "Consumer Rights", value: 78 },
          ],
        },
        {
          id: "geo",
          title: "Geographic distribution",
          description: "Outlets inspected by Province/District",
          bars: [
            { name: "Kigali", value: 148 },
            { name: "Northern", value: 86 },
            { name: "Southern", value: 94 },
            { name: "Eastern", value: 78 },
            { name: "Western", value: 66 },
          ],
        },
      ],
      mapProvinces: [
        { name: "Kigali", value: 148 },
        { name: "Northern", value: 86 },
        { name: "Southern", value: 94 },
        { name: "Eastern", value: 78 },
        { name: "Western", value: 66 },
      ],
    },

    iiu: {
      unitKey: "iiu",
      filterMode: "iiu",
      outcomesChart: "bar",
      showOutcomes: true,
      team: [
        {
          name: "Inspector Ange",
          assigned: 61,
          completed: 48,
          pending: 13,
          completionRate: 79,
        },
        {
          name: "Inspector Bruno",
          assigned: 55,
          completed: 42,
          pending: 13,
          completionRate: 76,
        },
        {
          name: "Inspector Carine",
          assigned: 58,
          completed: 47,
          pending: 11,
          completionRate: 81,
        },
        {
          name: "Inspector Delphin",
          assigned: 52,
          completed: 38,
          pending: 14,
          completionRate: 73,
        },
        {
          name: "Inspector Eliane",
          assigned: 49,
          completed: 40,
          pending: 9,
          completionRate: 82,
        },
        {
          name: "Inspector Fabrice",
          assigned: 57,
          completed: 43,
          pending: 14,
          completionRate: 75,
        },
        {
          name: "Inspector Giselle",
          assigned: 50,
          completed: 39,
          pending: 11,
          completionRate: 78,
        },
        {
          name: "Inspector Hubert",
          assigned: 54,
          completed: 41,
          pending: 13,
          completionRate: 76,
        },
        {
          name: "Inspector Ineza",
          assigned: 46,
          completed: 35,
          pending: 11,
          completionRate: 76,
        },
        {
          name: "Inspector Jules",
          assigned: 53,
          completed: 40,
          pending: 13,
          completionRate: 75,
        },
      ],
      completionTrend: [
        { month: "Jan", value: 88 },
        { month: "Feb", value: 92 },
        { month: "Mar", value: 97 },
        { month: "Apr", value: 90 },
        { month: "May", value: 101 },
        { month: "Jun", value: 108 },
        { month: "Jul", value: 104 },
        { month: "Aug", value: 112 },
      ],
      outcomes: [
        { name: "Normal release", value: 214 },
        { name: "Warned", value: 48 },
        { name: "Rejected", value: 36 },
        { name: "RUS", value: 22 },
        { name: "Control sample", value: 41 },
        { name: "Further verification", value: 29 },
      ],
      outcomesByProvince: [
        { name: "Kigali", cleared: 96, corrective: 22, rejected: 10 },
        { name: "Northern", cleared: 34, corrective: 12, rejected: 6 },
        { name: "Southern", cleared: 28, corrective: 10, rejected: 5 },
        { name: "Eastern", cleared: 41, corrective: 14, rejected: 8 },
        { name: "Western", cleared: 22, corrective: 8, rejected: 4 },
      ],
      complianceTrend: [
        { month: "Jan", value: 88 },
        { month: "Feb", value: 90 },
        { month: "Mar", value: 89 },
        { month: "Apr", value: 91 },
        { month: "May", value: 92 },
        { month: "Jun", value: 93 },
        { month: "Jul", value: 92 },
        { month: "Aug", value: 94 },
      ],
      yoyTrend: [
        { month: "Jan", value: 88, previous: 76 },
        { month: "Feb", value: 92, previous: 80 },
        { month: "Mar", value: 97, previous: 84 },
        { month: "Apr", value: 90, previous: 82 },
        { month: "May", value: 101, previous: 88 },
        { month: "Jun", value: 108, previous: 91 },
        { month: "Jul", value: 104, previous: 93 },
        { month: "Aug", value: 112, previous: 96 },
      ],
      sectionOverviewKpis: [
        {
          id: "reviewed",
          label: "Consignments Reviewed",
          value: "792",
          tone: "seed",
        },
        {
          id: "samples-collected",
          label: "Samples Collected",
          value: "186",
          tone: "slaughterhouse",
        },
      ],
      sectionCharts: [
        {
          id: "doc-review",
          title: "Document Review Decisions",
          description: "How are consignments performing during document review?",
          bars: [
            { name: "Normal release", value: 168 },
            { name: "Physical inspection", value: 142 },
            { name: "Warn", value: 38 },
            { name: "RUS", value: 24 },
            { name: "Rejection", value: 29 },
          ],
        },
        {
          id: "physical",
          title: "Products Inspected by Category",
          description: "What are the outcomes of physical inspections?",
          bars: [
            { name: "Food", value: 210 },
            { name: "Chemicals", value: 96 },
            { name: "Cosmetics", value: 74 },
            { name: "Electronics", value: 88 },
            { name: "Other", value: 62 },
          ],
        },
        {
          id: "physical-decisions",
          title: "Decision instances by Product Category",
          description: "Physical inspection — final-stage decision instances",          stacked: [
            {
              name: "Food",
              release: 120,
              warned: 28,
              rejected: 18,
              rus: 12,
              control: 20,
              further: 12,
            },
            {
              name: "Chemicals",
              release: 48,
              warned: 16,
              rejected: 12,
              rus: 8,
              control: 10,
              further: 6,
            },
            {
              name: "Cosmetics",
              release: 40,
              warned: 12,
              rejected: 8,
              rus: 6,
              control: 8,
              further: 5,
            },
            {
              name: "Electronics",
              release: 52,
              warned: 14,
              rejected: 9,
              rus: 7,
              control: 9,
              further: 4,
            },
          ],
          stackedKeys: [
            {
              key: "release",
              label: "Normal release",
              color: "var(--stream-seed)",
            },
            {
              key: "warned",
              label: "Warned",
              color: "var(--stream-seed-producer)",
            },
            { key: "rejected", label: "Rejected", color: "var(--danger)" },
            {
              key: "rus",
              label: "RUS",
              color: "var(--stream-agrochemical)",
            },
            {
              key: "control",
              label: "Control sample",
              color: "var(--stream-slaughterhouse)",
            },
            {
              key: "further",
              label: "Further verification",
              color: "var(--muted)",
            },
          ],
        },
        {
          id: "samples",
          title: "Samples by Reason",
          description: "How much product verification is being carried out?",
          bars: [
            { name: "Quality control", value: 72 },
            { name: "Registration", value: 34 },
            { name: "Complaint/appeal", value: 21 },
            { name: "Surveillance", value: 41 },
            { name: "Other", value: 18 },
          ],
        },
        {
          id: "missing-docs",
          title: "Missing Documents by Type",
          description: "Which documents are most frequently missing?",
          bars: [
            { name: "CoA", value: 48 },
            { name: "Invoice", value: 32 },
            { name: "Packing list", value: 27 },
            { name: "Import permit", value: 21 },
            { name: "Other", value: 18 },
          ],
        },
        {
          id: "origin",
          title: "Country of Origin Distribution",
          description: "Where are inspected consignments coming from?",
          bars: [
            { name: "China", value: 148 },
            { name: "India", value: 96 },
            { name: "UAE", value: 72 },
            { name: "Kenya", value: 64 },
            { name: "EU", value: 58 },
            { name: "Other", value: 84 },
          ],
        },
      ],
    },

    ccpu: {
      unitKey: "ccpu",
      filterMode: "basic",
      outcomesChart: "donut",
      showOutcomes: false,
      team: [
        {
          name: "Inspector Ange",
          assigned: 28,
          completed: 19,
          pending: 9,
          completionRate: 68,
        },
        {
          name: "Inspector Bella",
          assigned: 24,
          completed: 18,
          pending: 6,
          completionRate: 75,
        },
        {
          name: "Inspector Chris",
          assigned: 26,
          completed: 17,
          pending: 9,
          completionRate: 65,
        },
        {
          name: "Inspector Doreen",
          assigned: 22,
          completed: 16,
          pending: 6,
          completionRate: 73,
        },
        {
          name: "Inspector Eddy",
          assigned: 25,
          completed: 15,
          pending: 10,
          completionRate: 60,
        },
        {
          name: "Inspector Flora",
          assigned: 21,
          completed: 16,
          pending: 5,
          completionRate: 76,
        },
        {
          name: "Inspector Guy",
          assigned: 23,
          completed: 14,
          pending: 9,
          completionRate: 61,
        },
        {
          name: "Inspector Helene",
          assigned: 20,
          completed: 15,
          pending: 5,
          completionRate: 75,
        },
        {
          name: "Inspector Ivan",
          assigned: 27,
          completed: 18,
          pending: 9,
          completionRate: 67,
        },
        {
          name: "Inspector Jeanne",
          assigned: 24,
          completed: 17,
          pending: 7,
          completionRate: 71,
        },
      ],
      completionTrend: [
        { month: "Jan", value: 18 },
        { month: "Feb", value: 21 },
        { month: "Mar", value: 24 },
        { month: "Apr", value: 20 },
        { month: "May", value: 26 },
        { month: "Jun", value: 28 },
        { month: "Jul", value: 25 },
        { month: "Aug", value: 29 },
      ],
      outcomes: [
        { name: "Resolved", value: 86 },
        { name: "Escalated", value: 34 },
        { name: "Pending review", value: 28 },
      ],
      outcomesByProvince: [
        { name: "Kigali", cleared: 32, corrective: 12, rejected: 6 },
        { name: "Northern", cleared: 14, corrective: 6, rejected: 4 },
        { name: "Southern", cleared: 16, corrective: 7, rejected: 5 },
        { name: "Eastern", cleared: 13, corrective: 5, rejected: 3 },
        { name: "Western", cleared: 11, corrective: 4, rejected: 3 },
      ],
      complianceTrend: [
        { month: "Jan", value: 70 },
        { month: "Feb", value: 71 },
        { month: "Mar", value: 72 },
        { month: "Apr", value: 71 },
        { month: "May", value: 73 },
        { month: "Jun", value: 74 },
        { month: "Jul", value: 73 },
        { month: "Aug", value: 75 },
      ],
      yoyTrend: [
        { month: "Jan", value: 18, previous: 14 },
        { month: "Feb", value: 21, previous: 16 },
        { month: "Mar", value: 24, previous: 18 },
        { month: "Apr", value: 20, previous: 17 },
        { month: "May", value: 26, previous: 19 },
        { month: "Jun", value: 28, previous: 21 },
        { month: "Jul", value: 25, previous: 20 },
        { month: "Aug", value: 29, previous: 22 },
      ],
      sectionOverviewKpis: [],
      sectionCharts: [],
    },
  };

export const stackedOutcomeSeries = [
  { key: "cleared", label: "Cleared / Approved", color: outcomeColors.cleared },
  {
    key: "corrective",
    label: "Corrective action",
    color: outcomeColors.corrective,
  },
  { key: "rejected", label: "Rejected / Closed", color: outcomeColors.rejected },
] as const;

export const donutPalette = [
  "var(--stream-seed)",
  "var(--stream-seed-producer)",
  "var(--stream-slaughterhouse)",
  "var(--danger)",
  "var(--stream-agrochemical)",
  "var(--muted)",
];
