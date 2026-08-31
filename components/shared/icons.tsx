import React from "react";

import {
  SiJavascript,
  SiTypescript,
  SiRust,
  SiPython,
  SiGo,
  SiReact,
  SiTailwindcss,
  SiVercel,
  SiNodedotjs,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiX,
  SiMysql,
  SiScikitlearn,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiScipy,
  SiLangchain,
  SiFastapi,
  SiFlask,
  SiRedis,
  SiGithub,
  SiStreamlit,
  SiJupyter,
  SiGooglecolab,
  SiMedium
} from "react-icons/si";

import { FaAws, FaJava } from "react-icons/fa";
import { FaHexagonNodes } from "react-icons/fa6";

// Custom brand SVG icons

const LangGraphIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    className={className} 
    style={{ ...style, flex: 'none', lineHeight: 1 }} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>LangGraph</title>
    <path 
      clipRule="evenodd" 
      d="M6.099 6H17.9C21.264 6 24 8.692 24 12s-2.736 6-6.099 6H6.1C2.736 18 0 15.308 0 12s2.736-6 6.099-6zm5.419 9.3c.148.154.367.146.561.106l.002.001c.09-.072-.038-.163-.16-.25-.074-.052-.145-.102-.166-.147.068-.08-.133-.265-.289-.408a1.52 1.52 0 01-.15-.148c-.11-.119-.155-.268-.2-.418-.03-.1-.06-.2-.11-.292-.304-.694-.653-1.383-1.143-1.97-.315-.39-.674-.74-1.033-1.09a19.384 19.384 0 01-.683-.688c-.226-.229-.362-.511-.499-.794-.114-.236-.228-.473-.396-.68-.507-.735-2.107-.936-2.342.104 0 .032-.01.052-.039.073-.13.094-.245.2-.342.327-.238.326-.274.877.022 1.17l.001-.019c.01-.147.02-.286.139-.391.228.193.576.262.841.117.32.45.422.995.525 1.54.085.456.17.912.382 1.316l.014.022c.124.203.25.41.41.587.059.089.178.184.297.279.157.125.314.25.329.359v.143c-.001.285-.002.58.184.813.103.205-.15.41-.352.385-.112.015-.233-.014-.354-.042-.165-.04-.329-.078-.462-.003-.038.04-.091.04-.145.042-.064.002-.129.004-.167.07-.008.019-.026.04-.045.063-.042.05-.087.105-.033.146l.015-.01c.082-.062.16-.12.27-.084-.014.08.039.102.092.123l.027.012a.344.344 0 01-.008.056c-.009.045-.017.088.018.127a.598.598 0 00.046-.054c.037-.046.073-.092.139-.11.144.19.289.111.471.013.206-.111.459-.248.81-.055-.135-.006-.255.01-.345.12-.023.024-.042.052-.002.084.207-.132.294-.085.375-.04.06.032.115.063.212.024l.07-.036c.155-.083.314-.166.499-.137-.139.039-.188.125-.242.218-.026.047-.054.095-.094.14-.021.021-.03.046-.007.08.29-.023.4-.095.548-.192.07-.046.15-.099.261-.154.124-.075.248-.027.368.02.13.05.255.098.371-.014.037-.033.083-.034.129-.034.016 0 .033 0 .05-.002-.037-.19-.24-.188-.448-.186-.24.003-.483.006-.475-.289.222-.149.224-.407.226-.651 0-.06 0-.117.005-.173.163.09.336.16.508.229.162.065.323.13.474.21.158.25.404.58.732.558.008-.026.016-.047.026-.073.019.004.039.008.059.014.086.02.178.044.223-.056zm6.429-2.829c.19.186.447.29.716.29.269 0 .526-.104.716-.29a.98.98 0 00.297-.7.98.98 0 00-.297-.7 1.024 1.024 0 00-1.08-.224l-.58-.831-.405.272.583.835a.978.978 0 00.05 1.348zm-1.817-2.69a1.03 1.03 0 001.056-.095.991.991 0 00.363-.507.97.97 0 00-.016-.62.994.994 0 00-.39-.488 1.028 1.028 0 00-1.298.14.987.987 0 00-.263.856.98.98 0 00.187.42c.095.125.218.225.36.294zm0 5.752a1.032 1.032 0 001.056-.095.991.991 0 00.363-.507.97.97 0 00-.016-.62.994.994 0 00-.39-.488 1.027 1.027 0 00-1.298.14.986.986 0 00-.263.856.98.98 0 00.187.42c.095.125.218.225.36.294zm.93-3.516v-.492h-1.55a.977.977 0 00-.217-.404l.584-.847-.425-.276-.583.847a1.023 1.023 0 00-1.047.23.973.973 0 00-.296.696c0 .261.107.512.296.696a1.023 1.023 0 001.047.23l.583.847.42-.276-.579-.847a.977.977 0 00.217-.404h1.55z" 
      fill="#1C3C3C" 
      fillRule="evenodd"
    />
  </svg>
);

const CrewAIIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    className={className} 
    style={{ ...style, flex: 'none', lineHeight: 1 }} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>CrewAI</title>
    <path 
      d="M19.41 10.783a2.753 2.753 0 012.471 1.355c.483.806.622 1.772.385 2.68l-.136.522a9.994 9.994 0 01-3.156 5.058c-.605.517-1.283 1.062-2.083 1.524l-.028.017c-.402.232-.884.511-1.398.756-1.19.602-2.475.997-3.798 1.167-.854.111-1.716.155-2.577.132H9.072a8.588 8.588 0 01-5.046-1.87l-.012-.01-.012-.01A8.024 8.024 0 011.22 17.42a10.916 10.916 0 01-.102-3.779A15.622 15.622 0 012.88 8.4a21.758 21.758 0 012.432-3.678 15.44 15.44 0 013.56-3.182A9.958 9.958 0 0112.44.104h.004l.003-.002c2.057-.384 3.743.374 5.024 1.26a8.28 8.28 0 012.395 2.513l.024.04.023.042a5.474 5.474 0 01.508 4.012c-.239.97-.577 1.914-1.01 2.814z" 
      fill="#461816"
    />
    <path 
      d="M18.861 13.165a.748.748 0 011.256.031c.199.332.256.73.159 1.103l-.137.522a7.936 7.936 0 01-2.504 4.014c-.572.49-1.138.939-1.774 1.306-.427.247-.857.496-1.303.707a9.628 9.628 0 01-3.155.973 14.33 14.33 0 01-2.257.116 6.531 6.531 0 01-3.837-1.422 5.967 5.967 0 01-2.071-3.494 8.859 8.859 0 01-.085-3.08 13.56 13.56 0 011.54-4.568 19.701 19.701 0 012.212-3.348 13.382 13.382 0 013.088-2.76 7.9 7.9 0 012.832-1.14c1.307-.245 2.434.207 3.481.933a6.222 6.222 0 011.806 1.892c.423.767.536 1.668.314 2.515a12.394 12.394 0 01-.99 2.67l-.223.497c-.321.713-.642 1.426-.97 2.137a.762.762 0 01-.97.467 3.39 3.39 0 01-2.283-2.49c-.095-.83.04-1.669.39-2.426.288-.746.61-1.477.933-2.208l.248-.563a.53.53 0 00-.204-.742 2.35 2.35 0 00-1.2.702 25.291 25.291 0 00-1.614 1.767 21.561 21.561 0 00-2.619 4.184 7.59 7.59 0 00-.816 2.753 7.042 7.042 0 00.07 2.219 2.055 2.055 0 001.934 1.715c1.801.1 3.59-.363 5.116-1.328.582-.4 1.141-.831 1.675-1.294.752-.71 1.376-1.519 1.958-2.36z" 
      fill="#fff"
    />
  </svg>
);

const RagIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={{ ...style, fill: "currentColor" }} id="Rag--Streamline-Carbon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16" width="16">
    <desc>RAG Streamline Icon</desc>
    <path d="M6 14h-1c-1.92995 0 -3.5 -1.57005 -3.5 -3.5v-1h1v1c0 1.3784 1.1216 2.5 2.5 2.5h1v1Z" strokeWidth="0.5" fill="currentColor"></path>
    <path d="M14 9.5h-4.5c-0.552 0.0007 -0.9993 0.448 -1 1v2.5c0 0.5523 0.4477 1 1 1h1.5v-1h-1.5v-2.5h4.5v2.5h-1.2676l-1.29685 1.9453L12.2676 15.5l1 -1.5H14c0.5523 0 1 -0.4477 1 -1v-2.5c-0.0007 -0.552 -0.448 -0.9993 -1 -1Z" strokeWidth="0.5" fill="currentColor"></path>
    <path d="M14.5 7.5v-2c0 -1.92995 -1.57005 -3.5 -3.5 -3.5h-1.5v1h1.5c1.3784 0 2.5 1.1216 2.5 2.5v2h1Z" strokeWidth="0.5" fill="currentColor"></path>
    <path d="M3 5h1.5v1H3Z" strokeWidth="0.5" fill="currentColor"></path>
    <path d="M6.303 3.21775 5.04045 1.375C4.8494 1.1367 4.56485 1 4.2597 1H2.00005c-0.5514 0 -1 0.44875 -1 1v5c0 0.55125 0.4486 1 1 1h3.5c0.5514 0 1 -0.44875 1 -1V3.8125c0 -0.2263 -0.0779 -0.44825 -0.197 -0.59475ZM2 7V2h2v1.5c0 0.2761 0.2239 0.5 0.5 0.5h1v3H2Z" strokeWidth="0.5" fill="currentColor"></path>
    <path id="_Transparent_Rectangle_" d="M0 0h16v16H0Z" strokeWidth="0.5" fill="none"></path>
  </svg>
);

const McpIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={{ ...style, fill: "currentColor" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
    <path d="m19.97,11.84c.66-.66,1.02-1.53,1.02-2.46s-.36-1.8-1.02-2.46l-.04-.04c-.66-.66-1.53-1.02-2.46-1.02-.17,0-.34.03-.51.05.02-.17.05-.33.05-.51,0-.93-.36-1.8-1.02-2.46-.66-.66-1.53-1.02-2.46-1.02s-1.8.36-2.46,1.02l-7.87,7.87c-.27.27-.27.71,0,.98s.71.27.98,0l7.87-7.87c.39-.39.92-.61,1.47-.61s1.08.22,1.47.61c.39.39.61.92.61,1.48s-.22,1.08-.61,1.48l-5.86,5.86-.08.08c-.27.27-.27.71,0,.98.14.14.31.2.49.2s.36-.07.49-.2l5.94-5.94c.39-.39.92-.61,1.48-.61s1.08.22,1.47.61l.04.04c.39.39.61.92.61,1.47s-.22,1.08-.61,1.48l-7.11,7.11c-.63.63-.63,1.66,0,2.29l1.46,1.46c.14.14.31.2.49.2s.36-.07.49-.2c.27-.27.27-.71,0-.98l-1.46-1.46c-.09-.09-.09-.24,0-.33l7.11-7.11Z"/><path d="m17.96,9.83c.27-.27.27-.71,0-.98-.27-.27-.71-.27-.98,0l-5.82,5.82c-.81.81-2.14.81-2.95,0-.81-.81-.81-2.14,0-2.95l5.82-5.82c.27-.27.27-.71,0-.98-.27-.27-.71-.27-.98,0l-5.82,5.82c-1.36,1.36-1.36,3.56,0,4.92.68.68,1.57,1.02,2.46,1.02s1.78-.34,2.46-1.02l5.82-5.82Z"/>
  </svg>
);

const OopsIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

// Social media SVGs (stroke-based, not from react-icons)

export const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Re-export react-icons for identity pane
export { SiX, SiMedium };

// Icon mapping for StackIconBox
export const IconMapping: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  SiJavascript,
  SiTypescript,
  SiRust,
  SiPython,
  SiGo,
  SiReact,
  SiTailwindcss,
  SiVercel,
  SiNodedotjs,
  SiDocker,
  SiAmazonwebservices: FaAws,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiJava: FaJava,
  SiMysql,
  SiScikitlearn,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiScipy,
  SiLangchain,
  SiFastapi,
  SiFlask,
  SiRedis,
  SiGithub,
  SiStreamlit,
  SiJupyter,
  SiGooglecolab,
  SiLanggraph: LangGraphIcon,
  SiCrewai: CrewAIIcon,
  SiRag: RagIcon,
  SiMcp: McpIcon,
  SiDsa: FaHexagonNodes,
  SiOop: OopsIcon,
  SiOops: OopsIcon
};
