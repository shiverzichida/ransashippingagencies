import { setupMotion } from "./animations/motion.js";
import { setupInquiryForm } from "./components/inquiry-form.js";
import { setupNavigation } from "./components/navigation.js";
import { setupI18n } from "./utils/i18n.js";

setupNavigation();
setupI18n();
setupMotion();
setupInquiryForm();
