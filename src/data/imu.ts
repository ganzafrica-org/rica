import type { StatusKey } from "@/components/ui/status-chip";
import type { ImuBusinessCategoryId } from "@/types";

/** Industries / SMEs, market surveillance, and service provisions. */
export const imuBusinessCategoryIds = [
  "industries",
  "market",
  "service",
] as const;

export type { ImuBusinessCategoryId };

export const imuBusinessCategoryLabels: Record<ImuBusinessCategoryId, string> =
  {
    industries: "Industries/SMEs",
    market: "Market surveillance",
    service: "Service provisions",
  };

export const imuAssignedListLabels: Record<ImuBusinessCategoryId, string> = {
  industries: "Assigned industries/SMEs",
  market: "Assigned trading centers",
  service: "Assigned companies",
};

export function isImuBusinessCategoryId(
  value: string,
): value is ImuBusinessCategoryId {
  return (imuBusinessCategoryIds as readonly string[]).includes(value);
}

export const imuProducts = [
  { id: "food", label: "Food" },
  { id: "cosmetics", label: "Cosmetics" },
  { id: "chemicals", label: "Chemicals" },
  { id: "electronics", label: "Electronics" },
  { id: "building", label: "Building materials" },
] as const;

export const imuTinNumbers = [
  { id: "201234567", label: "201234567" },
  { id: "202345678", label: "202345678" },
  { id: "203456789", label: "203456789" },
  { id: "204567890", label: "204567890" },
  { id: "205678901", label: "205678901" },
] as const;

export const imuServiceCategories = [
  { id: "garage", label: "Garage" },
  { id: "car-wash", label: "Car wash" },
  { id: "welding", label: "Welding" },
  { id: "salon", label: "Salon" },
  { id: "pharmacy", label: "Pharmacy" },
  { id: "other", label: "Other" },
] as const;

export const imuBusinessSizes = [
  { id: "large", label: "Large industries" },
  { id: "sme", label: "Small & medium enterprises" },
  { id: "micro", label: "Micro enterprises" },
] as const;

export const imuBusinessNatures = [
  { id: "boutique", label: "Boutique" },
  { id: "supermarket", label: "Supermarket" },
  { id: "wholesale", label: "Wholesale shop" },
  { id: "open-market", label: "Open market stall" },
  { id: "pharmacy", label: "Pharmacy" },
  { id: "hardware", label: "Hardware" },
] as const;

export type ImuIndustryAssignment = {
  id: string;
  name: string;
  products: string;
  size: string;
  location: string;
  tin: string;
  inspector: string;
  assignedOn: string;
  outcome: string;
  status: StatusKey;
};

export type ImuMarketAssignment = {
  id: string;
  tradingCenter: string;
  location: string;
  outlets: number;
  nonCompliant: number;
  inspector: string;
  assignedOn: string;
  status: StatusKey;
};

export type ImuServiceAssignment = {
  id: string;
  name: string;
  service: string;
  location: string;
  tin: string;
  inspector: string;
  assignedOn: string;
  outcome: string;
  status: StatusKey;
};

export const imuIndustryAssignments: ImuIndustryAssignment[] = [
  {
    id: "ind-1",
    name: "Kigali Steel Works",
    products: "Construction steel",
    size: "Large industries",
    location: "Gasabo / Ndera",
    tin: "201234567",
    inspector: "Inspector Keza",
    assignedOn: "04 Aug 2026",
    outcome: "Compliant",
    status: "completed",
  },
  {
    id: "ind-2",
    name: "Nyabugogo Plastics Ltd",
    products: "Plastic packaging",
    size: "Small & medium enterprises",
    location: "Nyarugenge / Nyabugogo",
    tin: "202345678",
    inspector: "Inspector Lionel",
    assignedOn: "18 Aug 2026",
    outcome: "—",
    status: "pending-inspection",
  },
  {
    id: "ind-3",
    name: "Musanze Dairy Processing",
    products: "Milk products",
    size: "Small & medium enterprises",
    location: "Musanze / Muhoza",
    tin: "203456789",
    inspector: "Inspector Martine",
    assignedOn: "11 Aug 2026",
    outcome: "Inspection incomplete",
    status: "incomplete",
  },
  {
    id: "ind-4",
    name: "Huye Soap Factory",
    products: "Laundry soap",
    size: "Micro enterprises",
    location: "Huye / Ngoma",
    tin: "204567890",
    inspector: "Inspector Octave",
    assignedOn: "28 Jul 2026",
    outcome: "Corrective action",
    status: "completed",
  },
  {
    id: "ind-5",
    name: "Rubavu Paint Industries",
    products: "Decorative paints",
    size: "Small & medium enterprises",
    location: "Rubavu / Gisenyi",
    tin: "205678901",
    inspector: "Inspector Pacifique",
    assignedOn: "01 Sep 2026",
    outcome: "—",
    status: "pending-inspection",
  },
  {
    id: "ind-6",
    name: "Rwamagana Grain Mill",
    products: "Maize flour",
    size: "Large industries",
    location: "Rwamagana / Kigabiro",
    tin: "201234567",
    inspector: "Inspector Queen",
    assignedOn: "22 Jul 2026",
    outcome: "Compliant",
    status: "completed",
  },
  {
    id: "ind-7",
    name: "Nyagatare Leather Works",
    products: "Hides and skins",
    size: "Micro enterprises",
    location: "Nyagatare / Nyagatare",
    tin: "202345678",
    inspector: "Inspector Roger",
    assignedOn: "15 Aug 2026",
    outcome: "Inspection incomplete",
    status: "incomplete",
  },
  {
    id: "ind-8",
    name: "Bugesera Electronics Assembly",
    products: "Electrical fittings",
    size: "Small & medium enterprises",
    location: "Bugesera / Nyamata",
    tin: "203456789",
    inspector: "Inspector Solange",
    assignedOn: "08 Sep 2026",
    outcome: "—",
    status: "pending-inspection",
  },
];

