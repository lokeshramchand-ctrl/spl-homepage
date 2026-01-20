// Public entry point for all icon components
// ❌ No .svg imports here
// ✅ Only TSX icon components

import { HomeFrontIcon } from "./Home_Front";
import InvoiceSvg from "./Invoice";
import BadgeIcon from "./Badge";

export { Finance } from "./Finance";
export { FinanceStrategyIcon } from "./Finance-strategy";
export { EducationIcon } from "./Education";
export { BadgeIcon };
export { InvoiceIcon } from "./Invoice";
export { RealEstateIcon } from "./Real_Estate";
export { GovernmentIcon } from "./Government";
export { HomeFrontIcon } from "./Home_Front";

// Re-export shared icon props
export type { IconProps } from "./Icon";
