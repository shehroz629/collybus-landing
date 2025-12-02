"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore - createPortal is available in react-dom
import { createPortal } from "react-dom";
import { ArrowRight, BarChart3, Shield, LineChart, Layers, Activity, Cpu } from "lucide-react";
import ContactForm from "@/components/contact-form";

// Core GUI SVG Icon Component
const CoreGuiIcon = () => (
  <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 20.5933V3.50598C0.316341 1.64809 1.75217 0.192594 3.65104 0.00328135L27.6995 0C29.6607 0.161449 31.1973 1.71202 31.4079 3.66088L31.412 20.3196C31.2752 22.4201 29.6697 24.0174 27.5774 24.1608C19.4345 24.0887 11.2645 24.2944 3.13801 24.0567C1.53664 23.7076 0.17702 22.2422 0 20.5933Z" fill="#F2C016"/>
    <path d="M19.6921 25.6333V27.7846H25.3051C25.3518 27.7846 25.6804 27.9173 25.7476 27.9559C26.6393 28.4648 26.3836 29.8523 25.3608 29.9916L6.22378 29.9998C5.30508 29.9867 4.77975 29.0016 5.33704 28.246C5.47062 28.0657 5.88859 27.7846 6.10331 27.7846H11.7163V25.6333H19.6912H19.6921Z" fill="#F2C016"/>
  </svg>
);

// White-label SVG Icon Component
const WhiteLabelIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5122 0.0292683C16.2379 -0.204296 16.8343 1.01566 18.0959 1.71218C19.2179 2.33154 21.1239 1.29093 22.4857 2.55156C23.5242 3.51397 23.3418 5.35224 24.2499 6.17284C25.5804 7.37403 27.3311 7.74002 26.8254 10.0809C26.694 10.6877 26.084 11.9702 26.0799 12.4572C26.0705 13.7449 27.3269 14.7417 26.7618 16.4174C26.2478 17.9418 24.2917 18.192 23.7578 19.5017C23.2854 20.6601 23.2896 22.0031 22.0457 22.7069C21.0332 23.2804 19.9519 22.9373 18.8582 23.0312C17.4933 23.149 16.5778 24.9581 14.9543 24.9873C13.3308 25.0165 12.3747 23.1521 10.9806 23.0312C9.73142 22.9227 8.54587 23.3586 7.46772 22.4859C6.53346 21.7299 6.49801 20.5235 6.08093 19.5017C5.45635 17.9699 2.92468 17.8365 2.89757 15.5769C2.8861 14.5926 3.7651 13.2924 3.75988 12.4582C3.75676 11.9588 3.13114 10.6471 2.99976 10.0183C2.52324 7.72542 4.3146 7.35422 5.58982 6.17389C6.71593 5.13223 6.14662 2.97698 8.02139 2.12822C9.16732 1.60896 10.4457 2.12092 11.4873 1.84773C12.3423 1.62251 13.261 0.20027 14.5101 0.0313526L14.5122 0.0292683ZM17.2044 9.27696L15.581 5.94554C15.215 5.46277 14.5758 5.51073 14.2327 5.99246C13.8897 6.47419 12.823 9.16747 12.6072 9.30303L8.89309 9.86191C8.39364 10.0444 8.11106 10.5866 8.44473 11.0527L11.1578 13.7929C11.0598 14.9169 10.6115 16.1921 10.5531 17.2984C10.5155 18.0064 10.8586 18.3484 11.5687 18.2358L14.8959 16.4945L18.2763 18.2358C18.9906 18.3484 19.3295 18.0033 19.2919 17.2984C19.2335 16.1921 18.7852 14.9169 18.6872 13.7929L21.3638 11.0944C21.736 10.646 21.4941 10.1142 21.0124 9.87859L17.2044 9.27696Z" fill="#F2C016"/>
    <path d="M23.5577 23.3191C23.9195 22.9573 24.2563 22.3891 24.4575 21.9167C24.6775 21.3985 24.8683 20.2839 25.1102 19.9158C25.1728 19.8209 25.7922 19.3652 25.8881 19.3652C26.1509 19.3652 29.1309 22.6539 29.6345 23.0324C30.0109 23.4359 29.842 24.0084 29.3791 24.2628L25.5753 25.7664L24.0686 29.567C23.859 29.959 23.4534 30.0779 23.0415 29.9371C21.2992 28.3887 19.7205 26.6495 18.0449 25.024C18.2827 24.902 18.6466 24.5078 18.8791 24.4546C19.5099 24.3108 20.5787 24.5078 21.2815 24.438C22.028 24.3639 23.0301 23.8467 23.5577 23.3191Z" fill="#F2C016"/>
    <path d="M11.7128 24.9163C11.7587 24.9955 11.7108 25.1175 11.6482 25.1843C10.0883 26.4918 8.67964 28.4625 7.11768 29.7075C6.59737 30.1225 6.10105 30.1277 5.74653 29.5156L4.26694 25.7661L0.411044 24.2365C-0.0102058 23.9612 -0.157227 23.4232 0.206675 23.0321L3.79564 19.438C3.95517 19.2273 4.64336 19.78 4.73199 19.9145C4.96138 20.2627 5.14281 21.32 5.33988 21.8049C5.85914 23.0853 6.94668 24.1833 8.36162 24.4033C9.17179 24.5295 10.1363 24.3209 10.8975 24.4429C10.985 24.4575 11.6878 24.8756 11.7118 24.9163H11.7128Z" fill="#F2C016"/>
    <path d="M14.9988 8.20533C15.297 8.69957 15.8579 10.3825 16.25 10.663C16.7463 11.0175 18.4105 10.9372 19.059 11.1718C18.6774 11.8162 17.1728 12.6524 17.0602 13.3552C16.9893 13.7952 17.593 15.915 17.4971 16.0099C16.7338 15.8462 15.6171 14.8098 14.882 14.8327C14.4357 14.8463 12.4525 16.1142 12.3461 16.0099C12.3962 15.2508 12.8018 14.1998 12.7716 13.472C12.7372 12.6399 11.2179 11.8694 10.7842 11.1718C11.4369 10.957 13.0865 11.0248 13.5932 10.663C13.9446 10.4127 14.5077 8.7955 14.8246 8.30647C14.8736 8.2314 14.8163 8.16675 14.9988 8.20637V8.20533Z" fill="#F2C016"/>
  </svg>
);

