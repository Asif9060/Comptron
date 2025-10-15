import { motion } from "framer-motion";
import { EVENT_ARRAY } from "./eventDetails";

const footerSocials = [
   {
      label: "Facebook",
      href: "https://www.facebook.com/comptron.nwu",
      icon: (
         <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M21 12.001C21 6.478 16.523 2 11 2S1 6.478 1 12.001c0 4.985 3.657 9.128 8.438 9.878v-6.994H6.898v-2.884h2.54V9.845c0-2.506 1.492-3.89 3.778-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.874h2.773l-.443 2.884h-2.33v6.994C17.343 21.13 21 16.986 21 12.001Z" />
         </svg>
      ),
   },
   {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nwucomptron/",
      icon: (
         <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M4.98 3.5a2.49 2.49 0 11-.002 4.98A2.49 2.49 0 014.98 3.5zM2 8.75h5.96V21H2zM17.21 8.5c-2.574 0-3.74 1.414-4.193 2.405V8.75H7.11c.08 1.398 0 12.25 0 12.25h5.907v-6.84c0-.365.026-.731.134-.993.293-.73.96-1.489 2.08-1.489 1.468 0 2.054 1.123 2.054 2.77V21H23v-6.998c0-3.745-1.995-5.502-4.79-5.502z" />
         </svg>
      ),
   },
   {
      label: "YouTube",
      href: "https://www.youtube.com/@ComptronClubNWU",
      icon: (
         <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M23.498 6.186a2.995 2.995 0 00-2.108-2.12C19.26 3.5 12 3.5 12 3.5s-7.26 0-9.39.566A2.995 2.995 0 00.502 6.186 31.426 31.426 0 000 12a31.43 31.43 0 00.502 5.814 2.995 2.995 0 002.108 2.12C4.74 19.5 12 19.5 12 19.5s7.26 0 9.39-.566a2.995 2.995 0 002.108-2.12A31.426 31.426 0 0024 12a31.426 31.426 0 00-.502-5.814ZM9.75 15.02V8.98l6.3 3.02-6.3 3.02Z" />
         </svg>
      ),
   },
];

const quickLinks = [
   { label: "Registration Hub", href: "/CseFest/registration" },
   ...EVENT_ARRAY.map((event) => ({ label: event.title, href: event.pagePath })),
];

const contactItems = [
   {
      label: "Email",
      value: "comptron@nwu.ac.bd",
      icon: (
         <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24">
            <path d="M3.75 5.25h16.5a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6.75a1.5 1.5 0 011.5-1.5z" />
            <path d="M4.5 6l7.5 6 7.5-6" />
         </svg>
      ),
   },
   {
      label: "Phone",
      value: "+880 1400-874851",
      icon: (
         <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24">
            <path d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a1.5 1.5 0 001.5-1.5v-2.426a1.5 1.5 0 00-1.184-1.47l-3.33-.666a1.5 1.5 0 00-1.512.67l-.975 1.462a11.953 11.953 0 01-5.438-5.438l1.462-.975a1.5 1.5 0 00.67-1.512l-.666-3.33a1.5 1.5 0 00-1.47-1.184H3.75a1.5 1.5 0 00-1.5 1.5z" />
         </svg>
      ),
   },
   {
      label: "Address",
      value: "NWU Building-2 Campus, Khulna",
      icon: (
         <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24">
            <path d="M12 2.25a6.75 6.75 0 00-6.75 6.75c0 4.989 6.75 12.75 6.75 12.75s6.75-7.761 6.75-12.75A6.75 6.75 0 0012 2.25z" />
            <path d="M12 10.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
         </svg>
      ),
   },
];

const eventHighlights = [
   { label: "Date", value: "10-11 November" },
   { label: "Venue", value: "NWU Building 2 Campus" },
   { label: "Duration", value: "2 Day Event" },
];

const PRIMARY_ACCENT = "#FFB860";

