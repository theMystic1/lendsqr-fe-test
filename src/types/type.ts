export type NavItem = { name: string; icon: string; routeUrl: string };

export type Guarantor = {
  guarantorFullName: string;
  guarantorPhoneNumber: number;
  guarantorEmailAddress: string;
  guarantorRelationship: string;
};

export type ListUsersParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  q?: string;

  filters?: {
    organization?: string;
    userName?: string;
    emailAddress?: string;
    phoneNumber?: string | number;
    status?: string;
    date?: string;
  };

  sortBy?: keyof User;
  sortDir?: "asc" | "desc";
};

export type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

export type TableHeader = {
  id: string;
  header: string;
  accessor: string;
};

export type User = {
  id: string;
  fullName: string;
  userName: string;
  organization: string;
  status: UserStatus;
  createdAt: string;

  phoneNumber: number;
  emailAddress: string;
  bvn: number;
  gender: string;
  maritalStatus: string;
  children: number;
  typeOfResidence: string;

  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;

  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: number;

  twitter: string;
  facebook: string;
  instagram: string;

  guarantors: Guarantor[];
};

export type Childrentype = {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
};

export type FormatNumberOptions = {
  locale?: string;
  decimals?: number;
  currency?: string;
  compact?: boolean;
};