// API SVG Icon Component
const ApiIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.81467 0.0183765L24.069 0C27.1797 0.332517 29.6614 2.82202 29.9965 5.92755L30 24.0068C29.6972 27.1421 27.1964 29.6631 24.069 29.9965L5.98968 30C2.85702 29.6876 0.329891 27.199 0 24.069L0.00700185 5.86892C0.357019 2.82727 2.77739 0.39027 5.81467 0.0175013V0.0183765ZM16.5558 8.92282C16.1419 8.96745 15.8365 9.25446 15.6869 9.62898C14.797 12.9419 13.1545 16.3493 12.346 19.65C12.0047 21.0431 13.6892 21.6573 14.2895 20.4156C15.1899 17.0896 16.8376 13.6638 17.6496 10.3483C17.6829 10.2109 17.7406 10.0849 17.7328 9.93875C17.7013 9.34109 17.1421 8.85982 16.555 8.92282H16.5558ZM9.74099 10.6257C9.58785 10.6519 9.4146 10.7307 9.29822 10.8374C8.35229 12.024 6.6652 13.1633 5.79366 14.342C5.49702 14.7436 5.47777 15.2074 5.76216 15.6213C6.9566 16.5786 8.10903 18.2805 9.29822 19.16C10.2188 19.8407 11.3659 18.9106 10.9057 17.8806C10.0525 16.87 9.02783 15.9976 8.12653 15.0228L8.1834 14.8985L10.7762 12.3154C11.3826 11.5129 10.7368 10.4576 9.74186 10.6265L9.74099 10.6257ZM19.762 10.6248C19.1468 10.7525 18.7732 11.6162 19.1118 12.1614L21.8708 14.9737C21.0291 15.9984 19.9352 16.8472 19.0917 17.8789C18.6367 18.8808 19.7541 19.8276 20.665 19.1897C21.6215 17.9953 23.3243 16.8428 24.2037 15.6537C24.5004 15.252 24.5196 14.7882 24.2352 14.3743C23.0408 13.417 21.8883 11.716 20.6992 10.8357C20.4183 10.6283 20.1094 10.5513 19.762 10.6239V10.6248Z" fill="#F2C016"/>
  </svg>
);

// Visibility SVG Icon Component
const VisibilityIcon = () => (
  <svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.0018241 19.0455C0.162189 18.753 0.224148 18.4187 0.482918 18.1827L8.06379 10.6009C8.87563 9.96762 9.795 10.0669 10.5476 10.7394L16.0948 16.2874L28.4337 3.9503L28.4684 3.84826C28.4684 3.66693 27.0005 2.38675 26.7754 2.09244C26.2141 1.35714 26.5458 0.43413 27.4725 0.304745C28.9331 0.101555 30.7891 0.142557 32.2943 0.0951769C33.0032 0.0723978 34.411 -0.200951 34.9613 0.297455C35.5116 0.795861 35.2401 1.65873 35.2173 2.2601C35.1554 3.93299 35.1763 5.78174 35.0123 7.43094C34.9431 8.12616 34.431 8.78676 33.6766 8.70202C33.0333 8.63004 31.9718 7.15851 31.4287 6.73846H31.2921C26.5084 11.4893 21.7923 16.3212 16.9595 21.0127C16.2032 21.39 15.5508 21.2997 14.8939 20.7968L9.26106 15.1904L9.13076 15.2505L3.55171 20.8396C2.25422 22.1836 0.539408 21.2733 0 19.7353V19.0464L0.0018241 19.0455Z" fill="#F2C016"/>
    <path d="M31.6119 29.7736C31.5244 29.8611 31.3859 29.9285 31.2602 29.9385C29.8087 29.8009 28.0511 30.1116 26.6369 29.9385C26.3946 29.9084 26.2269 29.7581 26.1413 29.5394L26.1367 14.959L31.395 9.67334C31.5317 9.83644 31.7732 9.9476 31.7777 10.1854L31.7559 29.5394C31.7176 29.6196 31.6748 29.7098 31.6119 29.7727V29.7736Z" fill="#F2C016"/>
    <path d="M23.9168 17.1851V29.35C23.9168 29.617 23.6143 29.9049 23.3327 29.9377C21.9049 30.1035 20.1719 29.8083 18.7095 29.9395C18.4826 29.9313 18.3304 29.709 18.2266 29.5258L18.2311 22.6994C18.4279 22.5409 18.6703 22.3896 18.8525 22.2183C20.5856 20.5928 22.1628 18.7914 23.9168 17.1851Z" fill="#F2C016"/>
    <path d="M10.2705 19.2522C10.3908 19.2221 10.4081 19.3023 10.4773 19.3551C12.0409 20.5524 13.2664 22.9187 15.3539 23.3014C15.6628 23.3579 15.9489 23.182 15.9944 23.5565C16.2095 25.3287 15.8259 27.5319 15.9926 29.3506C15.9762 29.6103 15.7484 29.91 15.4778 29.9383C14.0482 29.7761 12.1648 30.1451 10.7917 29.931C10.5484 29.8927 10.2705 29.5665 10.2705 29.3488V19.2512V19.2522Z" fill="#F2C016"/>
    <path d="M8.06535 29.5568C8.01889 29.7427 7.74554 29.914 7.54964 29.9368C6.12913 30.1071 4.38426 29.8046 2.92822 29.9386C2.68858 29.9122 2.51546 29.7554 2.43255 29.5395L2.41797 23.5978C3.37469 23.5358 4.16194 23.1067 4.86262 22.4935C5.96968 21.5249 6.93642 20.2803 8.06535 19.3208V29.5559V29.5568Z" fill="#F2C016"/>
  </svg>
);