const RegistrationFooter = () => (
   <footer
      className="relative z-10 overflow-hidden border-t"
      style={{ borderColor: `${PRIMARY_ACCENT}` }}>
      <span
         className="pointer-events-none absolute inset-x-0 top-0 h-px"
         style={{
            background: `linear-gradient(90deg, transparent 0%, ${PRIMARY_ACCENT}66 50%, transparent 100%)`,
         }}></span>
      <span
         className="pointer-events-none absolute inset-0"
         style={{
            background:
               "radial-gradient(ellipse at top, #1e3a8a 0%, #1e3a5f 20%, #0f172a 40%, #020617 60%, #000000 100%)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
         }}></span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1c1535]/30 to-[#0f172a]/80"></span>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12">
         <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.15fr_repeat(3,minmax(0,0.75fr))] lg:gap-16">
            <motion.div
               initial={{ opacity: 0, y: 18 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
               className="max-w-md space-y-6 text-gray-300">
               <div className="flex items-center gap-6">
                  <div
                     className="flex items-center justify-center rounded-2xl shadow-[0_20px_45px_rgba(255,184,96,0.18)]"
                     style={{
                        width: "7.5rem",
                        height: "4.75rem",
                        background:
                           "linear-gradient(160deg, rgba(255,184,96,0.22), rgba(255,184,96,0.05))",
                        border: `1px solid ${PRIMARY_ACCENT}66`,
                     }}>
                     <img
                        src="/logos/fest.png"
                        alt="NWU CSE Fest"
                        className="h-14 w-auto object-contain"
                        draggable={false}
                     />
                  </div>
                  <div className="space-y-1">
                     <p
                        className="text-xs uppercase tracking-[0.4em]"
                        style={{ color: `${PRIMARY_ACCENT}CC` }}>
                        NWU CSE Fest 2025
                     </p>
                     <h3 className="text-xl font-semibold text-white">
                        Celebrate Technology, Innovation, and Creativity.
                     </h3>
                  </div>
               </div>
               <p className="text-sm leading-relaxed text-gray-400">
                  Join us for an exciting celebration of technology, innovation, and
                  creativity. Experience the thrilling NWU CSE Fest with competitions,
                  exhibitions, and networking opportunities.
               </p>
               <div className="flex items-center gap-3">
                  {footerSocials.map((item) => (
                     <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-sm text-gray-200 transition duration-300 hover:-translate-y-0.5 hover:border-[#FFB860]/80 hover:text-[#FFB860]">
                        {item.icon}
                        <span className="sr-only">{item.label}</span>
                     </a>
                  ))}
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 22 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
               className="space-y-4 text-gray-300">
               <div>
                  <p className="text-sm font-semibold text-white">Quick Links</p>
                  <span
                     className="mt-1 block h-[2px] w-10 rounded"
                     style={{ backgroundColor: PRIMARY_ACCENT }}></span>
               </div>
               <ul className="space-y-3 text-sm">
                  {quickLinks.map((item) => (
                     <li key={item.label}>
                        <a
                           href={item.href}
                           className="transition-colors hover:text-[#FFB860]">
                           {item.label}
                        </a>
                     </li>
                  ))}
               </ul>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 22 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
               className="space-y-4 text-gray-300">
               <div>
                  <p className="text-sm font-semibold text-white">Contact Info</p>
                  <span
                     className="mt-1 block h-[2px] w-10 rounded"
                     style={{ backgroundColor: PRIMARY_ACCENT }}></span>
               </div>
               <ul className="space-y-3 text-sm">
                  {contactItems.map((item) => (
                     <li key={item.label} className="flex items-start gap-3">
                        <span className="mt-1" style={{ color: PRIMARY_ACCENT }}>
                           {item.icon}
                        </span>
                        <div className="flex-1">
                           <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                              {item.label}
                           </p>
                           <p className="text-sm text-gray-200">{item.value}</p>
                        </div>
                     </li>
                  ))}
               </ul>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 22 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
               className="space-y-4 text-gray-300">
               <div>
                  <p className="text-sm font-semibold text-white">Event Info</p>
                  <span
                     className="mt-1 block h-[2px] w-10 rounded"
                     style={{ backgroundColor: PRIMARY_ACCENT }}></span>
               </div>
               <ul className="space-y-3 text-sm">
                  {eventHighlights.map((item) => (
                     <li key={item.label} className="space-y-1">
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                           {item.label}
                        </p>
                        <p className="text-base font-semibold text-white">{item.value}</p>
                     </li>
                  ))}
               </ul>
            </motion.div>
         </div>

         <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-gray-500">
            <div className="space-y-1 text-gray-400">
               <p>© 2025 NWU CSE Fest. All rights reserved.</p>
               <p className="text-[0.7rem] text-[#E5BA7A]">
                  Organized by Department of CSE, North Western University, Khulna
               </p>
               <p className="text-[0.7rem] text-[#E5BA7A]">
                  Supported by <a href="https://comptron.nwu.ac.bd/">Comptron-Creativity Assembled</a>, North Western University, Khulna
               </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs">
               <a href="#" className="transition-colors hover:text-[#FFB860]">
                  Privacy Policy
               </a>
               <a href="#" className="transition-colors hover:text-[#FFB860]">
                  Terms of Service
               </a>
               <span className="text-gray-600">•</span>
               <p className="text-xs text-gray-400">
                  Developed by <span style={{ color: PRIMARY_ACCENT }}>AF</span>
               </p>
            </div>
         </motion.div>
      </div>
   </footer>
);

export default RegistrationFooter;
