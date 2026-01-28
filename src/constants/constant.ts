import auditicon from "/images/audit.png";
import avataricon from "/images/avatar.png";
import dashboardicon from "/images/dashboard.png";
import decisionicon from "/images/decision.png";
import feesPricingicon from "/images/fees-pricing.png";
import feesicon from "/images/fees.png";
import karmaicon from "/images/karma.png";
import loanReqicon from "/images/loan-req.png";
import orgicon from "/images/organisation.png";
import preferenceicon from "/images/preference.png";
import reportsicon from "/images/reports.png";
import savingsProdicon from "/images/savings-prod.png";
import savingsicon from "/images/savings.png";
import serviceicon from "/images/service.png";
import servicesicon from "/images/services.png";
import settlementicon from "/images/settlement.png";
import trxicon from "/images/transactions.png";
import usersicon from "/images/users.png";
import usericon from "/images/user.png";
import guarantorsicon from "/images/guarantors.png";
import loanIcon from "/images/loanss.png";
import chevronDown from "/images/chevron.png";

import loansIcon from "/images/loans.png";
import stackIcon from "/images/stack.png";
import twoUser from "/images/2-users.png";
import threeUser from "/images/3-user.png";
import switchOrgIcon from "/images/switch-org.png";
import filterIcon from "/images/filter-results-button.png";

import whitelistIcon from "/images/whitelist.png";
import pablo from "/images/pablo-sign-in.svg";
import logo from "/images/logo.svg";
import logoutIcon from "/images/logout.png";
import systems from "/images/systems.png";
import type { NavItem } from "../types/type";

const customers = [
  { name: "Users", icon: usersicon, routeUrl: "/users" },
  { name: "Guarantors", icon: guarantorsicon, routeUrl: "/guarantors" },
  { name: "Loans", icon: loanIcon, routeUrl: "/loans" },
  { name: "Decision Models", icon: decisionicon, routeUrl: "/decision-models" },
  { name: "Savings", icon: savingsicon, routeUrl: "/savings" },
  { name: "Loan Requests", icon: loanReqicon, routeUrl: "/loan-requests" },
  { name: "Whitelists", icon: whitelistIcon, routeUrl: "/whitelists" },
  { name: "Karma", icon: karmaicon, routeUrl: "/karma" },
];

const businesses = [
  { name: "Organization", icon: orgicon, routeUrl: "/organization" },
  { name: "Loan Products", icon: loanReqicon, routeUrl: "/loan-products" },
  {
    name: "Savings Products",
    icon: savingsProdicon,
    routeUrl: "/savings-products",
  },
  { name: "Fees and Charges", icon: feesicon, routeUrl: "/fees-and-charges" },
  { name: "Transactions", icon: trxicon, routeUrl: "/transactions" },
  { name: "Services", icon: servicesicon, routeUrl: "/services" },
  { name: "Service Account", icon: serviceicon, routeUrl: "/service-account" },
  { name: "Settlements", icon: settlementicon, routeUrl: "/settlements" },
  { name: "Reports", icon: reportsicon, routeUrl: "/reports" },
];

const settings = [
  { name: "Preferences", icon: preferenceicon, routeUrl: "/preferences" },
  {
    name: "Fees and Pricing",
    icon: feesPricingicon,
    routeUrl: "/fees-and-pricing",
  },
  { name: "Audit Logs", icon: auditicon, routeUrl: "/audit-logs" },
  { name: "Systems Message", icon: systems, routeUrl: "/systems-messages" },
];

export const dashboard = {
  name: "Dashboard",
  icon: dashboardicon,
  routeUrl: "/dashboard",
};
export const switchOrg = {
  name: "Switch Organization",
  icon: switchOrgIcon,
  routeUrl: "/dashboard",
};
export const logout = {
  name: "Logout",
  icon: logoutIcon,
  routeUrl: "/dashboard",
};

export const navItems = {
  customers,
  businesses,
  settings,
};

export const sections: Array<{ title?: string; items: NavItem[] }> = [
  { items: [dashboard] },
  { title: "CUSTOMERS", items: navItems.customers },
  { title: "BUSINESS", items: navItems.businesses },
  { title: "SETTINGS", items: navItems.settings },
];

export const IMgs = {
  auditicon,
  avataricon,
  dashboardicon,
  decisionicon,
  feesPricingicon,
  feesicon,
  karmaicon,
  loanReqicon,
  orgicon,
  preferenceicon,
  reportsicon,
  savingsProdicon,
  savingsicon,
  serviceicon,
  servicesicon,
  settlementicon,
  trxicon,
  usersicon,
  guarantorsicon,
  loanIcon,
  whitelistIcon,
  logo,
  pablo,
  loansIcon,
  stackIcon,
  twoUser,
  threeUser,
  chevronDown,
  usericon,
  filterIcon,
};
// savings;
// active;
// ;
// loans;

export const stats = [
  {
    title: "Users",
    variant: "totalUsers",
    icon: twoUser,

    value: 40097,
  },
  {
    title: "Active Users",
    variant: "activeUsers",
    icon: threeUser,
    value: 32040,
  },
  {
    title: "Users with Loans",
    variant: "usersWithLoans",
    icon: loansIcon,
    value: 10021,
  },
  {
    title: "Users with Savings",
    variant: "usersWithSavings",
    icon: stackIcon,
    value: 40044,
  },
];

export const det = [
  {
    label: "General Details",
    value: "general",
  },
  {
    label: "Documents",
    value: "doc",
  },
  {
    label: "Bank details",
    value: "bank",
  },
  {
    label: "Loans",
    value: "loan",
  },
  {
    label: "Savings",
    value: "savings",
  },
  {
    label: "App and System",
    value: "system",
  },
];