// Order Tickets SVG Icon Component
const OrderTicketsIcon = () => (
  <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.748 0.00827578C15.4027 -0.036962 16.1137 0.106434 16.7205 0.36079L29.003 6.41497C30.4899 7.458 30.3047 9.23423 28.7444 10.1074C27.4803 10.8158 26.0003 11.4654 24.6858 12.1192C21.829 13.5395 18.9577 14.9777 16.0394 16.2512C15.383 16.3852 14.7002 16.3852 14.0421 16.2632C9.60624 14.3342 5.31719 12.039 0.964113 9.91877C-0.0456287 9.28885 -0.280353 7.85576 0.449427 6.92283C0.941068 6.29377 2.7079 5.5657 3.49146 5.17307C6.75114 3.5428 10.0518 1.99277 13.3098 0.36079C13.7493 0.184106 14.2717 0.041564 14.7454 0.00827578H14.748Z" fill="#F2C016"/>
    <path d="M1.45625 13.035C1.69438 13.0026 1.87192 13.1152 2.08872 13.204C5.81188 14.7207 9.51967 17.1226 13.248 18.7204C14.4813 19.2181 15.5508 19.2181 16.785 18.7204L28.354 13.0341C30.0192 13.2194 30.5288 15.3805 29.3944 16.5072C25.2769 18.752 20.9725 20.6827 16.785 22.8098C15.5508 23.3074 14.4813 23.3074 13.248 22.8098C9.5393 20.9098 5.73677 19.1848 2.02385 17.2942C1.02606 16.7863 0.0163164 16.3621 9.91069e-05 15.0323C-0.00928987 14.265 0.649646 13.1451 1.4571 13.0359L1.45625 13.035Z" fill="#F2C016"/>
    <path d="M1.39058 19.8728C1.54337 19.8412 1.69359 19.8403 1.83784 19.9086L13.312 25.5565C14.4737 26.0234 15.5594 26.0234 16.7211 25.5565L28.2883 19.8728C28.7023 19.7865 29.2263 20.1348 29.4884 20.4327C30.3718 21.439 30.0935 23.0018 28.9233 23.6386L16.7211 29.645C15.5312 30.1144 14.501 30.1221 13.312 29.645C10.0532 28.013 6.75254 26.463 3.49371 24.8327C2.61286 24.3923 0.664216 23.6275 0.246833 22.7765C-0.248223 21.7676 0.210131 20.1177 1.39144 19.8719L1.39058 19.8728Z" fill="#F2C016"/>
  </svg>
);

// Sizing SVG Icon Component
const SizingIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.0511 29.9759C4.75607 29.4026 -1.81479 20.3656 0.448758 11.3099C2.01775 5.03549 7.62891 0.353532 14.109 0V15.076C14.109 15.1526 14.2373 15.4451 14.3124 15.5163L24.9356 26.1489C24.9512 26.2357 24.5359 26.5587 24.4405 26.6369C22.1003 28.5595 18.8864 29.8078 15.865 29.9759C15.3198 30.0064 14.594 30.0096 14.0504 29.9759H14.0511Z" fill="#F2C016"/>
    <path d="M29.9762 13.7588V14.11H15.8662V0C23.2309 0.379343 29.3411 6.3143 29.9215 13.6657L29.9754 13.7588H29.9762Z" fill="#F2C016"/>
    <path d="M29.9761 15.8667C29.9706 15.9825 29.9839 16.1021 29.9761 16.2179C29.9753 16.2288 29.926 16.2648 29.9221 16.311C29.6554 19.5147 28.3414 22.5533 26.1999 24.9404L17.1543 15.8675H29.9761V15.8667Z" fill="#F2C016"/>
  </svg>
);