export const imuMarketAssignments: ImuMarketAssignment[] = [
  {
    id: "mkt-1",
    tradingCenter: "Kimironko Market",
    location: "Gasabo / Kimironko",
    outlets: 24,
    nonCompliant: 3,
    inspector: "Inspector Keza",
    assignedOn: "06 Aug 2026",
    status: "completed",
  },
  {
    id: "mkt-2",
    tradingCenter: "Nyabugogo Trading Centre",
    location: "Nyarugenge / Nyabugogo",
    outlets: 18,
    nonCompliant: 0,
    inspector: "Inspector Lionel",
    assignedOn: "20 Aug 2026",
    status: "pending",
  },
  {
    id: "mkt-3",
    tradingCenter: "Musanze Central Market",
    location: "Musanze / Muhoza",
    outlets: 15,
    nonCompliant: 2,
    inspector: "Inspector Martine",
    assignedOn: "29 Jul 2026",
    status: "completed",
  },
  {
    id: "mkt-4",
    tradingCenter: "Huye Main Market",
    location: "Huye / Ngoma",
    outlets: 12,
    nonCompliant: 0,
    inspector: "Inspector Octave",
    assignedOn: "02 Sep 2026",
    status: "pending",
  },
  {
    id: "mkt-5",
    tradingCenter: "Rubavu Border Market",
    location: "Rubavu / Gisenyi",
    outlets: 21,
    nonCompliant: 5,
    inspector: "Inspector Pacifique",
    assignedOn: "12 Aug 2026",
    status: "completed",
  },
  {
    id: "mkt-6",
    tradingCenter: "Nyagatare Trading Centre",
    location: "Nyagatare / Nyagatare",
    outlets: 9,
    nonCompliant: 0,
    inspector: "Inspector Queen",
    assignedOn: "09 Sep 2026",
    status: "pending",
  },
  {
    id: "mkt-7",
    tradingCenter: "Kicukiro Modern Market",
    location: "Kicukiro / Niboye",
    outlets: 16,
    nonCompliant: 1,
    inspector: "Inspector Roger",
    assignedOn: "25 Jul 2026",
    status: "completed",
  },
];

export const imuServiceAssignments: ImuServiceAssignment[] = [
  {
    id: "svc-1",
    name: "Kigali Auto Garage",
    service: "Garage",
    location: "Kicukiro / Kigarama",
    tin: "201234567",
    inspector: "Inspector Thierry",
    assignedOn: "03 Aug 2026",
    outcome: "Compliant",
    status: "completed",
  },
  {
    id: "svc-2",
    name: "Clean Ride Car Wash",
    service: "Car wash",
    location: "Gasabo / Remera",
    tin: "202345678",
    inspector: "Inspector Uwera",
    assignedOn: "21 Aug 2026",
    outcome: "—",
    status: "pending-inspection",
  },
  {
    id: "svc-3",
    name: "Huye Welding Co-op",
    service: "Welding",
    location: "Huye / Tumba",
    tin: "203456789",
    inspector: "Inspector Keza",
    assignedOn: "14 Aug 2026",
    outcome: "Inspection incomplete",
    status: "incomplete",
  },
  {
    id: "svc-4",
    name: "Ineza Salon",
    service: "Salon",
    location: "Nyarugenge / Muhima",
    tin: "204567890",
    inspector: "Inspector Lionel",
    assignedOn: "30 Jul 2026",
    outcome: "Corrective action",
    status: "completed",
  },
  {
    id: "svc-5",
    name: "Rubavu Pharmacy Ltd",
    service: "Pharmacy",
    location: "Rubavu / Gisenyi",
    tin: "205678901",
    inspector: "Inspector Martine",
    assignedOn: "05 Sep 2026",
    outcome: "—",
    status: "pending-inspection",
  },
  {
    id: "svc-6",
    name: "Musanze Quick Wash",
    service: "Car wash",
    location: "Musanze / Muhoza",
    tin: "201234567",
    inspector: "Inspector Octave",
    assignedOn: "19 Jul 2026",
    outcome: "Compliant",
    status: "completed",
  },
  {
    id: "svc-7",
    name: "Nyagatare Metal Works",
    service: "Welding",
    location: "Nyagatare / Nyagatare",
    tin: "202345678",
    inspector: "Inspector Pacifique",
    assignedOn: "16 Aug 2026",
    outcome: "Inspection incomplete",
    status: "incomplete",
  },
];

export const imuAssignmentCount =
  imuIndustryAssignments.length +
  imuMarketAssignments.length +
  imuServiceAssignments.length;