// APIs SVG Icon Component
const ApisIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.3403 24.9099C25.5899 25.2089 25.1823 25.8006 24.8005 26.4745C24.1684 26.4096 23.2365 26.5943 22.6427 26.4839C22.577 26.4714 22.5316 26.4542 22.5027 26.39L21.4457 24.4379C22.7789 23.6371 23.81 22.4176 24.6926 21.1519H29.9924V19.3939H25.6001C26.0218 18.266 26.3614 17.0903 26.4201 15.8786H29.9924V14.1206H26.4201C26.3661 12.905 26.021 11.734 25.6001 10.6053H29.9924V8.84728H24.6926C23.8093 7.58159 22.7789 6.36209 21.4457 5.56135L22.5027 3.6092C22.5316 3.54424 22.577 3.52701 22.6427 3.51527C23.2365 3.40569 24.1684 3.58963 24.8005 3.52466C25.1651 4.15868 25.5673 4.74731 26.2636 5.04944C28.6835 6.09831 30.9743 3.43465 29.5723 1.21168C29.142 0.529129 28.4746 0.181595 27.7086 0H26.9474C26.0093 0.208208 25.1745 0.830485 24.8616 1.76116L21.5591 1.7862L19.8927 4.61502C19.1619 4.3168 18.4226 3.99196 17.6386 3.86438L17.6363 0H15.8791V3.57397C15.2915 3.49648 14.7071 3.49648 14.1218 3.57397V0H12.3654L12.363 3.86438C11.5822 3.99666 10.8366 4.30506 10.1168 4.62441L8.44253 1.78699L5.14011 1.76194C4.82716 0.830486 3.99236 0.208992 3.05429 0.000783502H2.29303C1.20553 0.133066 0.141489 1.19837 0.00926636 2.28559C-0.0196817 2.52276 0.0303906 2.80376 0.00926636 3.04719C0.448964 5.31009 3.2937 6.11945 4.75127 4.24714C4.93435 4.01232 5.00946 3.74226 5.20114 3.52545H7.40823L8.56302 5.53317C7.79864 6.05213 7.06633 6.66188 6.44982 7.35225C6.03124 7.82111 5.70265 8.35808 5.29816 8.83711L0.00926636 8.84806V10.6061L4.40233 10.6358C3.95403 11.7434 3.64655 12.9199 3.5824 14.1214H0.0100495V15.8786H3.5824C3.64264 17.0817 3.96185 18.2527 4.40233 19.3642L0.00926636 19.3939V21.1519L5.29816 21.1629C5.70265 21.6419 6.03124 22.1789 6.44982 22.6477C7.06633 23.3381 7.79864 23.9471 8.56302 24.4668L7.40823 26.4745H5.20114C5.00946 26.2577 4.93435 25.9877 4.75127 25.7529C3.29292 23.8806 0.448181 24.6899 0.00926636 26.9528V27.7144C0.50373 30.4328 4.14101 30.8477 5.14011 28.2381L8.44253 28.213L10.1168 25.3756C10.8351 25.6996 11.583 25.9963 12.3662 26.1333V30H14.1234V26.426C14.7117 26.5035 15.2931 26.5027 15.8806 26.426V30H17.6378V26.1333C18.4234 26.0127 19.1643 25.6808 19.895 25.385L21.5615 28.2138L24.8639 28.2388C25.5657 30.2677 28.3643 30.6426 29.5504 28.8235C30.9759 26.6374 28.7625 23.9455 26.3418 24.9106L26.3403 24.9099ZM14.9997 20.0514C12.2113 20.0514 9.95096 17.7901 9.95096 15.0004C9.95096 12.2107 12.2113 9.94938 14.9997 9.94938C17.7881 9.94938 20.0484 12.2107 20.0484 15.0004C20.0484 17.7901 17.7881 20.0514 14.9997 20.0514Z" fill="#F2C016"/>
  </svg>
);

// Risk SVG Icon Component
const RiskIcon = () => (
  <svg width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.9753 0C17.98 0 18.9206 0.390028 19.6569 1.05629C24.4646 8.52034 28.825 16.3044 33.4674 23.8862C35.0168 26.5959 32.9986 29.8426 29.9027 29.7638H4.02457C1.01132 29.7385 -0.9077 26.8391 0.436491 24.0719C4.64025 17.1983 8.60766 10.1777 12.8173 3.30893C13.8658 1.59805 14.6332 0.00194528 16.9753 0ZM18.5879 8.73044C18.3448 8.77518 18.1104 8.95804 17.9411 9.13214C16.0941 11.59 13.7957 13.8533 11.9662 16.3034C11.7172 16.637 11.4468 16.9551 11.4896 17.3996C11.547 17.9871 12.0673 18.3761 12.6286 18.4335C13.1898 18.4909 14.0885 18.4102 14.5709 18.5191C14.6925 18.5463 14.9289 18.7166 14.96 18.8352L13.9912 23.6459C14.1313 24.6993 15.1798 25.0961 15.9774 24.3715C17.8448 21.8932 20.186 19.6124 22.0311 17.1399C22.1595 16.9677 22.3939 16.6993 22.4367 16.497C22.5865 15.7753 22.1702 15.1139 21.4329 15.0157C20.9719 14.9544 19.4964 15.0186 19.2153 14.8561C19.0285 14.7482 19.0169 14.5527 19.0315 14.3552C19.1268 13.0898 19.7687 11.5054 19.9166 10.2011C20.0216 9.27901 19.6199 8.54467 18.5879 8.73336V8.73044Z" fill="#F2C016"/>
  </svg>
);

// Security SVG Icon Component
const SecurityIcon = () => (
  <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5757 0.0224055C12.8379 -0.0133565 13.1045 0.00196531 13.3676 0.012183C17.1774 1.5244 20.8574 3.39254 24.614 5.04696C25.3981 5.51186 25.9114 6.26627 26 7.1782C25.7283 11.6578 25.9046 16.0199 24.0362 20.1973C22.2297 24.2358 18.266 28.3033 14.021 29.8206C12.5508 30.346 11.384 29.6171 10.0977 28.924C4.28879 25.7897 0.895089 20.1351 0.345666 13.6494C0.192619 11.8443 0.0378522 9.72752 0.00173991 7.92495C-0.0274938 6.48595 0.303539 5.63192 1.61218 4.93201C5.09701 3.59775 8.53627 1.48949 12.0022 0.195252C12.1776 0.129689 12.3926 0.0479498 12.5766 0.0224055H12.5757ZM17.5403 10.8021C17.4302 10.8242 17.3202 10.9034 17.223 10.9596L12.0134 16.7156C11.0504 15.9297 10.1992 14.9947 9.25852 14.1892C8.73146 13.738 8.22158 13.2526 7.4916 13.7218C6.61974 14.2821 7.04966 15.326 7.75986 15.8088C8.99112 16.7215 10.0719 18.0933 11.2671 19.0069C11.8363 19.442 12.3384 19.4948 12.8912 19.0018L18.7724 12.4275C19.2565 11.5011 18.609 10.5858 17.5403 10.8038V10.8021Z" fill="#F2C016"/>
  </svg>
);

// Better Fills SVG Icon Component
const BetterFillsIcon = () => (
  <svg width="33" height="30" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31.3584 0C31.5373 0.000678756 31.7148 0.0364055 31.8799 0.105469C32.045 0.174586 32.1942 0.276309 32.3203 0.40332C32.4465 0.530422 32.5464 0.680964 32.6143 0.84668C32.6821 1.01238 32.7175 1.19007 32.7168 1.36914C32.7154 1.72891 32.5718 2.07372 32.3174 2.32812C32.063 2.58253 31.7182 2.72617 31.3584 2.72754H30V16.1328C30 18.5009 28.0487 20.4492 25.6807 20.4492H17.7227V22.0684C19.3017 22.635 20.4493 24.1406 20.4492 25.9053C20.449 28.1477 18.6067 30 16.3643 30C14.1218 30 12.2668 28.1477 12.2666 25.9053C12.2666 24.1434 13.4182 22.639 14.9961 22.0703V20.4492H7.04492C4.67692 20.4492 2.72656 18.5009 2.72656 16.1328V2.72754H1.36816C1.1894 2.72818 1.01212 2.6937 0.84668 2.62598C0.68097 2.55807 0.530416 2.45722 0.40332 2.33105C0.276305 2.20497 0.174584 2.05571 0.105469 1.89062C0.0364024 1.72555 0.000672376 1.54808 0 1.36914C-0.000713068 1.18921 0.034013 1.01012 0.102539 0.84375C0.171063 0.677473 0.272247 0.526586 0.399414 0.399414C0.526596 0.272236 0.677457 0.171064 0.84375 0.102539C1.00997 0.0340665 1.18839 -0.000643561 1.36816 0H31.3584ZM15.4775 6.54199C15.2066 6.5597 14.9472 6.65812 14.7324 6.82422L9.36914 11.0391C9.08533 11.2621 8.90183 11.5889 8.8584 11.9473C8.81497 12.3056 8.91532 12.6668 9.1377 12.9512C9.36074 13.2351 9.6875 13.4185 10.0459 13.4619C10.4043 13.5053 10.7654 13.405 11.0498 13.1826L15.6377 9.58008L18.417 11.4121C18.6291 11.5521 18.8768 11.6297 19.1309 11.6367C19.3848 11.6437 19.636 11.5801 19.8555 11.4521L23.1963 9.5293C23.5079 9.34752 23.7347 9.04988 23.8271 8.70117C23.9195 8.35228 23.8704 7.98022 23.6895 7.66797C23.6004 7.5129 23.4815 7.37681 23.3398 7.26758C23.1982 7.15835 23.036 7.078 22.8633 7.03125C22.6905 6.98452 22.5096 6.97215 22.332 6.99512C22.1546 7.01808 21.9833 7.07593 21.8281 7.16504L19.2217 8.6748L16.3213 6.7627C16.0972 6.61454 15.8341 6.53634 15.5654 6.53711C15.5361 6.53793 15.5067 6.53928 15.4775 6.54199Z" fill="#F2C016"/>
  </svg>
);

// Faster Idea SVG Icon Component
const FasterIdeaIcon = () => (
  <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.9822 0.632222C14.5221 -0.210748 12.7231 -0.210733 11.263 0.632222L2.35951 5.77272C0.899445 6.61569 0 8.17356 0 9.8595V20.1405C0 21.8265 0.899445 23.3843 2.35951 24.2273L11.263 29.3678C12.7231 30.2108 14.5221 30.2108 15.9822 29.3678L24.8857 24.2273C26.3458 23.3843 27.2452 21.8265 27.2452 20.1405V9.8595C27.2452 8.17356 26.3458 6.61569 24.8857 5.77272L15.9822 0.632222ZM17.4183 9.7955C17.8575 9.35616 17.8575 8.64384 17.4183 8.20451C16.9789 7.76517 16.2666 7.76517 15.8272 8.20451L9.82722 14.2045C9.50547 14.5263 9.40923 15.0102 9.58335 15.4305C9.75748 15.8509 10.1677 16.125 10.6227 16.125H13.9068L9.82722 20.2045C9.38789 20.6439 9.38789 21.3561 9.82722 21.7955C10.2666 22.2348 10.9789 22.2348 11.4183 21.7955L17.4183 15.7955C17.74 15.4737 17.8362 14.9898 17.662 14.5695C17.4879 14.1491 17.0778 13.875 16.6227 13.875H13.3387L17.4183 9.7955Z" fill="#F2C016"/>
  </svg>
);

// Tighter Risk SVG Icon Component
const TighterRiskIcon = () => (
  <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.4467 0.192235C13.1258 -0.0640782 13.8742 -0.0640782 14.5533 0.192235L25.0533 4.1549C26.2243 4.59679 27 5.72332 27 6.98184V15.0773C27 20.2235 24.111 24.9279 19.5373 27.2293L14.5062 29.7609C13.8728 30.0797 13.1272 30.0797 12.4938 29.7609L7.46262 27.2293C2.88903 24.9279 0 20.2235 0 15.0773V6.98184C0 5.72332 0.775725 4.59679 1.94662 4.1549L12.4467 0.192235ZM13.5 3.01918L3 6.98184V15.0773C3 19.0798 5.24703 22.7389 8.80425 24.5288L13.5 26.8918V3.01918Z" fill="#F2C016"/>
  </svg>
);

const BRAND = "#F2C016";
const hexToRgba = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const b = parseInt(h, 16);
  const r = (b >> 16) & 255,
    g = (b >> 8) & 255,
    bl = b & 255;
  return `rgba(${r}, ${g}, ${bl}, ${a})`;
};

function HeroBackground() {
  const glow1 = `radial-gradient(circle at 50% 50%, ${hexToRgba(BRAND, 0.2)}, ${hexToRgba(BRAND, 0)} 60%)`;
  const glow2 = `radial-gradient(circle at 50% 50%, ${hexToRgba(BRAND, 0.12)}, ${hexToRgba(BRAND, 0)} 60%)`;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl"
        style={{ background: glow1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full blur-3xl"
        style={{ background: glow2 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ width: 6, height: 6, background: BRAND, left: `${5 + i * 7}%` }}
            initial={{ y: 320, opacity: 0 }}
            animate={{ y: [320, 210, 260, 190, 320], opacity: [0, 0.9, 0.8, 0.9, 0] }}
            transition={{ duration: 8 + (i % 4), delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      <svg className="absolute inset-x-0 top-1/3 w-full h-40 opacity-30" viewBox="0 0 1200 200" preserveAspectRatio="none">
        {[
          {
            stroke: hexToRgba(BRAND, 0.6),
            keyframes: [
              "M0 140 C150 120, 300 160, 450 110 S750 100, 900 140 S1050 180, 1200 120",
              "M0 120 C150 160, 300 130, 450 150 S750 80, 900 110 S1050 160, 1200 140",
            ],
            width: 2,
          },
          {
            stroke: "rgba(255,255,255,0.55)",
            keyframes: [
              "M0 100 C120 80, 300 120, 480 90 S780 110, 960 80 S1080 120, 1200 100",
              "M0 90 C120 120, 300 95, 480 130 S780 90, 960 120 S1080 80, 1200 110",
            ],
            width: 1,
          },
        ].map((p, i) => (
          <motion.path
            key={i}
            d={p.keyframes[0]}
            animate={{ d: p.keyframes }}
            transition={{ duration: 10 + i * 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            stroke={p.stroke}
            strokeWidth={p.width}
            fill="none"
          />
        ))}
      </svg>
      
    </div>
  );
}

function Hero({ title, subtitle }: { title: React.ReactNode; subtitle: string }) {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 relative z-10" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white pt-8 pb-8"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-5 text-white/80 max-w-3xl text-lg"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a href="/about" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-black" style={{ background: BRAND }}>
            About Us <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Section({ eyebrow, title, children, subdued = false, titleClassName, titleStyle, className }: { eyebrow?: string; title?: React.ReactNode; children: React.ReactNode; subdued?: boolean; titleClassName?: string; titleStyle?: React.CSSProperties; className?: string }) {
  return (
    <section className={`${subdued ? "bg-white/[0.02]" : ""} ${className || ""}`} style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          {eyebrow && (
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/50" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className={titleClassName ?? "text-2xl sm:text-3xl font-semibold text-white mt-2"} style={{ fontFamily: "Montserrat, sans-serif", ...titleStyle }}>
              {title}
            </h2>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function Pill({ icon: Icon, iconSrc, iconSvg, title, text }: { icon?: React.ElementType | null; iconSrc?: string; iconSvg?: React.ReactNode; title: string; text: string }) {
  return (
    <div className="group [perspective:1000px]" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div
        className="relative rounded-3xl border border-white/10 p-6 h-48 md:h-52 ring-1 ring-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
        style={{
          background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
        }}
        tabIndex={0}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center [backface-visibility:hidden]">
          <div className="w-16 h-16 flex items-center justify-center mb-4 exc-img">
            {iconSvg ? (
              iconSvg
            ) : iconSrc ? (
              <img src={iconSrc} alt={title} className="w-12 h-12 object-contain" />
            ) : Icon ? (
              <Icon size={30} color={BRAND} />
            ) : null}
          </div>
          <div className="text-center leading-tight text-lg sm:text-xl md:text-2xl" style={{ color: '#F2C016', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
            {title}
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-sm text-white/70 leading-relaxed text-center px-3">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoCard({ title, imgSrc }: { title: string; imgSrc: string }) {
  return (
    <div className="relative" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="relative rounded-3xl border border-white/10 p-6 h-40 md:h-44 ring-1 ring-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] bg-gradient-to-b from-[#222] to-[#0f0f0f]">
        <div className="absolute inset-0 rounded-3xl" style={{ background: `linear-gradient(180deg, ${hexToRgba(BRAND,0.12)} 0%, ${hexToRgba(BRAND,0.06)} 35%, rgba(0,0,0,0) 60%)` }} />
        <div className="relative flex items-center justify-center h-full">
          <img src={imgSrc} alt={`${title} logo`} className="h-12 md:h-14 w-28 md:w-32 object-contain" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  );
}

function WhatDesksGainCard({ iconSrc, iconSvg, title, text }: { iconSrc?: string; iconSvg?: React.ReactNode; title: string; text: string }) {
  return (
    <div className="group [perspective:1000px]" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div
        className="relative rounded-3xl border border-white/10 p-6 h-48 md:h-52 ring-1 ring-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
        style={{
          background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
        }}
        tabIndex={0}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center [backface-visibility:hidden]">
          <div className="w-16 h-16 flex items-center justify-center mb-4 exc-img">
            {iconSvg ? (
              iconSvg
            ) : iconSrc ? (
              <img src={iconSrc} alt={title} className="w-12 h-12 object-contain" />
            ) : null}
          </div>
          <div className="text-center leading-tight text-lg sm:text-xl md:text-2xl" style={{ color: '#F2C016', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
            {title}
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-sm text-white/70 leading-relaxed text-center px-3">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

function VenueLogoCard({ title, imgSrc, link }: { title: string; imgSrc: string; link: string }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative group"
      style={{ fontFamily: "Montserrat, sans-serif" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div
        className="relative rounded-3xl border border-white/10 p-6 h-40 md:h-44 ring-1 ring-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:border-white/20"
        style={{
          background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F2C016]/0 via-[#F2C016]/10 to-[#F2C016]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
        <div className="relative flex items-center justify-center h-full z-10">
          <img
            src={imgSrc}
            alt={`${title} logo`}
            className="h-12 md:h-14 w-28 md:w-32 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </motion.a>
  );
}

function ContactBox({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <motion.div
      className="block relative group cursor-pointer"
      style={{ fontFamily: "Montserrat, sans-serif" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onClick={onClick}
    >
      <div
        className="relative rounded-3xl border border-white/10 p-6 h-40 md:h-44 ring-1 ring-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:border-white/20"
        style={{
          background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F2C016]/0 via-[#F2C016]/10 to-[#F2C016]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
        <div className="relative flex items-center justify-center h-full z-10">
          <div className="text-center text-white/90 text-sm md:text-base font-medium px-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {title}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VenuesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const venues = [
    { title: "KuCoin", imgSrc: "/kucoin.png", link: "https://www.kucoin.com/" },
    { title: "Binance", imgSrc: "/binance.png", link: "https://www.binance.com/" },
    { title: "BitMEX", imgSrc: "/bitmex.png", link: "https://www.bitmex.com/" },
    { title: "Deribit", imgSrc: "/deribit.png", link: "https://www.deribit.com/" },
    { title: "OKX", imgSrc: "/okx.png", link: "https://www.okx.com/" },
    { title: "Kraken", imgSrc: "/karen.png", link: "https://www.kraken.com/" },
    { title: "BitGo", imgSrc: "/bitgo.png", link: "https://www.bitgo.com/" },
  ];

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const modalContent = isModalOpen ? (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-2 sm:p-4"
      onClick={handleModalClick}
    >
      <div 
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl 
          shadow-2xl max-w-2xl w-full max-h-[90vh] relative animate-fadeInUp 
          overflow-y-auto scrollbar-thin scrollbar-thumb-[#f2c016] scrollbar-track-transparent
          hover:scrollbar-thumb-[#d9ad14]"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0))'
        }}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold z-50
            transition-colors duration-200 ease-in-out hover:scale-110 transform"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="px-3 sm:px-6 py-6 sm:py-8">
          <ContactForm />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="space-y-5">
        {/* First row: 4 logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {venues.slice(0, 4).map((venue) => (
            <VenueLogoCard key={venue.title} title={venue.title} imgSrc={venue.imgSrc} link={venue.link} />
          ))}
        </div>
        {/* Second row: 3 logos + contact box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {venues.slice(4).map((venue) => (
            <VenueLogoCard key={venue.title} title={venue.title} imgSrc={venue.imgSrc} link={venue.link} />
          ))}
          <ContactBox 
            title="And more, get in touch now to integrate with the Collybus Ecosystem" 
            onClick={openModal}
          />
        </div>
      </div>

      {/* Modal - Rendered via Portal to ensure it's above header */}
      {isMounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}

type EngagementTabKey = "core" | "white" | "api";

function EngagementTabs() {
  const [tab, setTab] = useState<EngagementTabKey>("core");

  const tabs: { key: EngagementTabKey; label: string }[] = [
    { key: "core", label: "Core GUI" },
    { key: "white", label: "White-label" },
    { key: "api", label: "API" },
  ];

  const content: Record<
    EngagementTabKey,
    { title: string; text: string; icon: string | React.ReactNode; image: string }
  > = {
    core: {
      title: "Core GUI",
      text: "The COLLYBUS GUI delivers a fast, intuitive, and fully integrated trading experience designed for professional desks. Built with institutional workflows at its core, the platform consolidates market data, execution, and risk oversight into a single, high-performance interface.",
      icon: <CoreGuiIcon />,
      image: "/Core-GUI.png",
    },
    white: {
      title: "White-label",
      text: "Stream Your Own Liquidity. Capture More Client Flow. Fully Branded. \n\nThe COLLYBUS white-label platform empowers brokers, market makers, and trading venues to stream their own liquidity directly to clients through a premium, fully branded trading interface. Own the full execution experience, deepen client engagement, and capture a greater share of trading flow.\n\nWith multi-venue connectivity, institutional-grade execution tools, and complete brand customisation, the COLLYBUS white-label solution gives you everything needed to scale your liquidity distribution, strengthen client relationships, and compete at the highest institutional level while we manage the infrastructure, upgrades, and integrations.",
      icon: <WhiteLabelIcon />,
      image: "/White-Label-your-brand.png",
    },
    api: {
      title: "API",
      text:
        "Programmatic access to trading, risk and reporting. REST and WebSocket endpoints for orders, positions, balances, funding and market data, with built-in reporting to integrate cleanly into your systems.",
      icon: <ApiIcon />,
      image: "/API-New.png",
    },
  };

  const active = content[tab];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <div key={t.key} className="relative w-full">
              {isActive && (
                <div
                  className="absolute -inset-2 sm:-inset-3 md:-inset-5 rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2rem]"
                  style={{ background: hexToRgba(BRAND, 0.12), filter: "blur(18px)" }}
                />
              )}
              <button
                onClick={() => setTab(t.key)}
                className={`relative w-full px-3 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 rounded-2xl sm:rounded-3xl border transition-all duration-200 text-xs sm:text-sm md:text-lg font-semibold flex items-center justify-center outline-none focus:outline-none focus:ring-0 ${
                  isActive
                    ? "border-2 border-[#F2C016] text-white bg-[#202020]"
                    : "border-white/10 text-white/80 bg-[#1a1a1a] hover:bg-[#202020]"
                }`}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: isActive
                    ? "0 0 18px rgba(242,192,22,0.35), 0 0 36px rgba(242,192,22,0.18)"
                    : "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 22px rgba(0,0,0,0.35)",
                }}
              >
                {t.label}
              </button>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100, transition: { duration: 0.22, ease: "easeIn" } }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-3xl border border-white/10 p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center shadow-[0_20px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/5 min-h-[18rem] md:min-h-[20rem]"
          style={{
            background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.6)",
            willChange: "transform, opacity",
          }}
        >
          <div className="space-y-3">
            <div className="w-16 h-16 flex items-center justify-center exc-img">
              {typeof active.icon === 'string' ? (
                <img src={active.icon} alt="" className="w-12 h-12 object-contain" />
              ) : (
                active.icon
              )}
            </div>
            <div className="leading-tight text-lg sm:text-xl md:text-2xl" style={{ color: '#F2C016', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>{active.title}</div>
            <div className="text-white/70 text-sm sm:text-lg leading-relaxed" style={{ whiteSpace: "pre-line" }}>
              {active.text}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl" style={{  filter: "blur(28px)" }} />
            <img
              src={active.image}
              alt={active.title}
              className="relative rounded-2xl w-full h-full md:h-full object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <main className="bg-black text-white" style={{ position: "relative", zIndex: 1, fontFamily: "Montserrat, sans-serif" }}>
        <Hero
          title={
            <>
              <span style={{ color: BRAND }}>CONNEX:</span> The Next Generation Institutional Trading <span style={{ color: BRAND }}>workspace</span>
            </>
          }
          subtitle="See cross‑venue depth, set normalised sizes, use execution algos/order types (TWAP/VWAP/IOC/FOK), track funding in real time, and manage risk 24/7. APIs for integration and white‑label options."
        />
        <Section title={<><span className="inline">Choose The Engagement</span><span className="block">That Fits</span></>} titleClassName="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
          <EngagementTabs />
        </Section>
        <Section title={<><span className="inline">Everything A Pro Desk</span><span className="block">Expects‑Built For Traders</span></>} titleClassName="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white" className="execute">
          <div className="grid md:grid-cols-3 gap-5">
            <Pill iconSvg={<VisibilityIcon />} title="Visibility" text="Consolidated book view and price discovery across venues." />
            <Pill iconSvg={<OrderTicketsIcon />} title="Order Tickets" text="TWAP/VWAP/IOC/FOK, conditional exits, and level‑aware execution patterns." />
            <Pill iconSvg={<SizingIcon />} title="Sizing" text="Normalise contract units so 1 is always 1" />
            <Pill iconSvg={<ApisIcon />} title="APIs" text="Integrate with OMS/PMS, data, and custody solutions; enable white‑label flows." />
            <Pill iconSvg={<RiskIcon />} title="Risk" text="PnL, funding, ADL, cash balances, and much more—trade consciously." />
            <Pill iconSvg={<SecurityIcon />} title="Security" text="Encrypted key management, IP allow‑listing, audit trails, and permissions." />
          </div>
        </Section>
        <Section title="What Desks Gain" titleClassName="text-white font-semibold mt-2 text-[35px] sm:text-4xl md:text-5xl lg:text-[48px]" titleStyle={{}} className="execute">
          <div className="grid md:grid-cols-3 gap-5">
            <WhatDesksGainCard
              iconSvg={<BetterFillsIcon />}
              title="Better Fills"
              text="Cut slippage with disciplined execution around levels and deeper visibility."
            />
            <WhatDesksGainCard
              iconSvg={<FasterIdeaIcon />}
              title="Faster Idea → Trade"
              text="Reduce clicks and context switches with FX-familiar workflows."
            />
            <WhatDesksGainCard
              iconSvg={<TighterRiskIcon />}
              title="Tighter Risk"
              text="24/7 visibility into P&L, margin, and exposure with alerting."
            />
          </div>
        </Section>
        <Section title="Venues • Data • Custody • OMS/PMS" titleClassName="text-white font-semibold mt-2 text-[35px] sm:text-4xl md:text-5xl lg:text-[48px]" titleStyle={{}}>
          <VenuesSection />
        </Section>
      </main>
    </div>
  );
}